import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Joi from 'joi-browser';
import TextArea from './common/TextArea';
import PageSpinner from './common/PageSpinner';

interface PostReplyProps {
  targetComment: string;
  replyingTo: string;
}

const PostReply = ({ targetComment, replyingTo }: PostReplyProps) => {
  const history = useHistory();
  const [formData, setFormData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const validateProperty = ({ name, value }: { name: string; value: string }) => {
    const obj = { [name]: value };
    const propertySchema = { [name]: Joi.string().required() };
    const { error } = Joi.validate(obj, propertySchema);
    return error ? error.details[0].message : null;
  };

  const handleChange = (input: HTMLTextAreaElement) => {
    const errors: Record<string, string> = { ...error };
    const errorMessage = validateProperty({ name: input.name, value: input.value });
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    setFormData(input.value);
    setError(errors[input.name]);
  };

  const handlePostReply = async () => {
    setLoading(true);

    await axios
      .patch(`${process.env.REACT_APP_MONGO_URL}/postreply/${targetComment}`, {
        content: formData,
        replyingTo: replyingTo,
      })
      .then(() => {
        history.go();
      })
      .catch((err) => {
        setError(err.response.statusText);
      });
  };

  return (
    <div className="post-comment">
      {loading ? (
        <PageSpinner height="100%" />
      ) : (
        <>
          <h2 className="__header">Replying to {replyingTo}</h2>
          <form>
            <TextArea
              name="comment"
              type="text"
              placeholder="Type your reply here"
              cols={30}
              rows={20}
              onChange={(e) => handleChange(e.target)}
            />
          </form>
          <div className="__bottom flex flex-ai-c flex-jc-sb">
            <span className="--characters-remaining">250 Characters left</span>
            <button
              className="all-buttons --purple-button"
              type="submit"
              onClick={handlePostReply}
              disabled={!!error}
            >
              Post Reply
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostReply;

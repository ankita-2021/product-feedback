import React, { useContext, useEffect, useState } from 'react'
import Comment from './Comment'
import { Flex, Text } from '@chakra-ui/react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import SelectedSuggestionContext  from '@/components/context/SelectedSuggestionContext'

const Comments = () => {
  const [comments, setComments] = useState<any[] | null>(null)
  const supabase = useSupabaseClient()
  const { selectedSuggestionId } = useContext(SelectedSuggestionContext);

useEffect(() => {
  const getCommentsAndReplies = async () => {
    try {
      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select()
        .eq('suggestion_id', selectedSuggestionId);

      const { data: repliesData, error: repliesError } = await supabase
        .from('replies')
        .select()
        .eq('suggestion_id', selectedSuggestionId);

      if (commentsError || repliesError) {
        console.error("An error occurred:", commentsError || repliesError);
        return;
      }

      const commentsWithReplies = commentsData.map(comment => ({
        ...comment,
        replies: repliesData.filter(reply => reply.comment_id === comment.id),
      }));

      setComments(commentsWithReplies);

    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  getCommentsAndReplies();
}, [selectedSuggestionId, supabase]);

  return (
    <Flex direction="column" bg="#FFF" mt="24px" borderRadius={10}>
      <Text ml="24px" mt="24px" color="#3A4374" fontSize="18px" fontWeight="bold" >{comments?.length} Comments</Text>
      <>
        {comments?.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </>
    </Flex>
  )
}

export default Comments
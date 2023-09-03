import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Image, Text, useMediaQuery } from '@chakra-ui/react';
import { useHistory } from 'react-router';

interface RoadmapSuggestionProps {
  suggestion: any; // Adjust the type to match your data structure
}

const RoadmapSuggestion: React.FC<RoadmapSuggestionProps> = ({ suggestion }) => {
  const history = useHistory();
  const [upvotes, setUpvotes] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [isLargerThanMD] = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    const fetchData = async () => {
      // Fetch upvotes and comments for the suggestion here using your data fetching logic
      try {
        // Use your data fetching code here
        // Example:
        // const upvotesData = await supabase.from('upvotes').select().eq('suggestion_id', suggestion.id);
        // const commentsData = await supabase.from('comments').select().eq('suggestion_id', suggestion.id);
        // setUpvotes(upvotesData.data);
        // setComments(commentsData.data);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchData();
  }, [suggestion.id]);

  const handleBoxClick = () => {
    history.push(`/${suggestion.slug}`);
  };

  let statusColor;
  switch (suggestion.status) {
    case 'Planned':
      statusColor = '#F49F85';
      break;
    case 'In-Progress':
      statusColor = '#AD1FEA';
      break;
    case 'Live':
      statusColor = '#62BCFA';
      break;
    default:
      statusColor = '#AD1FEA'; // Default color
  }

  return (
    <div className={`roadmap-content-box ${statusColor}`} onClick={handleBoxClick}>
      <li className={`__feedback-status ${statusColor}`}>
        {suggestion.status.replace(/(^\w|\s\w|-\w)/g, (m) => m.toUpperCase())}
      </li>
      <span className="__feedback-name">{suggestion.title}</span>
      <p className="__feedback-description">{suggestion.detail}</p>
      {/* Render your custom components like CategoryButton, UpVote, and CommentsCounter here */}
      {/* Example:
        <CategoryButton itemCategory={suggestion.category} disabled={true} />
        <div className="__bottom">
          <UpVote upvotes={upvotes} />
          <CommentsCounter comments={comments} />
        </div>
      */}
    </div>
  );
};

export default RoadmapSuggestion;

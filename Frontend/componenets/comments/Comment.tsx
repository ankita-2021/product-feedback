import { Avatar, Box, Divider, Flex, Text } from '@chakra-ui/react'
import ReplyComment from './AddReply';
import { useState } from 'react';
import Reply from './Reply';

interface CommentsProps {
  comment: any;
}

interface Reply {
  reply: string;
}


const Comment = ({ comment }: CommentsProps) => {
  const [replyDisplay, setReplyDisplay] = useState('none');

  const handleReply = () => {
    setReplyDisplay(replyDisplay === 'none' ? 'block' : 'none');
  };

  return (
    <Box w="100%" fontSize="13px" p="24px">
      <Flex justifyContent="space-between">
        <Flex gap="16px">
          <Avatar name='Elijah Moss' src='/images/user-images/image-elijah.jpg' />
          <Box my="auto">
            <Text fontWeight="bold">{comment.name}</Text>
            <Text color="#647196" >{comment.tag}</Text>
          </Box>
        </Flex>
        <Text onClick={handleReply} fontWeight="semibold" color="#4661E6" as="button">Reply</Text>
      </Flex>
      <Text mt="24px" ml="66px" color="#647196">
        {comment.comment}
      </Text>
      {comment.replies?.map((reply: Reply, index: number) => (
        <Reply leftMargin="66px" reply={reply} key={index} />
      ))}
      <Flex display={replyDisplay}>
      <ReplyComment commentId={comment.id} />
    </Flex>
    <Divider mt="24px" />
    </Box>
  )
}

export default Comment
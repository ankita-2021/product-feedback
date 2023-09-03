import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

interface RenderReplyProps {
  reply: {
    content: string;
    replyingTo: string;
    user: {
      image: string;
      name: string;
    };
  };
}

const RenderReply: React.FC<RenderReplyProps> = ({ reply }) => {
  const { content: replyContent, replyingTo } = reply;
  const { image: replyImage, name: replyUserName } = reply.user;

  return (
    <Box fontSize="13px" mt="32px" pl="40px">
      <Flex justifyContent="space-between">
        <Flex gap="16px">
          <Avatar name={replyUserName} src={replyImage} />
          <Box my="auto">
            <Text fontWeight="bold">{replyUserName}</Text>
          </Box>
        </Flex>
        {/* <Text onClick={() => {}} fontWeight="semibold" color="#4661E6" as="button">Reply</Text> */}
      </Flex>
      <Text mt="24px" color="#647196">
        <span className="--replying-to">@{replyingTo}</span> {replyContent}
      </Text>
      <Flex>
        {/* <ReplyComment commentId={comment.id} /> */}
      </Flex>
    </Box>
  );
};

export default RenderReply;

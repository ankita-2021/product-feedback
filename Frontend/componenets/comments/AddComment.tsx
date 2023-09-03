import React, { useState } from 'react';
import { Button, Flex, Text, Textarea } from '@chakra-ui/react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import SelectedSuggestionContext from '@/components/context/SelectedSuggestionContext';
import { useCurrentUserProfile } from '@/components/context/CurrentUserProfileContext';

const AddComment = () => {
  const [comment, setComment] = useState('');
  const supabase = useSupabaseClient();
  const user = useUser();
  const { selectedSuggestionId } = useContext(SelectedSuggestionContext);
  const { userProfile } = useCurrentUserProfile();

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          suggestion_id: selectedSuggestionId,
          user_id: user?.id,
          name: userProfile?.full_name,
          tag: userProfile?.tag,
          comment: comment,
        });

      if (error) {
        console.error('An error occurred:', error);
        return;
      }
      // Handle Success
      setComment('');
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      // router.push('/')
    }
  };

  return (
    <Flex direction="column" bg="#FFF" borderRadius={10} my="24px" p="24px" position="relative">
      <Text textAlign="start" mb="24px" fontSize="18px" fontWeight="bold" color="#3A4374">
        Add Comment
      </Text>

      <Flex fontSize="13px" direction="column">
        <Textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Type your comment here"
          color="#3A4374"
          h="48px"
          variant="filled"
        />
      </Flex>

      <Flex justifyContent="end" mt="16px">
        <Button
          onClick={handleSubmit}
          maxW="fit-content"
          bg="#AD1FEA"
          color="#F2F4FE"
          borderRadius={10}
        >
          Post Comment
        </Button>
      </Flex>
    </Flex>
  );
};

export default AddComment;

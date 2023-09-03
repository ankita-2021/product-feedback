import { Box, Button, Flex, Image, Text, useMediaQuery } from '@chakra-ui/react'
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import React, { useEffect, useState } from 'react'

interface SuggestionProps{
  suggestion: any;
}

const Suggestion = ({ suggestion }: SuggestionProps) => {
  const [isLargerThanMD] = useMediaQuery("(min-width: 768px)");
  const supabase =useSupabaseClient()
  const [comments, setComments] = useState<any[]>()
  const [upvotes, setUpvotes] = useState<any[]>()

  useEffect(() => {
    const getComments = async () => {
      try {
        const { data, error } = await supabase
          .from('comments')
          .select()
          .eq('suggestion_id', suggestion.id)
    
        if (error) {
          console.error("An error occurred:", error);
          return;
        }
    
        // Handle Success
        setComments(data)
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        // Restet loading state
      }
    }
    
    const getUpvotes = async () => {
      try {
        const { data, error } = await supabase
          .from('upvotes')
          .select()
          .eq('suggestion_id', suggestion.id)
    
        if (error) {
          console.error("An error occurred:", error);
          return;
        }
    
        // Handle Success
        setUpvotes(data)
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        // Restet loading state
      }
    }

    getComments()
    getUpvotes()
  }, [suggestion.id, supabase])

  return (
    <Flex gap={isLargerThanMD ? 10 : "none"} fontSize="13px" p={!isLargerThanMD ? "24px": "none"} px={isLargerThanMD ? "32px" : "none"} py={isLargerThanMD ? "28px" : "none"} direction={isLargerThanMD ? "row" : "column"} bg="#FFF" borderRadius={10}>
      {isLargerThanMD && (
        <Flex
          justifyContent="center"
          alignItems="center"
          direction="column"
          w="40px"
          h="54px"
          fontSize="13px"
          fontWeight="semibold" 
          borderRadius="10px" 
          bg="#F2F4FF"
          color="#3A4374"
          >
        <Image alt='icon arrow up' h="8px" src="/images/shared/icon-arrow-up.svg"/>
        {upvotes?.length}
        </Flex> 
      )}
      <Box w={isLargerThanMD ? "625px" : "none"}>
        <Text fontSize={isLargerThanMD ? "18px" : "none"} mb="9px" fontWeight="bold">{suggestion.title}</Text>
        <Text fontSize={isLargerThanMD ? "16px" : "none"} mb="12px" color="#647196">{suggestion.detail}</Text>
        <Button
          maxW="fit-content"
          fontSize="13px"
          fontWeight="semibold" 
          borderRadius="10px" 
          bg="#F2F4FF"
          color="#4661E6" 
        >
          {suggestion.category}
        </Button>
      </Box>          
            
            {!isLargerThanMD && (
              <Flex mt="16px"  justify="space-between">
                <Button
                  w="25%"
                  fontSize="13px"
                  fontWeight="semibold" 
                  borderRadius="10px" 
                  bg="#F2F4FF"
                  color="#3A4374"
                >
                  <Image alt='icon arrow up' mr={2} src="/images/shared/icon-arrow-up.svg"/>
                  {upvotes?.length}
                </Button>
                <Flex alignItems="center" gap={2}>
                  <Image alt='comments icon' w="18px" h="16px" src="/images/shared/icon-comments.svg"/>
                  <Text fontWeight="bold">{comments?.length}</Text>
                </Flex>
              </Flex>
            )}
            {isLargerThanMD && (
              <Flex alignItems="center" gap={2}>
              <Image alt='comments icon' w="18px" h="16px" src="/images/shared/icon-comments.svg"/>
              <Text fontWeight="bold">{comments?.length}</Text>
            </Flex>
            )}
          </Flex>
  )
}

export default Suggestion
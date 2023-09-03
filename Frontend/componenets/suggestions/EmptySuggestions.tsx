import { Button, Flex, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'
import AddFeedbackBtn from '../buttons/AddFeedbackBtn'

const EmptySuggestions = () => {
  return (
    <Flex justify="center" alignItems="center" mx="24px" mt="32px"bg="#FFF" borderRadius={10} >
      <Flex direction="column" justify="center" alignItems="center" gap={4} px="25px" py="76px" textAlign="center">
        <Image alt='empty illustration' h="108px" w="102px" src="/images/suggestions/illustration-empty.svg" />
        <Text fontSize="18px" fontWeight="bold" >There  is no feedback yet.</Text>
        <Text fontSize="13px" color="#647196" >Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</Text>
        <AddFeedbackBtn />
      </Flex>
    </Flex>
  )
}

export default EmptySuggestions

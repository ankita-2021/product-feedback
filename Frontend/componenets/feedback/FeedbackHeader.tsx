import { Button, Flex, Image, Text, useMediaQuery } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

interface FeedbackHeaderProps {
  display: string;
}


const FeedbackHeader: React.FC<FeedbackHeaderProps> = ({ display }) => {
  const [isLargerThanMD] = useMediaQuery("(min-width: 768px)");

  const router = useRouter()
  return (
    <Flex mt={isLargerThanMD ? "32px" : "none"} mb="24px" fontSize="13px" justifyContent="space-between">
      <Flex as="button" onClick={() => router.push("/")} gap={2} alignItems="center">
        <Image alt='icon arrow left' h={3} src="/images/shared/icon-arrow-left.svg" />
        <Text fontWeight="bold">Go Back</Text>
      </Flex>
      {/* Add logic to handle feedback data pushed to edit page */}
      <Button display={display} onClick={() => router.push("feedback/edit")} w="119px" h="40px" bg="#4661E6" color="#F2F4FE" fontSize="13px" fontWeight="bold" borderRadius={10} >Edit Feedback</Button>
    </Flex>
  )
}

export default FeedbackHeader
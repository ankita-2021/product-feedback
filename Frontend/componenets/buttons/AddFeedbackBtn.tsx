import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const PostFeedbackButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/feedback/new");
  }

  return (
    <Button onClick={handleClick} w={{ base: "134px", md: "158px" }} h={{ base: "40px", md: "46px" }} bg="#AD1FEA" color="#F2F4FE" fontSize="13px" fontWeight="bold">
      + Add Feedback
    </Button>
  );
};

export default PostFeedbackButton;

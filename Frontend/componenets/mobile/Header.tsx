import { Flex, Image, Text } from '@chakra-ui/react'

interface HeaderProps {
  onClick: React.MouseEventHandler<HTMLImageElement>
  hamburgerClicked: boolean;
}

const Header = ({ onClick, hamburgerClicked }: HeaderProps) => {

  return (
    <Flex 
      backgroundImage="url(/images/mobile/background-header.png)" 
      bgRepeat="no-repeat" 
      bgSize="cover" 
      py="16px" 
      px="24px" 
      justifyContent="space-between"
    >
      <Flex direction="column">
        <Text fontSize="15px" color="white" fontWeight="bold">Front End Mentor</Text>
        <Text fontSize="13px" fontWeight="medium" color="white">Feedback Board</Text>
      </Flex>
        <Image 
          alt='icon hamburger'
          _hover={{cursor: "pointer"}} 
          onClick={onClick}  
          h="17px" 
          mr="2px" 
          my="auto" 
          src={hamburgerClicked ? '/images/mobile/icon-close.svg' : '/images/mobile/icon-hamburger.svg'}
        />
    </Flex>
  )
}

export default Header
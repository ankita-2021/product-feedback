import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
// import FilterCard from '../suggestions/FilterCard'
// import RoadmapCard from '../suggestions/RoadmapCard'

const Board = () => {
  return (
    <Flex direction={{base: "row", lg: "column"}} gap={3} justifyContent="space-between" h={{md: "min-content"}} mb="40px">
      <Box
        borderRadius={16}
        p="24px"
        h={{lg: "138px"}}
        w="240px"
        backgroundImage="url('/images/tablet/background-header.png')"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
      >
      </Box>
      <FilterCard />
      <RoadmapCard />
    </Flex>
  )
}

export default Board
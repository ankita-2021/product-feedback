import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Flex, Image, Text, useMediaQuery, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import AddFeedbackBtn from '../buttons/AddFeedbackBtn';
import SuggestionsSortContext from '../context/SuggestionsSortContext';

const FilterHeader = () => {
  const [isLargerThanMD] = useMediaQuery('(min-width: 768px)');
  const { selectedSort, setSelectedSort } = useContext(SuggestionsSortContext);

  return (
    <Flex borderRadius={{ md: 12 }} py={{ base: '8px', md: '24px' }} px="24px" bg="#373F68" justifyContent="space-between">
      <Flex gap={8}>
        {isLargerThanMD && (
          <Flex gap={3} alignItems="center">
            <Image alt="suggestion icon" src="/images/suggestions/icon-suggestions.svg" />
            <Text color="#F2F4FE" fontWeight="bold" fontSize="18px">
              2 Suggestions
            </Text>
          </Flex>
        )}
        <Flex gap={1} alignItems="center">
          <Text color="#F2F4FE" fontSize={isLargerThanMD ? '14px' : '13px'}>
            Sort by :
          </Text>
          <Menu>
            <MenuButton bgColor="inherit" as={Button} rightIcon={<ChevronDownIcon />} color="#F2F4FE" fontSize={isLargerThanMD ? '14px' : '13px'} fontWeight="bold">
              {selectedSort}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setSelectedSort('Most Upvotes')}>Most Upvotes</MenuItem>
              <MenuItem onClick={() => setSelectedSort('Least Upvotes')}>Least Upvotes</MenuItem>
              <MenuItem onClick={() => setSelectedSort('Most Comments')}>Most Comments</MenuItem>
              <MenuItem onClick={() => setSelectedSort('Least Comments')}>Least Comments</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <AddFeedbackBtn />
    </Flex>
  );
};

export default FilterHeader;
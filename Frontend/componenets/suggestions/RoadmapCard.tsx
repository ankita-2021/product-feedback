import { Box, Flex, Link, Text, useMediaQuery } from '@chakra-ui/react'
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface RoadmapItem {
  name: string;
  color: string;
}

const roadmapItems: RoadmapItem[] = [
  { name: 'Planned', color: '#4661E6' },
  { name: 'In-Progress', color: '#F49F85' },
  { name: 'Live', color: '#62BCFA' },
];

const RoadmapCard = () => {
  const [statusCounts, setStatusCounts] = useState<{ [key: string]: number }>({});
  const [isLargerThanMD] = useMediaQuery("(min-width: 768px)");
  const supabase = useSupabaseClient()
  const router = useRouter()

  useEffect(() => {
    const getStatus = async () => {
      try {
        const { data, error } = await supabase
          .from('suggestions')
          .select('status');

        if (error) {
          console.error("An error occurred:", error);
          return;
        }

        // Handle Success
        const counts: { [key: string]: number } = {};
        data?.forEach((item) => {
          counts[item.status] = (counts[item.status] || 0) + 1;
        });
        setStatusCounts(counts);
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    getStatus();
  }, [supabase]);

  return (
    <Flex borderRadius={16} w={isLargerThanMD ? "240px" : "none" } p="24px" gap={6} overflow="hidden" alignItems="center" justifyContent="flex-start" bg="#FFF" direction="column" >
      <Flex w="100%" justifyContent="space-between" >
        <Text fontSize="18px" fontWeight="bold" >Roadmap</Text>
        <Link onClick={() => router.push("/roadmap")} fontWeight="semibold" fontSize="13px" textDecoration="underline" color="#4661E6">View</Link>
      </Flex>

      {roadmapItems.map((item: RoadmapItem, index: number) => (
        <Flex  w="100%" justifyContent="space-between" key={index} >
        <Flex>
          <Box 
            my="auto" 
            h="8px" 
            w="8px" 
            bg={item.color} 
            borderRadius="50%" 
            mr="16px" 
          />
          <Text color="#647196" fontSize="16px" >{item.name}</Text>
        </Flex>
        <Text color="#647196" fontWeight="bold" fontSize="16px">
          {statusCounts[item.name] || 0}
        </Text>
      </Flex>
      ))}
    </Flex>
  )
}

export default RoadmapCard
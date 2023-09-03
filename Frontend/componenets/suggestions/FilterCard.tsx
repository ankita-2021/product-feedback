import { Flex, useMediaQuery } from '@chakra-ui/react'
import Input from './FilterButton'
import { useContext } from 'react'
import SelectedFilterContext  from '@/components/context/SelectedFilterContext'

const inputs = ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature']

const FilterCard = () => {
  const [isLargerThanMD] = useMediaQuery("(min-width: 768px)");
  const { selectedFilter, setSelectedFilter } = useContext(SelectedFilterContext)

  const handleClick = (inputName: string) => () => {
    setSelectedFilter(inputName)
  }

  return (
    <Flex borderRadius={16} p="24px" w={isLargerThanMD ? "240px" : "none" } wrap="wrap" gap={2} overflow="hidden" alignItems="center" justifyContent="flex-start" bg="#FFF">
      {inputs.map((input: string, index: number) => (
          <Input selected={input === selectedFilter} onClick={handleClick(input)} key={index} name={input} />
      ))}
    </Flex>
  )
}

export default FilterCard
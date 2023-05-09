import { Flex, Spinner } from '@chakra-ui/react'

export default function Loader() {
  return (
    <Flex py={10}>
      <Spinner
        mx="auto"
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  )
}

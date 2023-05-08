import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <Flex minH="100vh">
      <Box
        textAlign="center"
        m="auto">
        <Heading
          as="h1"
          size="4xl"
          mb={8}>
          404{' '}
          <Box
            as="small"
            fontWeight="light">
            not found
          </Box>
        </Heading>

        <Text
          color="blue.500"
          fontWeight="bold">
          <Link to="/">Go home</Link>
        </Text>
      </Box>
    </Flex>
  )
}

import { Card, CardBody, CardHeader, Flex, Heading, Text } from '@chakra-ui/react'

export default function NumericDashboardCard({ title, number, bg, children }) {
  return (
    <Card
      bg={bg}
      flex={1}>
      <CardHeader pb={1}>
        <Heading
          size="sm"
          fontWeight="normal">
          {title}
        </Heading>
      </CardHeader>

      <CardBody pt={0}>
        <Flex
          align="center"
          gap={4}>
          {children}
          <Text
            fontWeight="bold"
            fontSize={45}>
            {number}
          </Text>
        </Flex>
      </CardBody>
    </Card>
  )
}

NumericDashboardCard.defaultProps = {
  title: 'Dashboard Card',
  number: 0,
}

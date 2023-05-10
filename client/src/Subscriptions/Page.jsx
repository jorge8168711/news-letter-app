import UploadCsv from '../UploadCsv.jsx'
import CreateSubscription from './Create.jsx'
import SubscriptionsTable from './Table.jsx'
import { useState } from 'react'
import { Container, Flex } from '@chakra-ui/react'

export default function SubscriptionsPage() {
  const [tableKey, setTableKey] = useState(new Date().getTime())

  return (
    <>
      <Container
        maxW="container.xl"
        py={8}>
        <Flex
          gap={6}
          mb={8}
          alignItems="flex-start"
          justifyContent="flex-end">
          <UploadCsv />
          <CreateSubscription afterCloseDrawerCallback={() => setTableKey(new Date().getTime())} />
        </Flex>

        <SubscriptionsTable key={tableKey} />
      </Container>
    </>
  )
}

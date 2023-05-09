import { useState } from 'react'
import CreateSubscription from './Create.jsx'
import SubscriptionsTable from './Table.jsx'
import { Container } from '@chakra-ui/react'

export default function SubscriptionsPage() {
  const [tableKey, setTableKey] = useState(new Date().getTime())

  return (
    <>
      <Container
        maxW="container.xl"
        py={8}>
        <CreateSubscription afterCloseDrawerCallback={() => setTableKey(new Date().getTime())} />
        <SubscriptionsTable key={tableKey} />
      </Container>
    </>
  )
}

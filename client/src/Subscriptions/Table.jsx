import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'

import useSWR from 'swr'
import { API_BASE_URL, fetcher } from '../constants.js'
import Loader from '../Loader.jsx'
import ErrorAlert from '../ErrorAlert.jsx'

export default function SubscriptionsTable() {
  const { data, error, isLoading, mutate } = useSWR(`${API_BASE_URL}/subscriptions`, fetcher, {
    refreshWhenHidden: true,
    revalidateOnMount: true,
  })

  if (isLoading) {
    return <Loader />
  }

  if (!isLoading && error) {
    return (
      <ErrorAlert
        error={error}
        onRetry={() => mutate()}
      />
    )
  }

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>List of users subscribed to the newsletters.</TableCaption>

        <Thead>
          <Tr bgColor="rgba(255, 255, 255, .1)">
            <Th>Name</Th>
            <Th>Email</Th>
          </Tr>
        </Thead>

        <Tbody>
          {!data?.body?.length && (
            <Tr>
              <Td colSpan={2}>No items available</Td>
            </Tr>
          )}
        </Tbody>

        <Tbody>
          {data?.body?.map((item) => (
            <Tr key={item.id}>
              <Td>{item.name}</Td>
              <Td>{item.email}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

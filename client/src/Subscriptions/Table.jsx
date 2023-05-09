import {
  Spinner,
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
import { Suspense } from 'react'
import { API_BASE_URL, fetcher } from '../constants.js'

export default function SubscriptionsTable() {
  const { data } = useSWR(`${API_BASE_URL}/subscriptions`, fetcher, {
    suspense: true,
    refreshWhenHidden: true,
    revalidateOnMount: true,
  })

  return (
    <Suspense
      fallback={
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      }>
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
    </Suspense>
  )
}

import { Flex, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

import useSWR from 'swr'
import Loader from '../Loader.jsx'
import ErrorAlert from '../ErrorAlert.jsx'
import DeleteButton from '../DeleteButton.jsx'

import { API_BASE_URL, fetcher } from '../constants.js'
import { EditIcon } from '@chakra-ui/icons'
import SubmitNewsLetter from './SubmitNewsLetter.jsx'

export default function NewsletterTable({ onTableSelection }) {
  const { data, error, isLoading, mutate } = useSWR(`${API_BASE_URL}/newsletters`, fetcher, {
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
        <Thead>
          <Tr bgColor="rgba(255, 255, 255, .1)">
            <Th>Name</Th>
            <Th>Subject</Th>
            <Th />
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
              <Td>{item.subject}</Td>

              <Td>
                <Flex
                  justifyContent="flex-end"
                  alignItems="center"
                  gap={4}>
                  <IconButton
                    onClick={() => onTableSelection?.(item)}
                    colorScheme="blue"
                    size="sm"
                    variant="outline"
                    icon={<EditIcon />}
                  />

                  <DeleteButton
                    onDeleteSuccess={() => mutate()}
                    url="newsletters"
                    id={item.id}
                  />

                  <SubmitNewsLetter newsletterId={item.id} />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

NewsletterTable.defaultProps = {
  onTableSelection: () => {},
}

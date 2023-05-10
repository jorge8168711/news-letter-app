import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Tag } from '@chakra-ui/react'

export default function UploadCsvTableResult({ data = [], showError = false }) {
  return (
    <TableContainer>
      <Table
        variant="simple"
        size="sm">
        <Thead>
          <Tr>
            <Th>Email</Th>
            <Th>Name</Th>
            {showError && <Th>Error</Th>}
          </Tr>
        </Thead>

        <Tbody>
          {data.map((row) => (
            <Tr key={row.email}>
              <Td>{row.email}</Td>
              <Td>{row.name}</Td>
              {showError && (
                <Td>
                  <Tag colorScheme="red">{row.error}</Tag>
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

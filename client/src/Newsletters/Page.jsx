import NewsletterTable from './Table'
import CreateNewsletter from './Create'
import { Container } from '@chakra-ui/react'
import { useCallback, useState } from 'react'

export default function NewslettersPage() {
  const [tableKey, setTableKey] = useState(new Date().getTime())
  const [selectedItem, setSelectedItem] = useState(null)

  const handleTableSelection = useCallback((item) => {
    setSelectedItem(item)
  }, [])

  const cleanSelection = useCallback(() => {
    setSelectedItem(null)
  }, [])

  return (
    <Container
      maxW="container.xl"
      py={8}>
      <CreateNewsletter
        cleanSelection={cleanSelection}
        selectedNewsletter={selectedItem}
        afterCloseDrawerCallback={() => setTableKey(new Date().getTime())}
      />

      <NewsletterTable
        key={tableKey}
        onTableSelection={handleTableSelection}
      />
    </Container>
  )
}

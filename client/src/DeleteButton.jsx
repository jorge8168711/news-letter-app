import { DeleteIcon } from '@chakra-ui/icons'
import { IconButton, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { API_BASE_URL } from './constants'

export default function DeleteButton({ id, url, onDeleteSuccess }) {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const deleteItem = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE_URL}/${url}/${id}`, { method: 'DELETE' })

      if (!res.ok) throw new Error('Something went wrong')

      toast({
        title: 'Element deleted successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      onDeleteSuccess?.()
    } catch (error) {
      console.error(error)
      toast({
        title: 'An error occurred deleting the element.',
        description: error.message || error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <IconButton
      onClick={deleteItem}
      isLoading={loading}
      colorScheme="red"
      variant="outline"
      size="sm"
      icon={<DeleteIcon />}
    />
  )
}

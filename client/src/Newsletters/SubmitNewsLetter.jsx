import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Button, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { API_BASE_URL } from '../constants'

export default function SubmitNewsLetter({ newsletterId }) {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const sendNewsletter = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE_URL}/subscriptions/?only_count=true`)
      if (!res.ok) throw new Error('Something went wrong')
      const jsonRes = await res.json()

      if (!jsonRes.body.count) {
        toast({
          title: 'No emails available.',
          description:
            'Please add emails on the Subscriptions page, is necessary to have at least one email.',
          status: 'info',
          duration: 5000,
          isClosable: true,
        })

        return
      }

      const sendRes = await fetch(`${API_BASE_URL}/send-emails/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newsletter_id: newsletterId,
        }),
      })

      if (!sendRes.ok) throw new Error('Something went wrong sending the newsletter.')

      toast({
        title: 'News letter email sent successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
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
    <Button
      isLoading={loading}
      onClick={sendNewsletter}
      size="sm"
      variant='ghost'
      rightIcon={<ArrowForwardIcon />}>
      Submit newsletter
    </Button>
  )
}

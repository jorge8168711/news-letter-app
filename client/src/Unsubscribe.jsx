import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Container,
  Heading,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Loader from './Loader'
import { API_BASE_URL } from './constants'
import ErrorAlert from './ErrorAlert'

const STATUSES = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
}

export default function Unsubscribe() {
  const [processing, setProcessing] = useState(true)
  const [status, setStatus] = useState([null, null])
  const [searchParams] = useSearchParams()

  const navigate = useNavigate()

  useEffect(() => {
    if (!searchParams.get('subscription_id')?.trim()) {
      navigate('/')
    }
  }, [navigate, searchParams])

  useEffect(() => {
    const subId = searchParams.get('subscription_id')?.trim()
    const unsubscribeRequest = async () => {
      // fake delay, to show the loader
      await new Promise((resolve) => setTimeout(resolve, 2000))

      try {
        const res = await fetch(`${API_BASE_URL}/subscriptions/${subId}`, { method: 'DELETE' })
        const textRes = await res.clone().text()
        if (!res.ok) throw new Error(textRes)
        setStatus([STATUSES.SUCCESS, 'You have been unsubscribed successfully.'])
      } catch (error) {
        setStatus([STATUSES.FAIL, error])
      } finally {
        setProcessing(false)
      }
    }

    if (subId) {
      unsubscribeRequest()
    }
  }, [searchParams])

  if (processing) {
    return (
      <Container
        flexDirection="column"
        display="flex"
        alignItems="center"
        justifyContent="center"
        maxW="container.xl"
        py={8}>
        <Loader />
        <Heading>We are processing your request.</Heading>
      </Container>
    )
  }

  return (
    <Container
      maxW="container.xl"
      py={8}>
      {status[0] === STATUSES.FAIL && <ErrorAlert error={status[1]} />}
      {status[0] === STATUSES.SUCCESS && (
        <Alert
          status="success"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px">
          <AlertIcon
            boxSize="40px"
            mr={0}
          />
          <AlertTitle
            mt={4}
            mb={1}
            fontSize="lg">
            {status[1]}
          </AlertTitle>

          <AlertDescription maxWidth="sm">
            We are sorry to see you go, but we hope to see you again soon. 🥹
          </AlertDescription>
        </Alert>
      )}
    </Container>
  )
}

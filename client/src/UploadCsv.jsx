import { PlusSquareIcon } from '@chakra-ui/icons'
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Divider,
  Link,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { API_BASE_URL } from './constants'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import UploadCsvTableResult from './UploadCsvTableResult'

export default function UploadCsv() {
  const inputRef = useRef(null)
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState({ success: [], error: [] })
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleChange = async (e) => {
    try {
      const file = e.target.files[0]

      if (!file || file.type !== 'text/csv') {
        toast({
          title: 'Invalid file.',
          description: 'Please upload a valid CSV file.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        e.target.value = null
        return
      }

      setLoading(true)

      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch(`${API_BASE_URL}/subscriptions/bulk`, {
        method: 'POST',
        body: formData,
      })

      const textRes = await res.clone().text()
      if (!res.ok) throw new Error(textRes)

      const jsonResponse = await res.clone().json()
      setResult(jsonResponse.body)
      onOpen()
      e.target.value = null
    } catch (error) {
      console.error(error)
      toast({
        title: 'An error ocurred processing the file.',
        description: error?.message || error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Box
        display="flex"
        alignItems="flex-end"
        flexDirection="column">
        <Button
          mb={2}
          onClick={handleClick}
          leftIcon={<PlusSquareIcon />}
          isLoading={loading}
          loadingText="Processing File...">
          Upload CSV
        </Button>

        <Link
          download
          href="/csv-example.csv"
          fontSize="12px">
          Download Example File
        </Link>
      </Box>

      <input
        onChange={handleChange}
        accept="text/csv"
        style={{ display: 'none' }}
        ref={inputRef}
        type="file"
        name="csv"
        id="csvFile"
      />

      <Modal
        size="xl"
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload results</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {result.success?.length > 0 && (
              <>
                <Alert
                  borderRadius={4}
                  mb={4}
                  status="success">
                  <AlertIcon />
                  Successfully uploaded
                </Alert>

                <UploadCsvTableResult data={result.success} />
              </>
            )}

            <Divider my={10} />
            {result.error?.length > 0 && (
              <>
                <Alert
                  borderRadius={4}
                  mb={4}
                  status="error">
                  <AlertIcon />
                  Invalid emails
                </Alert>

                <UploadCsvTableResult
                  data={result.error}
                  showError
                />
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

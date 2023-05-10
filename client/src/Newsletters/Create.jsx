import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

const defaultValues = {
  name: '',
  body: '',
  subject: '',
}

export default function CreateNewsletter({
  afterCloseDrawerCallback,
  cleanSelection,
  selectedNewsletter,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const fileInputRef = useRef(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [file, setFile] = useState(null)

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  })

  const onCloseDrawer = (createdItem = null) => {
    reset({ defaultValues })
    onClose()
    cleanSelection()
    if (createdItem) {
      afterCloseDrawerCallback?.(createdItem)
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = null
    }
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const onSubmit = async (data) => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || '/api'
      const url = selectedNewsletter?.id
        ? `${baseUrl}/newsletters/${selectedNewsletter.id}`
        : `${baseUrl}/newsletters`
      const method = selectedNewsletter?.id ? 'PATCH' : 'POST'

      setLoading(true)

      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('body', data.body)
      formData.append('subject', data.subject)

      if (file) formData.append('file', file)

      const res = await fetch(url, { method: method, body: formData })
      const text = await res.clone().text()

      if (!res.ok) throw new Error(text || 'Something went wrong updating the news letter')
      const jsonRes = await res.clone().json()
      onCloseDrawer(jsonRes.body)

      toast({
        title: 'Newsletter saved successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      console.error(error)
      setError(error.message || JSON.stringify(error))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!isOpen && selectedNewsletter) {
      onOpen()
      reset({
        name: selectedNewsletter.name,
        body: selectedNewsletter.body,
        subject: selectedNewsletter.subject,
      })
    }
  }, [isOpen, selectedNewsletter, onOpen, reset])

  return (
    <div>
      <Box
        pb={6}
        textAlign="right">
        <Button
          colorScheme="orange"
          onClick={onOpen}>
          Add Newsletter
        </Button>
      </Box>

      <Drawer
        closeOnEsc={!loading}
        closeOnOverlayClick={!loading}
        size={'lg'}
        isOpen={isOpen}
        placement="right"
        onClose={onCloseDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create newsletter</DrawerHeader>

          <DrawerBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl
                isInvalid={Boolean(errors?.name?.message)}
                mb={6}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  {...register('name', {
                    required: 'The field is required',
                  })}
                />
                {errors?.name?.message && (
                  <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl mb={6}>
                <FormLabel>Subject</FormLabel>
                <Input
                  type="text"
                  {...register('subject')}
                />
              </FormControl>

              <FormControl
                isInvalid={Boolean(errors?.body?.message)}
                mb={6}>
                <FormLabel>Body (Edit email content) | HTML, Plaintext</FormLabel>
                <Textarea
                  rows={8}
                  type="text"
                  {...register('body', { required: 'The field is required' })}
                />
                {errors?.body?.message && (
                  <FormErrorMessage>{errors.body.message}</FormErrorMessage>
                )}
              </FormControl>

              {selectedNewsletter?.file && (
                <>
                  <Link
                    href={selectedNewsletter.file}
                    isExternal>
                    Attachment <ExternalLinkIcon mx="2px" />
                  </Link>
                </>
              )}

              {!selectedNewsletter?.file && (
                <Input
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  placeholder="Attachment"
                  size="sm"
                  type="file"
                  accept="image/png,image/jpg,image/jpeg,application/pdf"
                />
              )}

              {error && (
                <Alert status="error">
                  <AlertIcon />
                  {error}
                </Alert>
              )}

              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                mt={6}
                gap={4}>
                <Button
                  isDisabled={loading}
                  type="button"
                  onClick={onCloseDrawer}
                  variant="outline">
                  Cancel
                </Button>

                <Button
                  isLoading={loading}
                  colorScheme="blue"
                  type="submit">
                  Save
                </Button>
              </Box>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

CreateNewsletter.defaultProps = {
  afterCloseDrawerCallback: () => {},
  cleanSelection: () => {},
  selectedNewsletter: null,
}

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
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const defaultValues = {
  name: '',
  body: '',
}

export default function CreateNewsletter({
  afterCloseDrawerCallback,
  cleanSelection,
  selectedNewsletter,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const toast = useToast()

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
  }

  const onSubmit = async (data) => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || '/api'
      const url = selectedNewsletter?.id
        ? `${baseUrl}/newsletters/${selectedNewsletter.id}`
        : `${baseUrl}/newsletters`
      const method = selectedNewsletter?.id ? 'PATCH' : 'POST'

      setLoading(true)

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const jsonRes = await res.json()
      if (!res.ok) throw new Error(jsonRes.error || 'Something went wrong updating the news letter')
      onCloseDrawer(jsonRes.body)

      toast({
        title: 'Newsletter saved successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      console.error(error)
      setError(error.message || error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!isOpen && selectedNewsletter) {
      onOpen()
      reset({ name: selectedNewsletter.name, body: selectedNewsletter.body })
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

              <FormControl isInvalid={Boolean(errors?.body?.message)}>
                <FormLabel>Body</FormLabel>
                <Textarea
                  rows={8}
                  type="text"
                  {...register('body', { required: 'The field is required' })}
                />
                {errors?.body?.message && (
                  <FormErrorMessage>{errors.body.message}</FormErrorMessage>
                )}
              </FormControl>
{/*
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="file"
              /> */}

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

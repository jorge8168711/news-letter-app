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
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const defaultValues = {
  select: '',
  input: '',
}

// eslint-disable-next-line react/prop-types
export default function CreateSubscription({ afterCloseDrawerCallback }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

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
    afterCloseDrawerCallback?.(createdItem)
  }

  const onSubmit = async (data) => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || '/api'
      setLoading(true)

      const res = await fetch(`${baseUrl}/subscriptions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          name: data.name || data.email.split('@')[0],
        }),
      })

      const jsonRes = await res.json()
      if (!res.ok) throw new Error(jsonRes.error || 'Something went wrong')
      onCloseDrawer(jsonRes.body)
    } catch (error) {
      console.error(error)
      setError(error.message || error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Box
        pb={6}
        textAlign="right">
        <Button
          colorScheme="orange"
          onClick={onOpen}>
          Add Email
        </Button>
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onCloseDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={Boolean(errors?.email?.message)} mb={6}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  {...register('email', {
                    required: 'The field is required',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Entered value does not match email format',
                    },
                  })}
                />
                {errors?.email?.message && (
                  <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  {...register('name')}
                />
              </FormControl>

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
                  onClick={onClose}
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

CreateSubscription.defaultProps = {
  afterCloseDrawerCallback: () => {},
}

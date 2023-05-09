import { Alert, AlertDescription, AlertIcon, AlertTitle, Button } from '@chakra-ui/react'

export default function ErrorAlert({ error, onRetry }) {
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center">
      <AlertIcon />
      <AlertTitle>An error ocurred.</AlertTitle>
      <AlertDescription>
        <pre>{error?.message || error}</pre>
      </AlertDescription>

      {onRetry && <Button onClick={onRetry}>Retry</Button>}
    </Alert>
  )
}

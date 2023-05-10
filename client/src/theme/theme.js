import chakraTheme from '@chakra-ui/theme'
import { extendBaseTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const fonts = {
  heading: 'Inter, sans-serif',
  body: 'Inter, sans-serif',
}

// when a new component needs to be used
// the styles must be imported and added to the components list
const {
  Button,
  Select,
  Input,
  Radio,
  Container,
  Heading,
  Checkbox,
  Skeleton,
  Alert,
  Card,
  Progress,
  Table,
  Spinner,
  Drawer,
  FormLabel,
  FormError,
  CloseButton,
  Textarea,
  Modal,
  Tag,
} = chakraTheme.components

const components = {
  Button,
  Select,
  Input,
  Container,
  Heading,
  Skeleton,
  Alert,
  Card,
  Radio,
  Checkbox,
  Progress,
  Table,
  Spinner,
  Drawer,
  FormLabel,
  FormError,
  CloseButton,
  Textarea,
  Modal,
  Tag,
}

const theme = extendBaseTheme({
  config,
  fonts,
  components,
})

export default theme

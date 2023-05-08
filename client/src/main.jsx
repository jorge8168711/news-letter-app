import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import theme from './theme/theme.js'
import { ChakraBaseProvider, ColorModeScript } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraBaseProvider theme={theme}>
        <ColorModeScript />

        <App />
      </ChakraBaseProvider>
    </BrowserRouter>
  </React.StrictMode>
)

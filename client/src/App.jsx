import { Route, Routes } from 'react-router-dom'
import { Progress } from '@chakra-ui/react'
import { lazy, Suspense } from 'react'

import Layout from './Layout'
import NotFound from './NotFound'

const SubscriptionsPage = lazy(() => import('./Subscriptions/Page'))
const NewsLetters = lazy(() => import('./Newsletters/Newsletters'))

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}>
        <Route
          index
          element={
            <Suspense
              fallback={
                <Progress
                  size="sm"
                  isIndeterminate
                />
              }>
              <NewsLetters />
            </Suspense>
          }
        />

        <Route
          path="newsletters"
          element={
            <Suspense
              fallback={
                <Progress
                  size="sm"
                  isIndeterminate
                />
              }>
              <SubscriptionsPage />
            </Suspense>
          }
        />
      </Route>

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  )
}

export default App

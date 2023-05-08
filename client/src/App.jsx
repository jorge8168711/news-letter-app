import { Route, Routes } from 'react-router-dom'
import { Progress } from '@chakra-ui/react'
import { lazy, Suspense } from 'react'

import Layout from './Layout'
import NotFound from './NotFound'

const Subscriptions = lazy(() => import('./Subscriptions'))
const NewsLetters = lazy(() => import('./NewsLetters'))

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
              <Subscriptions />
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

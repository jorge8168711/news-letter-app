import { Route, Routes } from 'react-router-dom'
import { Progress } from '@chakra-ui/react'
import { lazy, Suspense } from 'react'

import Layout from './Layout'
import NotFound from './NotFound'

const Unsubscribe = lazy(() => import('./Unsubscribe'))
const SubscriptionsPage = lazy(() => import('./Subscriptions/Page'))
const NewslettersPage = lazy(() => import('./Newsletters/Page'))
const DashboardPage = lazy(() => import('./Dashboard/Page'))

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
              <DashboardPage />
            </Suspense>
          }
        />

        <Route
          path='/newsletters'
          element={
            <Suspense
              fallback={
                <Progress
                  size="sm"
                  isIndeterminate
                />
              }>
              <NewslettersPage />
            </Suspense>
          }
        />

        <Route
          path="/subscriptions"
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

        <Route
          path="unsubscribe"
          element={
            <Suspense
              fallback={
                <Progress
                  size="sm"
                  isIndeterminate
                />
              }>
              <Unsubscribe />
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

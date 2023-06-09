import { Card, Container } from '@chakra-ui/react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <Card>
        <Container
          maxW="container.xl"
          display="flex"
          alignItems="center"
          gap={6}
          py={6}>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              fontWeight: isActive ? 'bold' : '',
              opacity: isActive ? '1' : '.75',
            })}>
            Dashboard
          </NavLink>

          <NavLink
            to="/newsletters"
            style={({ isActive }) => ({
              fontWeight: isActive ? 'bold' : '',
              opacity: isActive ? '1' : '.75',
            })}>
            Newsletters
          </NavLink>

          <NavLink
            to="/subscriptions"
            style={({ isActive }) => ({
              fontWeight: isActive ? 'bold' : '',
              opacity: isActive ? '1' : '.75',
            })}>
            Emails
          </NavLink>
        </Container>
      </Card>

      <Outlet />
    </>
  )
}

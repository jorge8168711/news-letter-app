import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react'
import { API_BASE_URL, fetcher } from '../constants'
import useSWR from 'swr'
import NumericDashboardCard from './NumericCard'
import { useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { CalendarIcon, EmailIcon, StarIcon } from '@chakra-ui/icons'

function formatNumberToThousands(n) {
  return Math.floor(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const { data, isLoading } = useSWR(`${API_BASE_URL}/send-emails`, fetcher, {
    refreshWhenHidden: true,
    revalidateOnMount: true,
  })

  const { data: subsData, isLoading: subsLoading } = useSWR(
    `${API_BASE_URL}/subscriptions/?only_count=true`,
    fetcher,
    {
      refreshWhenHidden: true,
      revalidateOnMount: true,
    }
  )

  const totalEmailsSent = useMemo(() => {
    if (!data?.body?.length) {
      return 0
    }

    return data.body.reduce((acc, item) => {
      return acc + item.emails.length
    }, 0)
  }, [data?.body])

  return (
    <Container
      maxW="container.lg"
      py={8}>
      <Card mb={8}>
        <CardHeader>
          <Heading size="md">Overview</Heading>
        </CardHeader>

        <CardBody>
          <Stack
            divider={<StackDivider />}
            spacing="4">
            <Box>
              <Heading
                size="xs"
                textTransform="uppercase">
                Newsletters
              </Heading>

              <Text
                pt="2"
                fontSize="sm">
                The Newsletters page allows to manage the news letters templates. You can create,
                edit and delete them. This page also allows to send the newsletters to all the
                subscribed users.
              </Text>

              <Button
                onClick={() => navigate('/newsletters')}
                size="sm"
                mt={4}>
                Go
              </Button>
            </Box>

            <Box>
              <Heading
                size="xs"
                textTransform="uppercase">
                Emails
              </Heading>

              <Text
                pt="2"
                fontSize="sm">
                The emails page allows to manage the subscribed users. This page allows to add
                emails one by one or in bulk using a .csv file.
              </Text>

              <Button
                onClick={() => navigate('/subscriptions')}
                size="sm"
                mt={4}>
                Go
              </Button>
            </Box>
          </Stack>
        </CardBody>
      </Card>

      <Flex
        gap={8}
        flexWrap="wrap">
        {!subsLoading && (
          <NumericDashboardCard
            bg="blue.500"
            title="Total Subscribers"
            number={formatNumberToThousands(subsData?.body?.count || 0)}>
            <StarIcon fontSize={40} />
          </NumericDashboardCard>
        )}

        {!isLoading && (
          <>
            <NumericDashboardCard
              bg="green.500"
              title="Total sent newsletters"
              number={formatNumberToThousands(data?.body?.length || 0)}>
              <CalendarIcon fontSize={40} />
            </NumericDashboardCard>

            <NumericDashboardCard
              bg="orange.500"
              title="Total sent emails"
              number={formatNumberToThousands(totalEmailsSent)}>
              <EmailIcon fontSize={40} />
            </NumericDashboardCard>
          </>
        )}
      </Flex>
    </Container>
  )
}

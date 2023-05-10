const express = require('express')
const subscriptions = require('../components/subscriptions/network')
const newsletters = require('../components/newsletters/network')
const emails = require('../components/emails/network')

// define the base router and all the routes for the different components
const baseRouter = express.Router()
baseRouter.use('/subscriptions', subscriptions)
baseRouter.use('/newsletters', newsletters)
baseRouter.use('/send-emails', emails)

// set prefix path for all routes
const routes = (server) => {
  server.use('/api', baseRouter)
}

module.exports = routes

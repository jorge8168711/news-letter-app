const express = require('express')
const subscriptions = require('../components/subscriptions/network')

const baseRouter = express.Router()
baseRouter.use('/subscriptions', subscriptions)

const routes = (server) => {
  server.use('/api', baseRouter)
}

module.exports = routes

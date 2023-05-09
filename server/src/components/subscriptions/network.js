const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')
const { CREATED, BAD_REQUEST, OK, NOT_FOUND } = require('../../httpStatusCodes')

const router = express.Router()

router.post('/', async (req, res) => {
  const baseData = { req, res }

  try {
    const createdSub = await controller.addSubscription(req.body.name, req.body.email)
    response.success({ ...baseData, body: createdSub, status: CREATED })
  } catch (error) {
    const body = error.message || error
    response.error({ ...baseData, body, status: BAD_REQUEST, error })
  }
})

router.get('/', async (req, res) => {
  const baseData = { req, res }
  const onlyCount = req.query.only_count || false

  try {
    const subs = await controller.getSubscriptions(onlyCount)
    response.success({ ...baseData, body: subs, status: OK })
  } catch (error) {
    const body = error.message || error
    response.error({ ...baseData, body, status: BAD_REQUEST, error })
  }
})

router.get('/:id', async (req, res) => {
  const baseData = { req, res }

  try {
    const sub = await controller.getSubscriptionById(req.params.id)
    if (!sub) throw new Error('The subscription does not exist.')
    response.success({ ...baseData, body: sub, status: OK })
  } catch (error) {
    const body = error.message || error
    response.error({ ...baseData, body, status: NOT_FOUND, error })
  }
})

router.delete('/:id', async (req, res) => {
  const baseData = { req, res }

  try {
    const deletedId = await controller.deleteSubscription(req.params.id)
    if (!deletedId) throw new Error('The subscription does not exist.')
    response.success({ ...baseData, body: { id: deletedId }, status: OK })
  } catch (error) {
    const body = error.message || error
    response.error({ ...baseData, body, status: NOT_FOUND, error })
  }
})

module.exports = router

const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')
const httpStatusCodes = require('../../httpStatusCodes')

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const createdSub = await controller.addSubscription(req.body.email, req.body.name)
    const { _id: id, name, email, created } = createdSub

    response.success({
      req,
      res,
      body: { id, name, email, created },
      status: httpStatusCodes.CREATED
    })
  } catch (error) {
    response.error({
      req,
      res,
      body: 'Error in subscription creation, email and name are required.',
      status: httpStatusCodes.BAD_REQUEST,
      error
    })
  }
})

router.get('/', async (req, res) => {
  try {
    const subs = await controller.getSubscriptions()
    response.success({
      req,
      res,
      body: subs,
      status: httpStatusCodes.OK
    })
  } catch (error) {
    response.error({
      req,
      res,
      body: 'Error getting the subscriptions list.',
      status: httpStatusCodes.BAD_REQUEST,
      error
    })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deletedId = await controller.deleteSubscription(req.params.id)

    if (!deletedId) {
      throw new Error('The subscription does not exist.')
    }

    response.success({
      req,
      res,
      body: { id: deletedId },
      status: httpStatusCodes.OK
    })
  } catch (error) {
    response.error({
      req,
      res,
      body: 'The subscription does not exist.',
      status: httpStatusCodes.NOT_FOUND,
      error
    })
  }
})

module.exports = router

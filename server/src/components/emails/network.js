const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')

const { CREATED, BAD_REQUEST, OK } = require('../../httpStatusCodes')

const router = express.Router()

router.post('/', async (req, res) => {
  const baseData = { req, res }

  try {
    const sentEmail = await controller.sendEmail(req.body.newsletter_id)
    response.success({ ...baseData, body: sentEmail, status: CREATED })
  } catch (error) {
    const body = error.message || error
    response.error({ ...baseData, body, status: BAD_REQUEST, error })
  }
})

router.get('/', async (req, res) => {
  const baseData = { req, res }

  try {
    const emails = await controller.getEmails()
    response.success({ ...baseData, body: emails, status: OK })
  } catch (error) {
    const body = error.message || error
    response.error({ ...baseData, body, status: BAD_REQUEST, error })
  }
})

module.exports = router

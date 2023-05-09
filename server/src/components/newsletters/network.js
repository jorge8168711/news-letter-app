const express = require('express')
const s3Upload = require('./s3Upload')
const response = require('../../network/response')
const controller = require('./controller')

const { CREATED, BAD_REQUEST, OK, NOT_FOUND } = require('../../httpStatusCodes')

const router = express.Router()

router.post('/', s3Upload.single('file'), async (req, res) => {
  const baseData = { req, res }

  try {
    const createdNewsletter = await controller.addNewsletter({
      name: req.body.name,
      body: req.body.body
    })
    response.success({ ...baseData, body: createdNewsletter, status: CREATED })
  } catch (error) {
    const body = error.message || error
    response.error({ ...baseData, body, status: BAD_REQUEST, error })
  }
})

router.get('/', async (req, res) => {
  const baseData = { req, res }

  try {
    const newsLetters = await controller.getNewsLetters()
    response.success({ ...baseData, body: newsLetters, status: OK })
  } catch (error) {
    const body = error.message || error
    response.error({ ...baseData, body, status: BAD_REQUEST, error })
  }
})

router.get('/:id', async (req, res) => {
  const baseData = { req, res }

  try {
    const newsletter = await controller.getNewsLetterById(req.params.id)
    if (!newsletter) throw new Error('The newsletter does not exist.')
    response.success({ ...baseData, body: newsletter, status: OK })
  } catch (error) {
    const body = error.message || error
    response.error({ ...baseData, body, status: NOT_FOUND, error })
  }
})

router.patch('/:id', async (req, res) => {
  const baseData = { req, res }

  try {
    const newsletter = await controller.updateNewsLetter(req.params.id, {
      name: req.body.name,
      body: req.body.body
    })
    if (!newsletter) throw new Error('The newsletter does not exist.')
    response.success({ ...baseData, body: newsletter, status: OK })
  } catch (error) {
    const body = error.message || error
    response.error({ ...baseData, body, status: NOT_FOUND, error })
  }
})

router.delete('/:id', async (req, res) => {
  const baseData = { req, res }

  try {
    const deletedId = await controller.deleteNewsLetter(req.params.id)
    if (!deletedId) throw new Error('The newsletter does not exist.')
    response.success({ ...baseData, body: { id: deletedId }, status: OK })
  } catch (error) {
    const body = error.message || error
    response.error({ ...baseData, body, status: NOT_FOUND, error })
  }
})

module.exports = router

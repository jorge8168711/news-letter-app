const { DeleteObjectCommand } = require('@aws-sdk/client-s3')
const Model = require('./model')
const { s3 } = require('./s3Upload')

async function existInDB (id) {
  try {
    const exist = await Model.exists({ _id: id })
    return exist
  } catch (error) {
    console.error(error)
    return error
  }
}

function mapNewsletter (newsletter) {
  if (!newsletter) return null
  const { _id: id, name, body, created, file, subject } = newsletter
  return { id, body, name, created, file, subject }
}

async function addNewsletter (payload) {
  const modelResult = new Model({ ...payload, created: new Date() })
  const result = await modelResult.save()
  return mapNewsletter(result)
}

async function getNewsLetters () {
  const modelResult = await Model.find()
  return modelResult.map(mapNewsletter)
}

async function getNewsLetterById (id) {
  const modelResult = await Model.findOne({ _id: id })
  return mapNewsletter(modelResult)
}

async function updateNewsLetter (id, payload = {}) {
  const modelResult = await Model.findOneAndUpdate({ _id: id }, payload, { new: true })
  const result = await modelResult.save()
  return mapNewsletter(result)
}

async function deleteNewsLetter (id) {
  const exist = await existInDB(id)
  if (!exist) return null
  const doc = await Model.findOne({ _id: id })

  // delete s3 object
  await s3.send(new DeleteObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: doc.file_key
  }))

  await Model.deleteOne({ _id: id })

  return id
}

module.exports = {
  addNewsletter,
  getNewsLetters,
  getNewsLetterById,
  deleteNewsLetter,
  updateNewsLetter,
  mapNewsletter
}

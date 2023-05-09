const Model = require('./model')

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
  const { _id: id, name, body, created } = newsletter
  return { id, body, name, created }
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
  await modelResult.save()
  return mapNewsletter(modelResult)
}

async function deleteNewsLetter (id) {
  const exist = await existInDB(id)
  if (!exist) return null
  await Model.deleteOne({ _id: id })
  return id
}

module.exports = {
  addNewsletter,
  getNewsLetters,
  getNewsLetterById,
  deleteNewsLetter,
  updateNewsLetter
}

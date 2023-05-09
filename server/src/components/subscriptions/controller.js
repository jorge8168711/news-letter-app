const Model = require('./model')

function mapSubscription (sub) {
  if (!sub) return null

  const { _id: id, email, name, created } = sub
  return { id, email, name, created }
}

async function existInDB (id) {
  try {
    const exist = await Model.exists({ _id: id })
    return exist
  } catch (error) {
    console.error(error)
    return error
  }
}

async function addSubscription (name, email) {
  const modelResult = new Model({ name, email, created: new Date() })
  const result = await modelResult.save()
  return mapSubscription(result)
}

async function getSubscriptions (onlyCount = false) {
  if (onlyCount) {
    const count = await Model.count()
    return { count }
  }

  const modelResult = await Model.find()
  return modelResult.map(mapSubscription)
}

async function getSubscriptionById (id) {
  const modelResult = await Model.findOne({ _id: id })
  return mapSubscription(modelResult)
}

async function deleteSubscription (id) {
  const exist = await existInDB(id)
  if (!exist) return null
  await Model.deleteOne({ _id: id })
  return id
}

module.exports = {
  addSubscription,
  getSubscriptions,
  deleteSubscription,
  getSubscriptionById
}

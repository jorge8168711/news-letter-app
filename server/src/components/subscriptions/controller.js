const Model = require('./model')
const fs = require('fs')
const { parse } = require('csv-parse')

async function parseCsv (filetPath) {
  const result = { success: [], error: [] }

  try {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    const parser = fs.createReadStream(filetPath).pipe(parse({ columns: true }))

    for await (const record of parser) {
      const { name, email } = record
      const exist = await Model.exists({ email: email.trim() })

      if (exist) {
        result.error.push({ name, email, error: 'Email already exist' })
        continue
      }

      if (!regex.test(email.trim())) {
        result.error.push({ name, email, error: 'Invalid email' })
        continue
      }

      result.success.push({ name, email, created: new Date() })
    }
  } catch (error) {
    console.error(error)
    return error
  }

  return result
}

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

async function addSubscriptionsBulk (filetPath) {
  const rows = await parseCsv(filetPath)
  const modelResult = await Model.insertMany(rows.success)
  rows.success = modelResult.map(mapSubscription)

  return rows
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
  getSubscriptionById,
  addSubscriptionsBulk
}

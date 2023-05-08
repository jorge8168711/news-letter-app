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

function addSubscription (sub) {
  try {
    const newSub = new Model(sub)
    return newSub.save()
  } catch (error) {
    console.error(error)
    return error
  }
}

async function getSubscription () {
  try {
    const subscriptions = await Model.find()

    return subscriptions.map(sub => {
      const { _id: id, email, name, created } = sub
      return { id, email, name, created }
    })
  } catch (error) {
    console.error(error)
    return error
  }
}

async function deleteSubscription (id) {
  try {
    const exist = await existInDB(id)

    if (!exist) {
      return null
    }

    await Model.deleteOne({ _id: id })
    return id
  } catch (error) {
    return error
  }
}

module.exports = {
  add: addSubscription,
  list: getSubscription,
  delete: deleteSubscription
}

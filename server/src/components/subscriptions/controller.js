const store = require('./store')

function addSubscription (name, email) {
  const body = {
    name,
    email,
    created: new Date()
  }

  if (!name || !email) {
    console.error('[addSubscription] User or message not defined.')
    throw new Error('The data is incorrect.')
  }

  return store.add(body)
}

function getSubscriptions () {
  return store.list()
}

function deleteSubscription (id) {
  return store.delete(id)
}

module.exports = {
  addSubscription,
  getSubscriptions,
  deleteSubscription
}

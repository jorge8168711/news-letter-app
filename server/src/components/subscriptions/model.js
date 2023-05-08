const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SubscriptionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  created: Date
})

module.exports = mongoose.model('Subscription', SubscriptionSchema)

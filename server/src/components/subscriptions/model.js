const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SubscriptionSchema = new Schema({
  name: {
    type: String,
    required: [true, 'A name is required']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    minLength: 5,
    maxLength: 50,
    required: [true, 'An email address is required.'],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address.']
  },
  created: Date
})

module.exports = mongoose.model('Subscription', SubscriptionSchema)

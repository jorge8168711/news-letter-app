const mongoose = require('mongoose')

const Schema = mongoose.Schema

const EmailSchema = new Schema({
  sent_date: Date,
  emails: {
    type: [String],
    default: []
  },
  newsletter: {
    required: [true, 'A newsletter is required'],
    type: Schema.ObjectId,
    ref: 'Newsletter'
  }
})

module.exports = mongoose.model('Email', EmailSchema)

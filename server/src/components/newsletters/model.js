const mongoose = require('mongoose')

const Schema = mongoose.Schema

const NewsletterSchema = new Schema({
  name: {
    type: String,
    required: [true, 'A name is required']
  },
  body: {
    type: String,
    required: [true, 'A name is required']
  },
  created: Date,
  file: String,
  file_key: String
})

module.exports = mongoose.model('Newsletter', NewsletterSchema)

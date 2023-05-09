const mongoose = require('mongoose')

async function connect () {
  try {
    const db = await mongoose.connect(process.env.MONGO_URL)
    console.log(`DB connected successfully to: ${db.connection.host}}}`)
  } catch (error) {
    console.error(error)
  }
}

module.exports = connect

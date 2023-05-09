const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const router = require('./src/network/routes')

const mongoose = require('mongoose')
const httpStatusCodes = require('./src/httpStatusCodes')

const app = express()
const port = process.env.PORT || 8000

mongoose.connect(process.env.MONGO_URL)
  .then((db) => `DB connected successfully to: ${db.connection.host}}}`)
  .catch((error) => console.error(error))

app.use(cors())

// body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// morgan logger middleware
app.use(morgan('combined'))

// configure Application routes
router(app)

app.use((req, res) => {
  res.status(404).json({
    message: `${httpStatusCodes.NOT_FOUND}: The requested resource does not exist.`
  })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

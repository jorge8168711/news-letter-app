require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const router = require('./src/network/routes')
const httpStatusCodes = require('./src/httpStatusCodes')
const db = require('./src/db')

const app = express()
const port = process.env.SERVER_PORT || 8000

// mongodb db connection
db()

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

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p)
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown')
    process.exit(1)
  })

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

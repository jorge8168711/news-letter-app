const express = require('express')
const cors = require('cors')

const mongoose = require('mongoose')

const app = express()
const port = 5000

mongoose.connect(process.env.MONGO_URI)
  .then((db) => `DB connected successfully to: ${db.connection.host}}}`)
  .catch((error) => console.error(error))

app.use(cors())

app.get('/api', (req, res) => {
  res.send(
    JSON.stringify({
      users: [
        { name: 'John Doe', id: 1 },
        { name: 'Juan Doe', id: 2 }
      ]
    })
  )
})

app.listen(port, () => {
  console.log(`APP running on port ${port}`)
})

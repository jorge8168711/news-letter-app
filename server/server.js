const express = require('express')

const app = express()
const port = 3000

app.get('/api', (req, res) => {
  res.send({ users: [{ name: 'John Doe', id: 1 }, { name: 'Juan Doe', id: 2 }] })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

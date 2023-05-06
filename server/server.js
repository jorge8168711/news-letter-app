const express = require('express')

const app = express()
const port = 5000

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
  console.log(`Example app listening on port ${port}`)
})

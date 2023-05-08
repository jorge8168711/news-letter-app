function success ({
  req,
  res,
  status = 200,
  body = ''
} = {}
) {
  res.status(status).send({
    error: null,
    body
  })
}

function error ({
  req,
  res,
  status = 500,
  body = '',
  error = ''
} = {}) {
  console.error('[RESPONSE ERROR]: ', error)
  res.status(status).send({
    error: body,
    body: null
  })
}

module.exports = {
  error, success
}

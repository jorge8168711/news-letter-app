const multer = require('multer')
const multerS3 = require('multer-s3')
const { S3Client } = require('@aws-sdk/client-s3')

const s3 = new S3Client({ region: 'us-east-1' })

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'newsletter-s3-bucket',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname })
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + '-' + file.originalname)
    },
  }),
})

module.exports = upload

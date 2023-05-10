const multer = require('multer')
const multerS3 = require('multer-s3')
const { S3Client } = require('@aws-sdk/client-s3')

const s3 = new S3Client({ region: process.env.S3_BUCKET_REGION })
const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf']

const upload = multer({
  limits: {
    fieldNameSize: 100,
    fileSize: 1048576
  },
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname })
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + '-' + file.originalname)
    }
  }),
  fileFilter: (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
    }
  }
})

module.exports = { upload, s3 }

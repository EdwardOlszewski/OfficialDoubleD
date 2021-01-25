import aws from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import dotenv from 'dotenv'

dotenv.config()

aws.config.update({
  secretAccessKey: process.env.ACCESSKEY,
  accessKeyId: process.env.ACCESSID,
  region: process.env.REGION,
})

const s3 = new aws.S3()

var upload = multer({
  storage: multerS3({
    s3,
    bucket: 'doubledbucket2',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    },
  }),
})

export default upload

import aws from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'

aws.config.update({
  secretAccessKey: 'MCl4kadD+XdpxZq59SBIDMYYSSq5coER1dOjWm7Y',
  accessKeyId: 'AKIAIUWSKWDRHSMXEIWA',
  region: 'us-east-2',
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

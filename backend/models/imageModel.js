import mongoose from 'mongoose'

const imageSchema = mongoose.Schema(
  {
    imageURL: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Image = mongoose.model('Image', imageSchema)
export default Image

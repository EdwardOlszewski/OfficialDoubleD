import mongoose from 'mongoose'

const eventSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    venue: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
    price: {
      type: Number,
    },
    isPublished: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
)

const Event = mongoose.model('Event', eventSchema)
export default Event

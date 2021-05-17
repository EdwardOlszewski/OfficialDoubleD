import asyncHandler from 'express-async-handler'
import Event from '../models/eventModel.js'

// @desc    Create an event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = asyncHandler(async (req, res) => {
  const event = new Event({
    user: req.user._id,
    venue: 'New Venue',
    address: 'New Address',
    time: 'New Time',
    date: '01/01/21',
    price: 0.0,
    url: 'New Url',
    imageUrl: 'empty',
    isPublished: false,
  })
  const createdEvent = await event.save()
  res.status(201).json(createdEvent)
})

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)

  if (event) {
    await event.remove()
    res.json({ message: 'Event removed' })
  } else {
    res.status(404)
    throw new Error('Event not found')
  }
})

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = asyncHandler(async (req, res) => {
  const {
    venue,
    address,
    time,
    date,
    price,
    url,
    imageUrl,
    isPublished,
  } = req.body

  const event = await Event.findById(req.params.id)

  if (event) {
    event.venue = venue
    event.address = address
    event.time = time
    event.date = date
    event.price = price
    event.url = url
    event.imageUrl = imageUrl
    event.isPublished = isPublished

    const updatedEvent = await event.save()
    res.json(updatedEvent)
  } else {
    res.status(404)
    throw new Error('Event not found')
  }
})

// @desc    Fetch all events
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find()
  res.json({ events })
})

// @desc    Fetch single Event
// @route   GET /api/Events/:id
// @access  Public
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)

  if (event) {
    res.json(event)
  } else {
    res.status(404)
    throw new Error('Event not found')
  }
})

export { getEvents, createEvent, getEventById, updateEvent, deleteEvent }

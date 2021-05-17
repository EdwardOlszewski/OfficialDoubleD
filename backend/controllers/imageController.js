import asyncHandler from 'express-async-handler'
import Image from '../models/imageModel.js'

// @desc    Create a Carousel Image
// @route   POST /api/carousel
// @access  Private/Admin
const createCarouselImage = asyncHandler(async (req, res) => {
  const { imageURL } = req.body

  console.log(imageURL)

  const image = new Image({
    imageURL: imageURL,
  })
  const createdImage = await image.save()
  res.status(201).json(createdImage)
})

// @desc    get all carousel images
// @route   GET /api/carousel
// @access  Private/Admin
const getAllCarouselImages = asyncHandler(async (req, res) => {
  const images = await Image.find()
  res.json({ images })
})

// @desc    Delete a carousel image
// @route   DELETE /api/carousel/:id
// @access  Private/Admin
const deleteCarouselImage = asyncHandler(async (req, res) => {
  const image = await Image.findById(req.params.id)

  if (image) {
    await image.remove()
    res.json({ message: 'Image removed' })
  } else {
    res.status(404)
    throw new Error('Image not found')
  }
})

export { createCarouselImage, getAllCarouselImages, deleteCarouselImage }

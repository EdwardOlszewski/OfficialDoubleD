import express from 'express'
const router = express.Router()
import {
  createCarouselImage,
  getAllCarouselImages,
  deleteCarouselImage,
} from '../controllers/imageController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(createCarouselImage).get(getAllCarouselImages)
router.route('/:id').delete(protect, admin, deleteCarouselImage)
export default router

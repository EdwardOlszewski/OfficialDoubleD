import express from 'express'
import createCharge from '../services/stripe-charge.js'
import { protect } from '../middleware/authMiddleware.js'
import { updateOrderToPaid } from '../controllers/orderController.js'
const router = express.Router()

router.route('/').post(createCharge)

export default router

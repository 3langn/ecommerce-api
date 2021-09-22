import express from 'express';
import orderController from '../../controllers/order.controller.js';
import auth from '../../middleware/auth.js';
const router = express.Router();

router.post('/', auth(), orderController.createOrder);

router.get('/', auth(), orderController.getOrder);

export default router;

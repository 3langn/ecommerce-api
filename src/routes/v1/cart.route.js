import express from 'express';
import cartController from '../../controllers/cart.controller.js';
import auth from '../../middleware/auth.js';
const router = express.Router();

router.post('/add-to-cart', auth(), cartController.addToCart);

export default router;

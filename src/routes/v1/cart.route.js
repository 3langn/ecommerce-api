import express from 'express';
import cartController from '../../controllers/cart.controller.js';
import auth from '../../middleware/auth.js';
const router = express.Router();

router.get('/', auth(), cartController.getCart);
router.post('/add-to-cart', auth(), cartController.addToCart);
router.post('/update', auth(), cartController.updateCart);
export default router;

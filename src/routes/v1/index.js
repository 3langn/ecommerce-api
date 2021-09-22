import express from 'express';
import authRoute from './auth.route.js';
import docsRoute from './docs.route.js';
import productRoute from './product.route.js';
import cartRoute from './cart.route.js';
import orderRoute from './order.route.js';
const router = express.Router();

router.use('/auth', authRoute);
router.use('/docs', docsRoute);
router.use('/product', productRoute);
router.use('/cart', cartRoute);
router.use('/order', orderRoute);
export default router;

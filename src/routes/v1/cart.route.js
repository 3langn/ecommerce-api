import express from 'express';
import cartController from '../../controllers/cart.controller.js';
import auth from '../../middleware/auth.js';
const router = express.Router();

router.get('/', auth(), cartController.getCart);
router.post('/add-to-cart', auth(), cartController.addToCart);
router.post('/update', auth(), cartController.updateCart);
export default router;

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: CRUD Cart
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *           example:
 *             name: TV
 *             image: imageUrl
 *             brand: LV
 *             category: techlonogy
 *             description: Television for watch film
 *             price: 999
 *             countInStock: 1
 *             rating: 5
 *             numReviews: 442
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Product has been added successfully!'
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       "400":
 *         description: Create product error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             example:
 *               code: 400
 *               message: Create product failed
 */

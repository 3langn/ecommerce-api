import express from 'express';
import productController from '../../controllers/product.controller.js';
import auth from '../../middleware/auth.js';

const router = express.Router();

router.post('/add', auth(), productController.addProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.delete('/delete/:id', auth(), productController.deleteProduct);
router.put('/:id', auth(), productController.editProduct);
export default router;

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: CRUD Product
 */

/**
 * @swagger
 * /product/add:
 *   post:
 *     summary: Add a product
 *     tags: [Product]
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

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       "200":
 *         description: All products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *               example:
 *                 -  name: TV
 *                    image: imageUrl
 *                    brand: LV
 *                    category: techlonogy
 *                    description: Television for watch film
 *                    price: 999
 *                    countInStock: 1
 *                    rating: 5
 *                    numReviews: 442
 *       "400":
 *         description: Create product error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             example:
 *               code: 400
 *               message: Get products failed
 */

/**
 * @swagger
 * /product/:id:
 *   get:
 *     summary: Get a product
 *     tags: [Product]
 *     parameters:
 *       - in: params
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of product
 *     responses:
 *       "200":
 *         description: Get a product by product id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *               example:
 *                 name: TV
 *                 image: imageUrl
 *                 brand: LV
 *                 category: techlonogy
 *                 description: Television for watch film
 *                 price: 999
 *                 countInStock: 1
 *                 rating: 5
 *                 numReviews: 442
 *
 *       "400":
 *         description: Get product error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             example:
 *               code: 400
 *               message: Get a product failed
 */

/**
 * @swagger
 * /product/delete/:
 *   delete:
 *     summary: Delete a product by id
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: params
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of product
 *     responses:
 *       "200":
 *         description: Delete a product by id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             properties:
 *               message:
 *                 type: string
 *             example:
 *               message: 'Product has been deleted successfully!'
 *       "400":
 *         description: Delete product error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             example:
 *               code: 400
 *               message: Delete product failed
 */

/**
 * @swagger
 * /product/:id:
 *   put:
 *     summary: Update a product by id
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: params
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of product
 *     responses:
 *       "200":
 *         description: Update a product by id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             properties:
 *               message:
 *                 type: string
 *             example:
 *               message: 'Product has been updated successfully!'
 *       "400":
 *         description: Update product error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *             example:
 *               code: 400
 *               message: Update product failed
 */

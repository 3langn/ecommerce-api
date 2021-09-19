import express from 'express';
import productController from '../../controllers/product.controller.js';
import auth from '../../middleware/auth.js';

const router = express.Router();

router.post('/add', auth(), productController.addProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.delete('/delete/:id', productController.deleteProduct);
router.put('/:id', productController.editProduct);
export default router;

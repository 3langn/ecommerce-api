import express from 'express';
<<<<<<< HEAD
import productService from '../../services/product.service.js';
import catchAsync from '../../utils/catchAsync.js';
import productController from '../../controllers/product.controller.js';
const router = express.Router();

router.post('/add', productController.addProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.delete('/:id', productController.deleteProduct);
=======
import httpStatus from 'http-status';
import Product from '../../models/product.model.js';
import catchAsync from '../../utils/catchAsync.js';

const router = express.Router();

router.post(
  '/add',
  catchAsync(async (req, res) => {
    const product = await Product.create(req.body.product);
    res.status(httpStatus.CREATED).send({ product, message: 'Product has been added successfully!' });
  })
);

router.get(
  '/',
  catchAsync(async (req, res) => {
    const products = await Product.find();
    res.send(products);
  })
);
>>>>>>> 146299fad12423b75455c8bdaf811905987ea8c9

export default router;

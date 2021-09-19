import express from 'express';
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

export default router;

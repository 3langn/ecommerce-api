import httpStatus from 'http-status';
import Product from '../models/product.model.js';
import productService from '../services/product.service.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';

const addProduct = catchAsync(async (req, res) => {
  const product = new Product({ ...req.body.product, userId: req.user.id });
  await product.save();
  res.status(httpStatus.CREATED).send({ product, message: 'Product has been added successfully!' });
});

const getProducts = catchAsync(async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

const getProduct = catchAsync(async (req, res) => {
  const product = await productService.findById(req.params.id);
  res.send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProduct(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const editProduct = catchAsync(async (req, res) => {
  await productService.editProduct(req.params.id, req.body.product);
  res.status(httpStatus.NO_CONTENT).send();
});
export default {
  addProduct,
  getProducts,
  getProduct,
  editProduct,
  deleteProduct,
};

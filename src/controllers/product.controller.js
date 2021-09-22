import httpStatus from 'http-status';
import logger from '../config/logger.js';
import Product from '../models/product.model.js';
import productService from '../services/product.service.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';

const addProduct = catchAsync(async (req, res) => {
  try {
    const product = new Product({ ...req.body, userId: req.user.id });
    await product.save();
    res.status(httpStatus.CREATED).send({ product, message: 'Product has been added successfully!' });
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Create product failed');
  }
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
  res.send({ message: 'Product has been deleted successfully!' });
});

const editProduct = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  if (product.userId != req.user.id) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Not authorized!');
  }
  await Product.findByIdAndUpdate(product.id, update);
  res.send({ message: 'Product has been updated successfully!' });
});

export default {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  editProduct,
};

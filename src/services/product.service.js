import httpStatus from 'http-status';
import logger from '../config/logger.js';
import Product from '../models/product.model.js';
import ApiError from '../utils/ApiError.js';

const findById = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return product;
};

const deleteProduct = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  product.remove();
};

export default {
  findById,
  deleteProduct,
};

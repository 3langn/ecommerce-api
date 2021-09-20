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
  try {
    const product = await findById(productId);
    product.remove();
  } catch (error) {
    throw error;
  }
};

export default {
  findById,
  deleteProduct,
};

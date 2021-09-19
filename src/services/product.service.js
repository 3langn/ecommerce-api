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
    throw new ApiError(httpStatus.BAD_REQUEST, "Can't delete product");
  }
};

const editProduct = async (productId, update) => {
  try {
    await Product.findByIdAndUpdate(productId, update);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Can't update product");
  }
};

export default {
  findById,
  deleteProduct,
  editProduct,
};

import httpStatus from 'http-status';
import logger from '../config/logger.js';
import { cartModel } from '../models/cart.model.js';
import cartService from '../services/cart.service.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';
const addToCart = catchAsync(async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItem = req.body.cartItem;

    await cartService.addToCart(userId, cartItem);
    res.status(httpStatus.CREATED).send({ message: 'Add to cart successfully !' });
  } catch (error) {
    logger.error(error);
    throw new ApiError(httpStatus.BAD_REQUEST, "Can't add item to cart !");
  }
});

const getCart = catchAsync(async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await cartService.getCart(userId);

    res.send(cart);
  } catch (error) {
    logger.debug(error.statusCode);
    if (!error.statusCode) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Can't get cart");
    }
    throw new ApiError(error.statusCode, error.message);
  }
});

export default {
  addToCart,
  getCart,
};

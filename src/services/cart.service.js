import httpStatus from 'http-status';
import logger from '../config/logger.js';
import { cartModel } from '../models/cart.model.js';
import ApiError from '../utils/ApiError.js';
const addToCart = async (userId, cartItem) => {
  try {
    let cart = await cartModel.findOne({ userId });
    if (!cart) {
      cart = new cartModel({ cartItems: [cartItem], userId });
      await cart.save();
      return;
    }
    const cartProductIndex = cart.cartItems.findIndex((product) => {
      return product.product.toString() === cartItem.productId;
    });
    if (cartProductIndex >= 0) {
      cart.cartItems[cartProductIndex].quantity += cartItem.quantity;
    } else {
      cart.cartItems.push({ ...cartItem });
    }
    return await cart.save();
  } catch (error) {
    logger.error(error);
    if (!error.statusCode) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Can't add item to cart !");
    }
    throw new ApiError(error.statusCode, error.message);
  }
};

const getCart = async (userId) => {
  try {
    const cart = await cartModel.findOne({ userId }).populate({ path: 'cartItems.product' });
    if (!cart) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Cart is empty');
    }
    return cart;
  } catch (error) {
    logger.error(error);
    if (!error.statusCode) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Can't get cart");
    }
    throw new ApiError(error.statusCode, error.message);
  }
};

const updateCart = async (userId, productId, quantity) => {
  try {
    const cart = await cartModel.findOneAndUpdate(
      { userId, cartItems: { $elemMatch: { productId } } },
      {
        $set: {
          'cartItems.$.quantity': quantity,
        },
      },
      { new: true }
    );
    const index = cart.cartItems.findIndex((item) => item.quantity <= 1);
    if (index > -1) {
      cart.cartItems.splice(index, 1);
    }
    await cart.save();
  } catch (error) {
    logger.error(error);

    if (!error.statusCode) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Can't update cart");
    }
    throw new ApiError(error.statusCode, error.message);
  }
};

export default {
  addToCart,
  getCart,
  updateCart,
};

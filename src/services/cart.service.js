import httpStatus from 'http-status';
import { cartModel } from '../models/cart.model.js';
import ApiError from '../utils/ApiError.js';

const addToCart = async (userId, cartItem) => {
  let cart = await cartModel.findOne({ userId });
  if (!cart) {
    cart = new cartModel({ cartItems: [cartItem], userId });
    await cart.save();
    return;
  }
  const cartProductIndex = cart.cartItems.findIndex((product) => {
    return product.productId.toString() === cartItem.productId;
  });
  if (cartProductIndex >= 0) {
    cart.cartItems[cartProductIndex].quantity += cartItem.quantity;
  } else {
    cart.cartItems.push({ ...cartItem });
  }
  await cart.save();
};

const getCart = async (userId) => {
  const cart = await cartModel.findOne({ userId }).populate({ path: 'cartItems.productId' });
  if (!cart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart is empty');
  }
  return cart;
};

export default {
  addToCart,
  getCart,
};

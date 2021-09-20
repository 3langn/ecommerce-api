import httpStatus from 'http-status';
import { cartModel } from '../models/cart.model.js';

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

export default {
  addToCart,
};

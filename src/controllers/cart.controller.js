import httpStatus from 'http-status';
import cartService from '../services/cart.service.js';
import catchAsync from '../utils/catchAsync.js';
const addToCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const cartItem = req.body.cartItem;
  const cart = await cartService.addToCart(userId, cartItem);
  res.status(httpStatus.CREATED).send({ message: 'Add to cart successfully !', cart });
});

const getCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const cart = await cartService.getCart(userId);
  res.send(cart);
});

const updateCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const productId = req.body.product;
  const quantity = req.body.quantity;

  await cartService.updateCart(userId, productId, quantity);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  addToCart,
  getCart,
  updateCart,
};

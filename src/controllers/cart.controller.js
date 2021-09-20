import httpStatus from 'http-status';
import logger from '../config/logger.js';
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

export default {
  addToCart,
};

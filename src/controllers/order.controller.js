import catchAsync from '../utils/catchAsync.js';
import httpStatus from 'http-status';
import orderService from '../services/order.service.js';

const createOrder = catchAsync(async (req, res) => {
  const cartItems = req.body.cartItems;
  const userId = req.user.id;
  const order = await orderService.createOrder(userId, cartItems);
  res.status(httpStatus.CREATED).send(order);
});

export default { createOrder };

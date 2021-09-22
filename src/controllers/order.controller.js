import catchAsync from '../utils/catchAsync.js';
import httpStatus from 'http-status';
import orderService from '../services/order.service.js';
import orderModel from '../models/order.model.js';
import logger from '../config/logger.js';

const createOrder = catchAsync(async (req, res) => {
  const cartItems = req.body.cartItems;
  const userId = req.user.id;
  const order = await orderService.createOrder(userId, cartItems);
  res.status(httpStatus.CREATED).send(order);
});

const getOrder = catchAsync(async (req, res) => {
  const user = req.user.id;
  const order = await orderModel.findOne({ user }).populate('orderItems.product');

  res.send(order);
});

export default { createOrder, getOrder };

import catchAsync from '../utils/catchAsync.js';
import httpStatus from 'http-status';
import orderService from '../services/order.service.js';
import orderModel from '../models/order.model.js';
import logger from '../config/logger.js';
import ApiError from '../utils/ApiError.js';

const createOrder = catchAsync(async (req, res) => {
  const cartItems = req.body.cartItems;
  const userId = req.user.id;
  const order = await orderService.createOrder(userId, cartItems);
  res.status(httpStatus.CREATED).send(order);
});

const getOrder = catchAsync(async (req, res) => {
  const user = req.user.id;
  const order = await orderModel
    .findOne({ user })
    .populate('orderItems.product')
    .catch((error) => {
      logger.error(error);
      throw new ApiError(httpStatus.BAD_REQUEST, "Can't get order");
    });
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  res.send(order);
});

const deleteOrder = catchAsync(async (req, res) => {
  try {
    const user = req.user;
    const orderId = req.params.id;
    const order = await orderModel.findOneAndRemove({ user, _id: orderId });
    if (!order) {
      throw Error();
    }
  } catch (error) {
    logger.error(error);
    throw new ApiError(httpStatus.BAD_REQUEST, "Can't delete product");
  }

  res.status(httpStatus.NO_CONTENT).send();
});

export default { createOrder, getOrder, deleteOrder };

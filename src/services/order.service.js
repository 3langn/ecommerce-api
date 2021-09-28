import httpStatus from 'http-status';
import logger from '../config/logger.js';
import orderModel from '../models/order.model.js';
import ApiError from '../utils/ApiError.js';
import { cartModel } from '../models/cart.model.js';

const createOrder = async (userId, cartItems) => {
  try {
    const cart = await cartModel.findOne({ userId: userId });
    const products = await cart.cartItems.filter((item) =>
      cartItems.some((citem) => citem.cartItemId === item._id.toString())
    );

    if (products.length !== cartItems.length) {
      throw Error();
    }

    const orderItems = products.map((item, i) => {
      return {
        product: item.product,
        quantity: item.quantity,
        name: cartItems[i].name,
        phone: cartItems[i].phone,
        address: cartItems[i].address,
        total: cartItems[i].total,
      };
    });
    cart.remove();
    return await orderModel.create({ orderItems, user: userId });
  } catch (error) {
    logger.error(error);
    throw new ApiError(httpStatus.BAD_REQUEST, 'Something wrong, please try again !');
  }
};

const deleteOrder = async (user, orderId) => {
  try {
    const order = await orderModel.findOneAndRemove({ user, _id: orderId });
    if (!order) {
      throw Error();
    }
  } catch (error) {
    logger.error(error);
    throw new ApiError(httpStatus.BAD_REQUEST, "Can't delete product");
  }
};

export default {
  createOrder,
  deleteOrder,
};

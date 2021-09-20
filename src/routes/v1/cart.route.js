import express from 'express';
<<<<<<< HEAD
import httpStatus from 'http-status';
import { cartModel, cartItemModel } from '../../models/cart.model.js';
import catchAsync from '../../utils/catchAsync.js';
import auth from '../../middleware/auth.js';
import ApiError from '../../utils/ApiError.js';
import logger from '../../config/logger.js';

const router = express.Router();

router.post(
  '/add-to-cart',
  auth(),
  catchAsync(async (req, res) => {
    try {
      const userId = req.user.id;
      const cartItem = req.body.cartItem;
      let cart = await cartModel.findOne({ userId });
      if (!cart) {
        cart = new cartModel({ products: [req.body.cartItem], userId: req.user.id });
        await cart.save();
        return res.status(httpStatus.CREATED).send({ message: 'Add to cart successfully !' });
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
      res.status(httpStatus.CREATED).send({ message: 'Add to cart successfully !' });
    } catch (error) {
      logger.error(error);
      throw new ApiError(httpStatus.BAD_REQUEST, "Can't add item to cart !");
    }
  })
);
=======
import cartController from '../../controllers/cart.controller.js';
import auth from '../../middleware/auth.js';
const router = express.Router();

router.post('/add-to-cart', auth(), cartController.addToCart);
>>>>>>> cart

export default router;

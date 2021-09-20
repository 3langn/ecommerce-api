import mongoose from 'mongoose';
import { toJSON } from './plugins/index.js';

const cartItemSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});
cartItemSchema.plugin(toJSON);
const cartItemModel = mongoose.model('CartItem', cartItemSchema);

const cartSchema = mongoose.Schema({
  cartItems: [cartItemSchema],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
cartItemSchema.plugin(toJSON);
const cartModel = mongoose.model('Cart', cartSchema);
export { cartItemModel, cartModel };

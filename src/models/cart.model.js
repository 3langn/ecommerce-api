import mongoose from 'mongoose';
<<<<<<< HEAD
=======
import { toJSON } from './plugins/index.js';
>>>>>>> cart

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
<<<<<<< HEAD
=======
cartItemSchema.plugin(toJSON);
>>>>>>> cart
const cartItemModel = mongoose.model('CartItem', cartItemSchema);

const cartSchema = mongoose.Schema({
  cartItems: [cartItemSchema],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
<<<<<<< HEAD

=======
cartItemSchema.plugin(toJSON);
>>>>>>> cart
const cartModel = mongoose.model('Cart', cartSchema);
export { cartItemModel, cartModel };

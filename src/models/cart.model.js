import mongoose from 'mongoose';

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
const cartItemModel = mongoose.model('CartItem', cartItemSchema);

const cartSchema = mongoose.Schema({
  cartItems: [cartItemSchema],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const cartModel = mongoose.model('Cart', cartSchema);
export { cartItemModel, cartModel };

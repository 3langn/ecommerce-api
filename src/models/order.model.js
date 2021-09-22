import mongoose from 'mongoose';

const orderItemSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      maxLength: 20,
      required: true,
    },
    phone: {
      type: String,
      maxLength: 10,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const orderItemModel = mongoose.model('OrderItem', orderItemSchema);

const orderSchema = mongoose.Schema(
  {
    orderItems: [
      {
        type: orderItemSchema,
        required: true,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);
const orderModel = mongoose.model('Order', orderSchema);

export default orderModel;

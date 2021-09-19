import mongoose from 'mongoose';
import { paginate, toJSON } from './plugins/index.js';

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      require: true,
    },
    brand: {
      type: String,
      default: null,
    },
    //TODO: use enum
    category: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    countInStock: {
      type: Number,
      require: true,
    },
    rating: {
      type: Number,
      require: true,
    },
    numReviews: {
      type: Number,
      require: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
  },
  {
    timestamp: true,
  }
);

productSchema.plugin(toJSON);
productSchema.plugin(paginate);

export default mongoose.model('Product', productSchema);

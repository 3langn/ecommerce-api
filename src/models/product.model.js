import mongoose from 'mongoose';

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
  },
  {
    timestamp: true,
  }
);

export default mongoose.model('Product', productSchema);

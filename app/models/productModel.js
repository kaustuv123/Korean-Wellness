import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    default: null,
  },
  image: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  attributes: {
    size: {
      type: Number,
    },
    fragrane: {
      type: String,
    },
  },
  ratings: {
    type: Number,
    default: 5,
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;

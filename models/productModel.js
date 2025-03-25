import mongoose from "mongoose";
import Category from "./categoryModel";

const productSchema = new mongoose.Schema({
  // productId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  // category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  images: { type: [String], required: true },
  inStock: { type: Boolean, default: true },
  // attributes: { type: Map, of: String, default: {} },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;

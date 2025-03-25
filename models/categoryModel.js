import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  attributes: [{
    name: { type: String, required: true },
    type: { type: String, required: true },
    required: { type: Boolean, default: false }
  }]
});

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;

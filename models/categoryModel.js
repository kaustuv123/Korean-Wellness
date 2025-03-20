import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    categoryId: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    attributes: { type: Object, default: {} }
})

const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category;
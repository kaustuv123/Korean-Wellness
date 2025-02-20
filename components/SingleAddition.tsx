"use client";

import { useState } from "react";
import axios from "axios";

export default function SingleAddition() {
  const [formData, setFormData] = useState({
    productId: "",
    name: "",
    slug: "",
    categoryId: "",
    category: "",
    description: "",
    price: "",
    discount: "",
    images: "",
    stock: "",
    attributes: { size: "", purpose: "" },
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle attributes separately
    if (name.startsWith("attributes.")) {
      const key = name.split(".")[1]; // Extract attribute key
      setFormData((prevData) => ({
        ...prevData,
        attributes: { ...prevData.attributes, [key]: value },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Submit form data to backend API
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const productData = { ...formData, images: [formData.images] }; // Convert image to array

    try {
      const response = await axios.post("/api/products/singleAdd", {
        product: productData,
      });
      setMessage(`✅ ${response.data.message}`);
      setFormData({
        productId: "",
        name: "",
        slug: "",
        categoryId: "",
        category: "",
        description: "",
        price: "",
        discount: "",
        images: "",
        stock: "",
        attributes: { size: "", purpose: "" },
      });
    } catch (error) {
      setMessage(
        `❌ Error: ${error.response?.data?.error || "Something went wrong"}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add Single Product</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="productId"
          placeholder="Product ID"
          value={formData.productId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={formData.slug}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="categoryId"
          placeholder="Category ID"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="discount"
          placeholder="Discount"
          value={formData.discount}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="images"
          placeholder="Image URL"
          value={formData.images}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="attributes.size"
          placeholder="Size"
          value={formData.attributes.size}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="attributes.purpose"
          placeholder="Purpose"
          value={formData.attributes.purpose}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
      {message && <p className="text-center mt-2">{message}</p>}
    </div>
  );
}

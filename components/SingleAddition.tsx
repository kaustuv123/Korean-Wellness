"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

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
    images: [],
    stock: "",
    attributes: { size: "", purpose: "" },
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("attributes.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        attributes: { ...prev.attributes, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle Cloudinary upload success
  const handleUploadSuccess = ({ info }) => {
    if (info?.secure_url) {
      setFormData(prev => ({ 
        ...prev, 
        images: [...prev.images, info.secure_url] 
      }));
      setMessage("✅ Image uploaded successfully");
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/api/products/singleAdd", {
        product: formData,
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
        images: [],
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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Product</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eggPlant focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eggPlant focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eggPlant focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Category and Pricing */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eggPlant focus:border-transparent"
              required
            >
              <option value="">Select Category</option>
              <option value="shampoos">Shampoos</option>
              <option value="treatments">Treatments</option>
              <option value="bodywash">Body Wash</option>
              <option value="bodylotions">Body Lotions</option>
              <option value="handwash">Hand Wash</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eggPlant focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount
              </label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eggPlant focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eggPlant focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Attributes and Images - Full Width */}
        <div className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size
              </label>
              <input
                type="text"
                name="attributes.size"
                value={formData.attributes.size}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eggPlant focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Purpose
              </label>
              <input
                type="text"
                name="attributes.purpose"
                value={formData.attributes.purpose}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eggPlant focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Images
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <CldUploadWidget 
                  uploadPreset="zc86sxcx" 
                  onSuccess={handleUploadSuccess}
                >
                  {({open}) => (
                    <button 
                      type="button"
                      onClick={() => open()} 
                      className="bg-eggPlant text-white py-2 px-4 rounded-lg"
                    >
                      Upload
                    </button>
                  )}
                </CldUploadWidget>
              </div>
            </div>
            {formData.images.length > 0 && (
              <div className="mt-4 flex gap-2 flex-wrap">
                {formData.images.map((url, index) => (
                  <Image
                    key={index}
                    src={url}
                    alt={`Product ${index + 1}`}
                    width={80}
                    height={80}
                    className="h-20 w-20 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button - Full Width */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-eggPlant text-white py-2 px-4 rounded-lg hover:bg-eggPlant/90 transition-colors disabled:bg-gray-400"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </div>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm font-medium">
          {message}
        </p>
      )}
    </div>
  );
}

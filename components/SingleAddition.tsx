"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Script from "next/script";

interface Attribute {
  name: string;
  type: string;
  required: boolean;
}

interface Category {
  categoryId: string;
  name: string;
  attributes: Attribute[];
}

export default function SingleAddition() {
  const [formData, setFormData] = useState({
    productId: "",
    name: "",
    slug: "",
    category: "",
    description: "",
    price: "",
    discount: "",
    images: [], // Cloudinary Image URLs
    stock: "",
    size: "",
    purpose: "",
    attributes: {},
  });

  // const [categories, setCategories] = useState<{ categoryId: string; name: string }[]>([]);
  // const [categoryAttributes, setCategoryAttributes] = useState<{ name: string; type: string; required: boolean }[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [attributes, setAttributes] = useState<Record<string, string>>({});

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await axios.get("/api/categories");
  //       setCategories(response.data);
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //     }
  //   };
  //   fetchCategories();
  // }, []);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  // const handleCategoryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {

  //   const categoryId = e.target.value;
  //   setFormData((prev) => ({ ...prev, category: categoryId, attributes: {} }));

  //   try {
  //     const response = await axios.get(`/api/categories/${categoryId}`);
  //     const attributes = response.data.data.attributes || [];
  //     setCategoryAttributes(attributes);

  //     const defaultAttributes: Record<string, string> = {};
  //     attributes.forEach((attr: { name: string }) => {
  //       defaultAttributes[attr.name] = "";
  //     });

  //     setFormData((prev) => ({
  //       ...prev,
  //       attributes: defaultAttributes,
  //     }));
  //   } catch (error) {
  //     console.error("Error fetching category attributes:", error);
  //   }
  // };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
  
    // Find the selected category
    const category = categories.find((cat) => cat.categoryId === categoryId);
    if (category) {
      // Initialize attributes with empty values
      const defaultAttributes: Record<string, string> = {};
      category.attributes.forEach((attr) => {
        defaultAttributes[attr.name] = "";
      });
  
      // ✅ Update formData state as well
      setFormData((prev) => ({
        ...prev,
        category: categoryId,
        attributes: defaultAttributes,
      }));
  
      setAttributes(defaultAttributes);
    }
  };
  

  const handleAttributeChange = (name: string, value: string) => {
    setAttributes((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Cloudinary Upload Widget
  const openCloudinaryWidget = () => {
    // @ts-expect-error
    if (window.cloudinary) {
      // @ts-expect-error
      const myWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: process.env.CLOUDINARY_CLOUD_NAME,
          uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
          folder: "products",
        },
        (error: unknown, result: any) => {
          if (!error && result && result.event === "success") {
            setFormData((prev) => ({
              ...prev,
              images: [...prev.images, result.info.secure_url], // Store Cloudinary URL
            }));
            setMessage("✅ Image uploaded successfully!");
          }
        }
      );
      myWidget.open();
    } else {
      console.error("Cloudinary script not loaded.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        category: "",
        description: "",
        price: "",
        discount: "",
        images: [],
        stock: "",
        size: "",
        purpose: "",
        attributes: {},
      });
    } catch (error) {
      setMessage(`❌ Error: ${error.response?.data?.error || "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-5">Add New Product</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Product Name */}
        <div>
          <label className="block font-medium">Product Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>

        {/* Category Selection */}
        <div>
          <label className="block font-medium">Category</label>
          {/* <select name="category" value={formData.category} onChange={handleCategoryChange} className="w-full border p-2 rounded" required>
            <option value="">Select Category</option>
            {categories.map((cat: any, index) => (
              <option key={cat.categoryId || index} value={cat.categoryId}>
                {cat.name}
              </option>
            ))}
          </select> */}
          <select onChange={handleCategoryChange} className="w-full p-2 border rounded">
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.categoryId} value={cat.categoryId}>
            {cat.name}
          </option>
        ))}
      </select>
        </div>

        {/* Other Inputs */}
        <div>
          <label className="block font-medium">Slug</label>
          <input type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>

        <div className="col-span-1">
          <label className="block font-medium">Price</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>

        <div>
          <label className="block font-medium">Discount</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="col-span-2">
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={3}
          />
        </div>

        {/* Image Upload via Cloudinary */}
        <div className="col-span-2">
          <label className="block font-medium">Product Image</label>
          <button type="button" onClick={openCloudinaryWidget} className="px-4 py-2 bg-blue-500 text-white rounded mt-2">
            Upload Image
          </button>

          {/* Show Uploaded Images */}
          {formData.images.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.images.map((url, index) => (
                <Image key={index} src={url} alt="Product" width={80} height={80} className="object-cover border rounded" />
              ))}
            </div>
          )}
        </div>

        {/* {categoryAttributes.map((attr: { name: string, type: string, required: boolean }, index) => (
          <div key={attr.name || index} className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">{attr.name}</label>
            <input
              type={attr.type || "text"}
              name={`attributes.${attr.name}`}
              value={formData.attributes[attr.name] || ""}
              onChange={handleChange}
              required={attr.required}
              className="w-full border p-2 rounded"
            />
          </div>
        ))} */}

{selectedCategory &&
  categories
    .find((cat) => cat.categoryId === selectedCategory)
    ?.attributes.map((attr, index) => (
      <div key={attr.name || index} className="col-span-1">
        <label className="block text-sm font-medium text-gray-700">{attr.name}</label>
        <input
          type={attr.type}
          required={attr.required}
          name={`attributes.${attr.name}`} // Ensure proper naming
          value={attributes[attr.name] || ""}
          onChange={(e) => handleAttributeChange(attr.name, e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
    ))}



        <div className="col-span-2">
          <button type="submit" disabled={loading} className="px-4 py-2 bg-green-500 text-white rounded">
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </div>
      </form>

      {message && <p className="mt-4 text-center text-sm font-medium">{message}</p>}

      <Script src="https://widget.cloudinary.com/v2.0/global/all.js" strategy="lazyOnload" />
    </div>
  );
}

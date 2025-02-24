"use client";

import { useState } from "react";
import axios from "axios";
import productData from "../data/productData"; // Ensure you have this file

export default function ProductAddition() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const uploadProducts = async () => {
    setLoading(true);
    setMessage("");

    // Flatten product data into an array
    const productsArray = Object.values(productData).flat();
    console.log(productsArray);

    try {
      const response = await axios.post("/api/products/add", {
        products: productsArray,
      });

      setMessage(`✅ ${response.data.message}`);
    } catch (error: any) {
      setMessage(
        `❌ Error: ${error.response?.data?.error || "Something went wrong"}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Bulk Product Upload</h2>
      <button
        onClick={uploadProducts}
        className="w-full bg-blue-500 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Products"}
      </button>
      {message && <p className="text-center mt-2">{message}</p>}
    </div>
  );
}

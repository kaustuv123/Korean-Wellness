// models/Order.js
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },
        name: { 
          type: String, 
          required: true 
        },
        quantity: { 
          type: Number, 
          required: true 
        }
      }
    ],
    amount: { 
      type: Number, 
      required: true 
    },
    address: {
      firstName: String,
      lastName: String,
      phoneNumber: String,
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String
    },
    transactionId: { 
      type: String 
    },
    merchantTransactionId: {
      type: String,
      required: true,
      unique: true
    },
    status: {
      type: String,
      enum: ["payment_pending","pending", "completed", "failed"],
      default: "payment_pending"
    }
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
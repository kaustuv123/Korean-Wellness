import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    isDefault: {
      type: Boolean,
      default: false, // Mark one address as default
    },
  },
  { _id: false } // Prevents Mongoose from creating an unnecessary `_id` for each address
);

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a firstname"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a lastname"],
    },
    contactNo: {
      type: String,
      required: [true, "Please provide contact number"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    addresses: {
      type: [addressSchema], // Array of address objects
      default: [], // If no addresses are added, it will be an empty array
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    // OTP related fields
    otp: String,
    otpExpiry: Date,
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Add index for OTP expiry to automatically clean up expired OTPs
userSchema.index({ otpExpiry: 1 }, { expireAfterSeconds: 0 });

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;

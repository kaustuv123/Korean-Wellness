import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
    },
    email: String,
    alternatePhoneNumber: String,
    street: {
      type: String,
      required: [true, "Street address is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
    postalCode: {
      type: String,
      required: [true, "Postal code is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
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

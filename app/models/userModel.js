import mongoose from "mongoose";

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
      required: [true, "Please provide a email"],
      unique: true,
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
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    // Recovery related fields
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Add index for OTP expiry to automatically clean up expired OTPs
userSchema.index({ otpExpiry: 1 }, { expireAfterSeconds: 0 });

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;

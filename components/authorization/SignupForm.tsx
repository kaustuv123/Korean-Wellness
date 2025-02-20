"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { FaEnvelope, FaUser, FaPhone } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    phone: "",
  });
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [otpError, setOtpError] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleClose = () => {
    router.back();
  };

  const handleSendOTP = async () => {
    try {
      setIsSendingOtp(true);
      setOtpError("");

      const response = await axios.post("/api/users/signup", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        contactNo: formData.phone,
        email: formData.email,
      });

      if (response.data.success) {
        setShowOTP(true);
        setIsOtpSent(true);
        setTimer(30);
        toast.success("OTP sent successfully!");
        console.log("OTP for testing:", response.data.otp);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Failed to send OTP";
      toast.error(errorMessage);
      setIsOtpSent(false);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value !== "" && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const isFormValid = () => {
    const basicValidation =
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.email.includes("@") &&
      formData.phone.length === 10 &&
      errors.phone === "";

    if (!basicValidation) return false;
    if (isOtpSent) {
      return otp.every((digit) => digit !== "");
    }
    return false;
  };

  const clearOTPFields = () => {
    setOtp(["", "", "", ""]);
    const firstInput = document.getElementById("otp-0");
    if (firstInput) {
      firstInput.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");

    try {
      setIsCreatingAccount(true);
      const enteredOTP = otp.join("");

      const response = await axios.put("/api/users/signup", {
        email: formData.email,
        otp: enteredOTP,
      });

      if (response.data.success) {
        localStorage.setItem("isLoggedIn", "true");
        window.dispatchEvent(new Event("loginStateChange"));
        toast.success("Account created successfully!");
        setTimeout(() => {
          router.push("/");
        }, 30);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Signup failed";
      setOtpError(errorMessage);
      clearOTPFields();
      setTimer(0);
      toast.error(errorMessage);
    } finally {
      setIsCreatingAccount(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] backdrop-blur-sm bg-black/30 flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white p-6 sm:p-10 text-slate-500 w-full max-w-[420px] rounded-lg"
      >
        <h1 className="text-center text-xl sm:text-2xl text-neutral-700 font-medium mb-4">
          Sign Up
        </h1>
        <p className="text-sm text-center mb-6">
          Create an account to get started
        </p>

        <div className="flex gap-4 mb-4">
          <div className="border flex-1 px-4 sm:px-6 py-2 flex items-center gap-2 rounded-full">
            <FaUser className="text-gray-400 flex-shrink-0" />
            <input
              className="outline-none text-sm w-full"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              required
            />
          </div>
          <div className="border flex-1 px-4 sm:px-6 py-2 flex items-center gap-2 rounded-full">
            <FaUser className="text-gray-400 flex-shrink-0" />
            <input
              className="outline-none text-sm w-full"
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="border px-4 sm:px-6 py-2 flex items-center gap-2 rounded-full">
            <FaPhone className="text-gray-400 flex-shrink-0" />
            <input
              className="outline-none text-sm w-full"
              type="tel"
              pattern="[0-9]{10}"
              maxLength={10}
              placeholder="Mobile Number"
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setFormData({ ...formData, phone: value });
                if (value.length !== 10 && value.length > 0) {
                  setErrors((prev) => ({
                    ...prev,
                    phone: "Mobile Number must be of 10 Digits",
                  }));
                } else {
                  setErrors((prev) => ({ ...prev, phone: "" }));
                }
              }}
              required
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1 ml-2">{errors.phone}</p>
          )}
        </div>

        <div className="relative mb-4">
          <div className="border px-4 sm:px-6 py-2 flex items-center gap-2 rounded-full">
            <FaEnvelope className="text-gray-400 flex-shrink-0" />
            <input
              className="outline-none text-sm w-full"
              type="email"
              placeholder="Enter Your Email ID"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setOtpError("");
              }}
              required
            />
          </div>
          <button
            type="button"
            onClick={handleSendOTP}
            disabled={
              !formData.email.includes("@") || timer > 0 || isSendingOtp
            }
            className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 rounded-full text-sm ${
              formData.email.includes("@") && timer === 0 && !isSendingOtp
                ? "bg-eggPlant text-white hover:bg-[#915063]"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            {isSendingOtp
              ? "Sending..."
              : isOtpSent
              ? "Resend OTP"
              : "Send OTP"}
          </button>
          {timer > 0 && (
            <p className="text-xs text-gray-500 absolute right-2 -bottom-5">
              Resend OTP in {timer}s
            </p>
          )}
        </div>

        {showOTP && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">
              Enter OTP sent to your email
            </p>
            <div className="flex gap-2 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    handleOtpChange(index, e.target.value);
                    setOtpError("");
                  }}
                  className={`w-12 h-12 border rounded-lg text-center text-lg font-semibold 
                    ${otpError ? "border-red-500" : "border-gray-300"}`}
                />
              ))}
            </div>
            {otpError && (
              <p className="text-red-500 text-sm text-center mt-2">
                {otpError}
              </p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={!isFormValid() || isCreatingAccount}
          className={`w-full py-2 rounded-full text-sm sm:text-base transition-colors ${
            isFormValid() && !isCreatingAccount
              ? "bg-eggPlant text-white hover:bg-[#915063]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isCreatingAccount ? "Creating Account..." : "Create Account"}
        </button>

        <p className="mt-5 text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-eggPlant cursor-pointer hover:underline"
          >
            Login
          </Link>
        </p>

        <button
          type="button"
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 cursor-pointer hover:bg-gray-100 p-1 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
      </form>
    </div>
  );
}

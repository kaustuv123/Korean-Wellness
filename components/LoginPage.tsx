"use client";

import { useState, useEffect } from "react";
import React from "react";
import { X } from "lucide-react";
import { FaEnvelope, FaLock, FaUser, FaPhone } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

interface LoginPageProps {
  onClose: () => void;
}

const LoginPage = ({ onClose }: LoginPageProps) => {
  const router = useRouter();

  const [user, setUser] = React.useState({
    firstName: "",
    lastName: "",
    contactNo: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false);
  const [state, setState] = useState<"Login" | "Sign Up">("Login");
  const [errors, setErrors] = useState({
    phone: '',
    password: ''
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  const onlogin = async () => {};

  const onsignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      onClose();
    } catch (error) {
      console.log("Signup failed ");
      toast.error("signup failed");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    if (state === "Login") {
      return user.email.trim() !== '' && user.password.trim() !== '';
    }
    
    return (
      user.firstName.trim() !== '' &&
      user.lastName.trim() !== '' &&
      user.contactNo.trim() !== '' &&
      user.email.trim() !== '' &&
      user.password.trim() !== '' &&
      errors.phone === '' &&
      errors.password === ''
    );
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[100] backdrop-blur-sm bg-black/30 flex justify-center items-center p-4">
      <form
        onSubmit={state === "Login" ? onlogin : onsignup}
        className="relative bg-white p-6 sm:p-10 rounded-xl text-slate-500 w-full max-w-[420px] max-h-[90vh] overflow-y-auto"
      >
        <h1 className="text-center text-xl sm:text-2xl text-neutral-700 font-medium">
          {state}
        </h1>
        <p className="text-sm text-center mb-6">
          {state === "Login"
            ? "Welcome Back! Please sign in to continue"
            : "Create an account to get started"}
        </p>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full border border-gray-300 px-4 sm:px-6 py-2 flex items-center justify-center gap-2 rounded-full mb-6 hover:bg-gray-50 transition-colors text-sm sm:text-base"
        >
          <FcGoogle size={20} />
          <span>Continue with Google</span>
        </button>

        <div className="flex items-center gap-2 mb-6">
          <div className="flex-1 h-[1px] bg-gray-300"></div>
          <span className="text-sm text-gray-500">or</span>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>

        {state === "Login" ? (
          <>
            <div className="border px-4 sm:px-6 py-2 flex items-center gap-2 rounded-full mb-4">
              <FaEnvelope className="text-gray-400 flex-shrink-0" />
              <input
                className="outline-none text-sm w-full"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Enter Your Email ID"
                required
              />
            </div>

            <div className="border px-4 sm:px-6 py-2 flex items-center gap-2 rounded-full mb-4">
              <FaLock className="text-gray-400 flex-shrink-0" />
              <input
                className="outline-none text-sm w-full"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Enter Your Password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!isFormValid()}
              className={`w-full py-2 rounded-full text-sm sm:text-base transition-colors ${
                isFormValid() 
                  ? 'bg-eggPlant text-white hover:bg-[#915063]' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Login
            </button>

            <p className="mt-5 text-center text-sm">
              Don&apos;t have an account?{" "}
              <span
                className="text-eggPlant cursor-pointer hover:underline"
                onClick={() => setState("Sign Up")}
              >
                Sign Up
              </span>
            </p>
          </>
        ) : (
          <>
            <div className="flex gap-4 mb-4">
              <div className="border flex-1 px-4 sm:px-6 py-2 flex items-center gap-2 rounded-full">
                <FaUser className="text-gray-400 flex-shrink-0" />
                <input
                  className="outline-none text-sm w-full"
                  type="text"
                  value={user.firstName}
                  onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="border flex-1 px-4 sm:px-6 py-2 flex items-center gap-2 rounded-full">
                <FaUser className="text-gray-400 flex-shrink-0" />
                <input
                  className="outline-none text-sm w-full"
                  type="text"
                  value={user.lastName}
                  onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>

            <div className="border px-4 sm:px-6 py-2 flex items-center gap-2 rounded-full mb-4">
              <FaPhone className="text-gray-400 flex-shrink-0" />
              <input
                className="outline-none text-sm w-full"
                type="tel"
                value={user.contactNo}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setUser({ ...user, contactNo: value });
                  if (value.length !== 10 && value.length > 0) {
                    setErrors(prev => ({ ...prev, phone: 'Mobile Number must be of 10 digits' }));
                  } else {
                    setErrors(prev => ({ ...prev, phone: '' }));
                  }
                }}
                pattern="[0-9]{10}"
                maxLength={10}
                placeholder="Mobile Number"
                required
              />
            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-1 ml-2">{errors.phone}</p>}

            <div className="border px-4 sm:px-6 py-2 flex items-center gap-2 rounded-full mb-4">
              <FaEnvelope className="text-gray-400 flex-shrink-0" />
              <input
                className="outline-none text-sm w-full"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Enter Your Email ID"
                required
              />
            </div>

            <div className="border px-4 sm:px-6 py-2 flex items-center gap-2 rounded-full mb-4">
              <FaLock className="text-gray-400 flex-shrink-0" />
              <input
                className="outline-none text-sm w-full"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Enter Your Password"
                required
              />
            </div>

            <div className="border px-4 sm:px-6 py-2 flex items-center gap-2 rounded-full mb-4">
              <FaLock className="text-gray-400 flex-shrink-0" />
              <input
                className="outline-none text-sm w-full"
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => {
                  if (e.target.value !== user.password) {
                    setErrors(prev => ({ ...prev, password: 'Passwords do not match' }));
                  } else {
                    setErrors(prev => ({ ...prev, password: '' }));
                  }
                }}
                required
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1 ml-2">{errors.password}</p>}

            <button
              type="submit"
              disabled={loading || !isFormValid()}
              className={`w-full py-2 rounded-full text-sm sm:text-base transition-colors ${
                isFormValid() 
                  ? 'bg-eggPlant text-white hover:bg-[#915063]' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <p className="mt-5 text-center text-sm">
              Already have an account?{" "}
              <span
                className="text-eggPlant cursor-pointer hover:underline"
                onClick={() => setState("Login")}
              >
                Login
              </span>
            </p>
          </>
        )}

        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 cursor-pointer hover:bg-gray-100 p-1 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
      </form>
    </div>
  );
};

export default LoginPage;


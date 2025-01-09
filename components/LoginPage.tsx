"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

interface LoginPageProps {
  onClose: () => void;
}

const LoginPage = ({ onClose }: LoginPageProps) => {
  const [state, setState] = useState<"Login" | "Sign Up">("Login");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[100] backdrop-blur-sm bg-black/30 flex justify-center items-center p-4">
      <form className="relative bg-white p-6 sm:p-10 rounded-xl text-slate-500 w-full max-w-[420px] max-h-[90vh] overflow-y-auto">
        <h1 className="text-center text-xl sm:text-2xl text-neutral-700 font-medium">
          {state}
        </h1>
        <p className="text-sm text-center mb-6">Welcome Back! Please sign in to continue</p>

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

        {state !== "Login" && (
          <div className="border px-4 sm:px-6 py-2 flex items-center gap-2 rounded-full">
            <FaUser className="text-gray-400 flex-shrink-0" />
            <input
              className="outline-none text-sm w-full"
              type="text"
              placeholder="Full Name"
              required
            />
          </div>
        )}

        <div className="border px-4 sm:px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <FaEnvelope className="text-gray-400 flex-shrink-0" />
          <input
            className="outline-none text-sm w-full"
            type="email"
            placeholder="Enter Your Email ID"
            required
          />
        </div>

        <div className="border px-4 sm:px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <FaLock className="text-gray-400 flex-shrink-0" />
          <input
            className="outline-none text-sm w-full"
            type="password"
            placeholder="Enter Your Password"
            required
          />
        </div>

        <p className="text-sm text-eggPlant my-4 cursor-pointer hover:underline">
          Forgot Password?
        </p>
        <button 
          type="submit"
          className="bg-eggPlant w-full text-white py-2 rounded-full hover:bg-[#915063] transition-colors text-sm sm:text-base"
        >
          {state === "Login" ? "Login" : "Create Account"}
        </button>

        {state === "Login" ? (
          <p className="mt-5 text-center text-sm">
            Don&apos;t have an account?{" "}
            <span
              className="text-eggPlant cursor-pointer hover:underline"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center text-sm">
            Already have an account?{" "}
            <span
              className="text-eggPlant cursor-pointer hover:underline"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
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

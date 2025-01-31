/* eslint-disable no-unused-vars */
import React from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../axiosIntance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "/auth/register-user",
        formData
      );
      // Notify on success
      toast.success(response.data.message || "Registration successful!");

      // Navigate to login page after successful registration
      navigate("/login");
    } catch (error) {
      const errorMsg =
        error.response?.data?.error || "An error occurred during registration.";
      // Notify on error
      toast.error(errorMsg);
    }
  };

  return (
    <div className="h-screen grid justify-center items-center ">
      <span className="absolute top-4 left-5">
        Go back to{" "}
        <Link to="/" className="text-cyan-900">
          Home
        </Link>
      </span>
      <div className="mt-8 px-2">
        <form
          onSubmit={handleSubmit}
          className=" shadow-md w-pixel-basic-width2 rounded pb-2"
        >
          <div className="px-2">
            <div className="py-3 text-center">
              <h1 className="text-xl font-medium">Sign up</h1>
            </div>
            <div className="md:grid grid-cols-2">
              <div className="px-2 mb-2">
                <input
                  type="text"
                  placeholder="Name..."
                  onChange={handleInputChange}
                  value={formData.nname}
                  name="name"
                  className="w-full border-basic-border h-10 px-3 outline-none rounded-sm"
                  required
                />
              </div>
              <div className="px-2 mb-2">
                <input
                  type="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                  value={formData.email}
                  name="email"
                  className="w-full border-basic-border h-10 px-3 outline-none rounded-sm"
                  required
                />
              </div>
              <div className="px-2 mb-2">
                <input
                  type="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  name="password"
                  className="w-full border-basic-border h-10 px-3 outline-none rounded-sm"
                />
              </div>
              <div className="py-2 text-center  px-4 col-span-2 ">
                <span className="text-center">
                  Already have an account?{" "}
                  <NavLink className="text-blue-500" to="/login">
                    Login
                  </NavLink>{" "}
                </span>
              </div>
              <div className="px-2 mb-1 col-span-2">
                <button
                  className="text-white rounded w-full duration-300 px-2 py-2 mt-6 border-white bg-gradient-to-r from-blue-900 via-cyan-600 to-green-800 hover:scale-105"
                  type="submit"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

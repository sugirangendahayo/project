/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axiosInstance from "../axiosIntance";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AdminForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigate function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "/auth/register-admin",
        formData, // Axios automatically converts this to JSON
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response);
      // Handle successful registration
      setMessage(response.data.message || response.data.error);

      // Redirect to home page after successful registration
      if (response.status === 200) {
        navigate("/"); // Redirect to the homepage
      }
    } catch (error) {
      console.log(error);
      // Handle errors from the server
      setMessage(
        error.response?.data?.error || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        className="w-full max-w-md p-8 rounded shadow-md shadow-white"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">
          SuperAdmin Registration
        </h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            className="w-full px-4 py-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Register
        </button>

        {message && (
          <div className="mt-4 text-center text-sm text-red-500">{message}</div>
        )}
      </form>
    </div>
  );
};

export default AdminForm;

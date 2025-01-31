/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../axiosIntance";



const AddBooks = () => {


  const [values, setValues] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    pdf_file: "", // For storing the uploaded PDF file
  });

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("author", values.author);
    formData.append("category", values.category);
    formData.append("price", values.price);
    formData.append("pdf_file", values.pdf_file); // Append the PDF file directly

    try {
      const response = await axiosInstance.post("/books/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        // Handle success
        toast.success("Book uploaded successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        
      } else {
        console.error("Error creating book:", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "pdf_file") {
      // Handle PDF file
      setValues({
        ...values,
        [name]: files[0],
      });
    } else {
      // Handle other fields
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  return (
    <>
      <div className="grid md:grid-cols-12 md:mt-8">
        <div className="px-3 md:px-16 py-2 bg-gray-100 bg-center bg-no-repeat md:col-span-9 rounded-md">
          <div className="col-span-1 flex justify-between py-3">
            <span className="text-medium font-medium">Add Book</span>
            <span className="flex justify-center items-center font-medium">
              <span>
                <svg
                  data-slot="icon"
                  className="w-6"
                  fill="none"
                  stroke-width="1.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  ></path>
                </svg>
              </span>
              <span>{name}</span>
            </span>
          </div>
          <ToastContainer />
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md"
          >
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={values.title}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:cyan-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700"
              >
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={values.author}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={values.category}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={values.price}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="pdf_file"
                className="block text-sm font-medium text-gray-700"
              >
                PDF File
              </label>
              <input
                type="file"
                id="pdf_file"
                name="pdf_file"
                accept="application/pdf"
                onChange={handleChange}
                className="file-input file-input-bordered file-input-info w-full max-w-xs"
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-cyan-500 hover:bg-white hover:text-cyan-500 hover:border-basic-border hover:border-cyan-500 duration-300 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBooks;

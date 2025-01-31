/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../../axiosIntance"; // Assuming axiosInstance is set up correctly
import book_img from "../../assets/images/doc.jpg";
import { useCart } from "react-use-cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../context/HookContext";
import { NavLink } from "react-router-dom";

const Books = () => {
  const { addItem } = useCart();
  const { auth } = useContext(UserContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const Notify = () => {
    toast.success("Added to cart", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  useEffect(() => {
    // Fetch the list of books from the backend
    axiosInstance
      .get("/books") // Assuming this is the correct endpoint
      .then((response) => {
        setBooks(response.data.books); // Assuming the response contains a books array
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load books.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <span className="text-xl font-medium">Loading books...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center mt-20">
        <span className="text-xl font-medium text-red-500">{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-3xl font-semibold mb-8">Available Books</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={book_img} // Assuming the image URL is part of the book object
              alt={book.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">{book.title}</h2>
              <p className="text-gray-700 mt-2">{book.author}</p>
              <p className="text-gray-500 mt-2">{book.category}</p>
              <p className="text-lg font-semibold text-cyan-600 mt-2">
                Price: ${book.price}
              </p>
              <div className="mt-4 flex justify-between">
                <a
                  href={`/book/${book.id}`} // Assuming each book has a unique page
                  className="text-blue-500 hover:text-blue-700 font-semibold"
                >
                  View Details
                </a>

                <button
                  className="btn bg-cyan-500 rounded-full text-white text-2xl  p-2 flex items-center cursor-pointer hover:border-basic-border duration-300 hover:bg-white hover:text-cyan-500 hover:border-cyan-400 hover:items-center"
                  onClick={() => {
                    auth
                      ? (addItem(book), Notify())
                      : document.getElementById("my_modal_3").showModal();
                  }}
                >
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
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    ></path>
                  </svg>
                </button>
                <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-cyan-500">
                        ✕
                      </button>
                    </form>
                    <h3 className="font-bold text-lg">Sorry dear!</h3>
                    <p className="py-4">Please log in to place an order. </p>
                    <span className="block bg-cyan-500 px-2 py-1 rounded text-white text-center">
                      <NavLink to="/login">Login</NavLink>
                    </span>
                  </div>
                </dialog>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;

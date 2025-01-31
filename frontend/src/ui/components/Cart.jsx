/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { NavLink } from "react-router-dom";
import { useCart } from "react-use-cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import image2 from "../../assets/images/empty-cart.png";
import image3 from "../../assets/images/empty-cart.png";
import image4 from "../../assets/images/animated-payment-cart.gif";
import image5 from "../../assets/images/doc.jpg";
import { UserContext } from "../../context/HookContext";
import axiosInstance from "../../axiosIntance";

const Cart = () => {
  const { auth, userDetails } = useContext(UserContext);
  const {
    isEmpty,
    cartTotal,
    totalUniqueItems,
    items,
    totalItems,
    emptyCart,
    updateItemQuantity,
    removeItem,
  } = useCart();
  // console.log(emptyCart);
  // console.log(auth);
 
  if (!auth) {
    emptyCart();
  }
  const Notify = () => {
    toast.success("Order placed succesfully", {
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
const placeOrder = async () => {
  if (!auth) {
    toast.error("You must be logged in to place an order.");
    return;
  }

  try {
    const orderData = {
      user_id: userDetails[0].id, // Ensure user ID is correct
      totalAmount: cartTotal, // Match backend key
      cartItems: items.map((item) => ({
        id: item.id, // Ensure correct field names
        quantity: item.quantity,
        price: item.price,
      })),
    };

    const response = await axiosInstance.post("/orders/place-order", orderData);

    if (response.status === 201) {
      console.log("Order placed successfully!");
      Notify(); // Show success notification

      // Delay emptying the cart by 5 seconds (5000ms)
      setTimeout(() => {
        emptyCart();
      }, 1500);
    }
  } catch (error) {
    toast.error("Failed to place order. Try again later.");
    console.error("Order error:", error);
  }
};



  if (isEmpty)
    return auth ? (
      <>
        <div className="grid justify-center py-3">
          <div className="">
            <img src={image2} alt="" className="w-60 m-auto" />
          </div>
          <div className="py-3">
            <h1 className="text-3xl">Oops! Empty cart :) </h1>
          </div>
        </div>
      </>
    ) : (
      <div className="grid justify-center py-3">
        <div className="">
          <img src={image3} alt="" className="w-60 m-auto" />
        </div>
        <div className="py-3">
          <h1 className="text-3xl">Oops! Empty cart:)</h1>
        </div>
        <div className="bg-cyan-500 text-white px-4 py-2 rounded text-center">
          <button>
            <NavLink to="/login">Login for shopping</NavLink>
          </button>
        </div>
      </div>
    );
  return (
    <>
      <div className="bg-gray-100">
        <ToastContainer />
        <div className="m-auto bg-gray-500 flex justify-center items-center py-8">
          <div className="text-white text-center">
            <h1 className="text-2xl">Cart Summary</h1>
            <p>Home - Our Menu</p>
          </div>
        </div>
        <div className="bg-white ">
          <h1 className="text-2xl  px-2 py-3">Total Items: {totalItems}</h1>
        </div>
        <section className="grid md:grid-cols-3">
          <div className="md:col-span-2 m-1">
            {items.map((item) => (
              <div
                className="bg-white  md:grid grid-cols-4 border-basic-border px-2 py-2 "
                key={item.id}
              >
                <div className="col-span-2">
                  <h1 className="text-center text-xl font-medium text-gray-500 py-3">
                    Items - {totalUniqueItems}
                  </h1>
                  <div className="flex justify-center md:justify-start items-center">
                    <div className="m-2">
                      <img
                        src={image5}
                        alt=""
                        className="w-full h-32 sm:h-36 object-cover rounded"
                      />
                    </div>
                    <div className="text-center m-2">
                      <span className="text-xl font-medium">{item.title}</span>
                      <span className="block font-medium">{item.price}</span>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 ">
                  <h1 className="text-center text-xl font-medium text-gray-500 py-3">
                    Quantity
                  </h1>
                  <div className="   mt-16">
                    <div className="flex justify-center items-center">
                      <button
                        className="rounded-full bg-white hover:bg-cyan-500 border-basic-border border-cyan-500 hover:border-none text-cyan-500 hover:text-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-lg sm:text-xl md:text-2xl transition-all"
                        onClick={() =>
                          updateItemQuantity(item.id, (item.quantity ?? 0) - 1)
                        }
                      >
                        -
                      </button>
                      <span className="px-4 text-xl">{item.quantity}</span>
                      <button
                        className="rounded-full bg-white hover:bg-cyan-500 border-basic-border border-cyan-500 hover:border-none text-cyan-500 hover:text-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-lg sm:text-xl md:text-2xl transition-all"
                        onClick={() =>
                          updateItemQuantity(item.id, (item.quantity ?? 0) + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <h1 className="text-center text-xl font-medium text-gray-500 py-3">
                    Price
                  </h1>
                  <div className=" mt-16">
                    <div className="flex justify-center items-center">
                      <span className="font-medium pr-1">{item.price}</span>
                      <button
                        onClick={() => {
                          removeItem(item.id);
                          Notify();
                        }}
                        className="hover:text-white hover:bg-red-500 duration-300 rounded-full p-1"
                      >
                        <span>
                          <svg
                            data-slot="icon"
                            className="w-6 inline-block cursor-pointer   "
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
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            ></path>
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-1 bg-white m-1 rounded relative px-1">
            <div className="flex justify-center items-center bg-cyan-500 m-2 rounded-md">
              <div>
                <img src={image4} alt="" />
                <p className="font-medium text-[17px] pb-2 text-white">
                  Finalize your order
                </p>
              </div>
            </div>
            <h1 className="text-center text-xl font-medium  py-3">
              {totalItems} Items
              {/*RWF cartTotal */}
            </h1>
            <div className="px">
              <li className="flex justify-around">
                <span className="text-gray-500 font-medium">Discount</span>
                <span className="font-medium">RWF -0.00</span>
              </li>
              <li className="flex justify-around">
                <span className="text-gray-500 font-medium">Subtotal</span>
                <span className="font-medium">RWF {cartTotal}</span>
              </li>
            </div>

            <button
              
              onClick={placeOrder}
              className="btn w-full mt-20 bg-cyan-500 text-white"
            >
              Place order
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Cart;

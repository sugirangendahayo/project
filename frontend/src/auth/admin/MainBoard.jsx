import {  useEffect, useState } from "react";
import axiosInstance from "../../axiosIntance";


const MainBoard = () => {
 
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
  
     
    
        <div
          className="shadow-inner md:p-2 rounded col-span-9 md:col-span-7 md:m-2"
        >
          <h2 className="text-xl font-bold py-4">Orders Management</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-cyan-700 text-white">
                  <th className="border p-2">Order ID</th>
                  <th className="border p-2">User Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Total Amount (RWF)</th>
                  <th className="border p-2">Order Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.id} className="text-center">
                      <td className="border p-2">{order.id}</td>
                      <td className="border p-2">{order.user_name}</td>
                      <td className="border p-2">{order.email}</td>
                      <td className="border p-2">{order.total_amount}</td>
                      <td className="border p-2">
                        {new Date(order.order_date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="border p-2 text-center">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

  );
};

export default MainBoard;

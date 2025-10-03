import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function AdminDashboard() {
  const { orders, updateQuantity, placeOrder } = useContext(CartContext);

  // Admin sees all orders and can mark them as completed
  const handleComplete = (orderId) => {
    const updatedOrders = orders.map((o) =>
      o.id === orderId ? { ...o, status: "Completed" } : o
    );
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    window.location.reload(); // simple refresh to update
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded shadow bg-white flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                <p>Student: {order.student}</p>
                <p>Status: {order.status}</p>
                <ul className="list-disc ml-5 mt-2">
                  {order.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              {order.status !== "Completed" && (
                <button
                  className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                  onClick={() => handleComplete(order.id)}
                >
                  Mark as Completed
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

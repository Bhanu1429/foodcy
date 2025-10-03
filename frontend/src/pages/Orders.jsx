import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Orders() {
  const { orders } = useContext(CartContext);

  // Show only orders placed by this student (we assume user name is saved in orders)
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded shadow bg-white">
              <h2 className="text-xl font-semibold">Order #{order.id}</h2>
              <p>Student: {order.student}</p>
              <p>Status: {order.status}</p>
              <ul className="list-disc ml-5 mt-2">
                {order.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

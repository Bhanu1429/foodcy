import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, placeOrder } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (!user) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    placeOrder(user); // place the order
    alert("Order placed successfully!");
    navigate("/orders");
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return <p className="p-6 text-xl">Your cart is empty.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center border p-4 rounded shadow bg-white">
            <div>
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p>₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => updateQuantity(item.id, Math.max(item.quantity - 1, 1))}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
              <button
                className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Total: ₹{total}</h2>
        <button
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

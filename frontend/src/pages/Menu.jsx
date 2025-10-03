import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

// Mock menu items (later fetch from backend)
const menuItems = [
  { id: 1, name: "Veg Burger", price: 80 },
  { id: 2, name: "Cheese Pizza", price: 150 },
  { id: 3, name: "Pasta", price: 120 },
  { id: 4, name: "Coke", price: 40 },
];

export default function Menu() {
  const { cart, addToCart, removeFromCart, updateQuantity } = useContext(CartContext);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {menuItems.map((item) => {
          const inCart = cart.find((i) => i.id === item.id);

          return (
            <div key={item.id} className="border p-4 rounded shadow bg-white">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="mb-2">₹{item.price}</p>

              {inCart ? (
                <div className="flex items-center space-x-2">
                  <button
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={() =>
                      updateQuantity(item.id, Math.max(inCart.quantity - 1, 1))
                    }
                  >
                    -
                  </button>
                  <span>{inCart.quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={() => updateQuantity(item.id, inCart.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

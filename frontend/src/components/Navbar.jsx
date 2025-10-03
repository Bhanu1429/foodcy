import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="font-bold text-xl">Foodcy</div>
      <div className="space-x-4">
        {!user && <Link to="/login" className="hover:underline">Login</Link>}

        {user?.role === "user" && (
          <>
            <Link to="/" className="hover:underline">Menu</Link>
            <Link to="/cart" className="hover:underline">Cart</Link>
            <Link to="/orders" className="hover:underline">My Orders</Link>
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <Link to="/admin" className="hover:underline">Admin Dashboard</Link>
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

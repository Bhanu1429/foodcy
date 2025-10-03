import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

// Optional: ProtectedRoute component to simplify route protection
function ProtectedRoute({ user, role, children }) {
  if (!user || user.role !== role) {
    return <Login />; // redirect to login if not authorized
  }
  return children;
}

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Home / Menu page - student only */}
        <Route
          path="/"
          element={
            <ProtectedRoute user={user} role="user">
              <Menu />
            </ProtectedRoute>
          }
        />

        {/* Cart Page - student only */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute user={user} role="user">
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* Orders Page - student only */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute user={user} role="user">
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard - admin only */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

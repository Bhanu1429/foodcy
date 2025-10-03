import axios from "axios";

// Create a base Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Auth APIs ---
export const loginUser = (data) => api.post("/auth/login", data);
export const registerUser = (data) => api.post("/auth/register", data);

// --- Menu / Orders APIs ---
export const getMenu = () => api.get("/menu");
export const getOrders = (userId) => api.get(`/orders/${userId}`);
export const placeOrder = (orderData) => api.post("/orders", orderData);
export const updateOrderStatus = (orderId, status) =>
  api.put(`/orders/${orderId}`, { status });

export default api;

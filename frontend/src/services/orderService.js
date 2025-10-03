import API from "./api";

// Place order
export const placeOrder = (orderData) => API.post("/orders", orderData);

// Get orders for a student
export const getUserOrders = (userId) => API.get(`/orders/user/${userId}`);

// Get all orders (admin)
export const getAllOrders = () => API.get("/orders/all");

// Update order status (admin)
export const updateOrderStatus = (orderId, status) => API.put(`/orders/${orderId}`, { status });

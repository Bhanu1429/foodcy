import API from "./api";

// Register student
export const registerUser = (userData) => API.post("/register", userData);

// Login (student/admin)
export const loginUser = (loginData) => API.post("/login", loginData);

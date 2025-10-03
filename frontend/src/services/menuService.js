import API from "./api";

// Get all menu items
export const getMenuItems = () => API.get("/menu");

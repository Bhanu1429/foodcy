import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import authRoutes from "./routes/auth.js";
import menuRoutes from "./routes/menu.js";
import ordersRoutes from "./routes/orders.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", ordersRoutes);

// Test
app.get("/", (req, res) => res.send("Backend running..."));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

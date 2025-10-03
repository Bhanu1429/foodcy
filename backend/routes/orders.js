import express from "express";
import db from "../config/db.js";

const router = express.Router();

// 1️⃣ Place an order (student)
router.post("/", (req, res) => {
  const { user_id, items, total_price } = req.body;

  if (!user_id || !items || !total_price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query(
    "INSERT INTO orders (user_id, items, total_price) VALUES (?, ?, ?)",
    [user_id, JSON.stringify(items), total_price],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: "Order placed successfully!", orderId: result.insertId });
    }
  );
});

// 2️⃣ Get orders of a student
router.get("/user/:userId", (req, res) => {
  const userId = req.params.userId;

  db.query("SELECT * FROM orders WHERE user_id = ?", [userId], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// 3️⃣ Get all orders (admin)
router.get("/all", (req, res) => {
  db.query("SELECT o.*, u.name as user_name, u.email FROM orders o JOIN users u ON o.user_id = u.id ORDER BY o.created_at DESC", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// 4️⃣ Update order status (admin)
router.put("/:orderId", (req, res) => {
  const orderId = req.params.orderId;
  const { status } = req.body;

  if (!["Preparing","Completed"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  db.query("UPDATE orders SET status = ? WHERE id = ?", [status, orderId], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Order status updated successfully" });
  });
});

export default router;

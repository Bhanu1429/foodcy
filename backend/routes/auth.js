import express from "express";
import bcrypt from "bcryptjs";
import db from "../config/db.js";

const router = express.Router();

// -------- Register (Students Only) --------
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user exists
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result.length > 0) return res.status(400).json({ message: "Email already exists" });

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user
      db.query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'user')",
        [name, email, hashedPassword],
        (err, result) => {
          if (err) return res.status(500).json({ error: err });
          res.status(201).json({ message: "User registered successfully!" });
        }
      );
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------- Login (Student/Admin) --------
router.post("/login", (req, res) => {
  const { email, password, role } = req.body;

  db.query("SELECT * FROM users WHERE email = ? AND role = ?", [email, role], async (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(400).json({ message: "Invalid credentials" });

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Return basic user info (later we can add JWT)
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  });
});

export default router;

import express from "express";
import db from "../config/db.js";

const router = express.Router();

// GET all menu items
router.get("/", (req, res) => {
  db.query("SELECT * FROM menu", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

export default router;

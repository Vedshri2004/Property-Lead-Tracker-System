const express = require("express");
const router = express.Router();
const pool = require("../db");


// Add Buyer
router.post("/", async (req, res) => {
  try {
    const { name, phone } = req.body;

    const result = await pool.query(
      "INSERT INTO buyers (name, phone) VALUES ($1, $2) RETURNING *",
      [name, phone]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get All Buyers
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM buyers");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

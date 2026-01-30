const express = require("express");
const router = express.Router();

// ✅ FIXED: db.js is in same folder
const pool = require("./db");


// Create Lead
router.post("/", async (req, res) => {
  try {
    const { buyer_id, broker_id, property_location, budget } = req.body;

    const result = await pool.query(
      `INSERT INTO leads (buyer_id, broker_id, property_location, budget)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [buyer_id, broker_id, property_location, budget]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get All Leads with Buyer + Broker Details
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT leads.id,
              buyers.name AS buyer_name,
              brokers.name AS broker_name,
              property_location,
              budget,
              status,
              created_at
       FROM leads
       JOIN buyers ON leads.buyer_id = buyers.id
       JOIN brokers ON leads.broker_id = brokers.id`
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Update Lead Status
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const leadId = req.params.id;

    const result = await pool.query(
      "UPDATE leads SET status=$1 WHERE id=$2 RETURNING *",
      [status, leadId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

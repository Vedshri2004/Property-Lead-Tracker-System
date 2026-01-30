const express = require("express");
const bodyParser = require("body-parser");

const buyerRoutes = require("./routes/buyers");
const brokerRoutes = require("./routes/brokers");
const leadRoutes = require("./routes/leads");

const app = express();
app.use(bodyParser.json());

app.use("/buyers", buyerRoutes);
app.use("/brokers", brokerRoutes);
app.use("/leads", leadRoutes);

app.get("/", (req, res) => {
  res.send("🏡 Property Lead Tracker API Running Successfully...");
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const subscriptionRoutes = require("./routes/subscriptionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "SaveStack backend running 🚀" });
});

// Connect subscription routes
app.use("/subscriptions", subscriptionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
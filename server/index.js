const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/crypto_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Coin Schema
const coinSchema = new mongoose.Schema({}, { collection: "coins" });
const Coin = mongoose.model("Coin", coinSchema);

// Pagination and search endpoint
app.get("/api/allcoins", async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get page number from query
  const search = req.query.search || ""; // Get search query from request
  const limit = 50; // Number of items per page
  const skip = (page - 1) * limit; // Calculate items to skip

  try {
    // Build the search filter
    const searchFilter = search
      ? { name: { $regex: new RegExp(search, "i") } } // Case-insensitive search
      : {};

    // Count total coins based on the search filter
    const totalCoins = await Coin.countDocuments(searchFilter);

    // Fetch coins with pagination and search filter
    const coins = await Coin.find(searchFilter)
      .skip(skip)
      .limit(limit)
      .select(
        "id symbol name image current_price high_24h low_24h price_change_percentage_24h market_cap_rank"
      );

    res.json({ totalCoins, coins });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

app.get("/api/coindetails/:name", async (req, res) => {
  const coinName = req.params.name;

  try {
    const coin = await Coin.findOne({ name: coinName });
    if (!coin) {
      return res.status(404).json({ message: "Coin not found" });
    }
    res.json(coin);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Create a schema for the user emails
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
});

// Create a model for users
const User = mongoose.model("User", userSchema);

// Route to handle email subscription
app.post("/api/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const newUser = new User({ email });
    await newUser.save();
    res.status(201).json({ message: "Successfully subscribed!" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "Email already exists" });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

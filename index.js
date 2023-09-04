const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

// Set up Express
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to the database"))
.catch(err => console.error("Database connection error:", err));

// Define the Mongoose schema
const smokeSchema = new mongoose.Schema({
  user: String,
  city: String,
  state: String,
  zip: Number
});

const Smoke = mongoose.model("Smoke", smokeSchema);

// POST route for adding data
app.post("/", async (req, res) => {
  const { user, city, state, zip } = req.body;

  try {
    const newSmoke = new Smoke({ user, city, state, zip });
    await newSmoke.save();
    console.log("Data saved successfully!");
    res.redirect("/");
  } catch (err) {
    console.error("Error saving data:", err);
    res.status(500).send("An error occurred while saving data.");
  }
});

// GET route for viewing users
app.get("/view_users", async (req, res) => {
  try {
    const foundUsers = await Smoke.find({});
    res.json(foundUsers);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("An error occurred while fetching data.");
  }
});

// GET route for the main page
app.get("/", (req, res) => {
  res.render("index");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});

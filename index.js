const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser"); // Corrected the spelling of bodyParser
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("DB connected!");
}).catch((err) => {
  console.error(err); // Use console.error for error messages
});

const SmokeSchema = new mongoose.Schema({
  user: String,
  city: String,
  state: String,
  zip: Number
});

const Smoke = mongoose.model("Smoke", SmokeSchema); // Corrected the model creation

app.post("/", async (req, res) => {
    const User = req.body.user;
    const City = req.body.city;
    const State = req.body.state;
    const Zip = req.body.zip;
  
    try {
      const smokeAdd = new Smoke({
        user: User,
        city: City,
        state: State,
        zip: Zip
      });
  
      await smokeAdd.save();
      console.log("Data saved successfully!");
      res.redirect("/"); // Redirect to the main page after saving
    } catch (err) {
      console.error(err);
      res.status(500).send("An error occurred while saving data.");
    }
  });

  app.get("/view_users", async (req, res) => {
    try {
      const foundUsers = await Smoke.find({});
      res.json(foundUsers);
    } catch (err) {
      console.error(err);
      res.status(500).send("An error occurred while fetching data.");
    }
  });
  

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("Server is running on Port 3000");
});

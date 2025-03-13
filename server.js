const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const postRoutes = require("./routes/posts");

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());


app.use(express.static(path.join(__dirname, "views")));


app.use("/api/posts", postRoutes);


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/socialDB";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected...");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));

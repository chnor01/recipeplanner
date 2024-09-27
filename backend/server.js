const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const recipeRoutes = require("./routes/recipes");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI_DOCKER || "mongodb://localhost:27017/usersdb")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));

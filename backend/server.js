const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const recipeRoutes = require("./routes/recipes");
require("dotenv").config();
const { FoodItem } = require("./models/User");
const ingredientsData = require("./food_nutrition.json");



const importIngredientsData = async () => {
  ingredientsData.forEach(async (ingredient) => {
    try {
      await FoodItem.updateOne(
        { Food: ingredient.Food },
        { $set: ingredient },
        { upsert: true }
      );
    } catch (err) {
      console.error("Error during upsert", err);
    }
  });
  
};

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI_DOCKER || "mongodb://localhost:27017/usersdb")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
  importIngredientsData();


app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));

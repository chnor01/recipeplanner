const mongoose = require("mongoose");

const FoodItemsSchema = new mongoose.Schema({
  Food: { type: String, required: true },
  Grams: { type: Number, required: true },
  Calories: { type: Number, required: true },
  Protein: { type: Number, required: true },
  Fat: { type: Number, required: true },
  Satfat: { type: Number, required: true },
  Fiber: { type: Number, required: true },
  Carbs: { type: Number, required: true },
  Category: { type: String, required: true },
});

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  ingredients: [
    {
      foodname: { type: String },
      quantity: { type: Number },
    },
  ],
  instructions: String,
  food_type: {
    type: String,
    enum: ["breakfast", "lunch", "dinner", "snack"],
    required: true,
  },
  nutrients: {
    calories: {
      type: Number,
    },
    protein: {
      type: Number,
    },
    fat: {
      type: Number,
    },
    carbs: {
      type: Number,
    },
  },
});

const WeeklySchema = new mongoose.Schema({
  day: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
  },
  meals: {
    breakfast: [{ type: mongoose.Schema.Types.ObjectId, ref: "User.recipes" }],
    lunch: [{ type: mongoose.Schema.Types.ObjectId, ref: "User.recipes" }],
    dinner: [{ type: mongoose.Schema.Types.ObjectId, ref: "User.recipes" }],
    snack: [{ type: mongoose.Schema.Types.ObjectId, ref: "User.recipes" }],
  },
  dailynutrients: {
    dailycalories: {
      type: Number,
    },
    dailyprotein: {
      type: Number,
    },
    dailyfat: {
      type: Number,
    },
    dailycarbs: {
      type: Number,
    },
  },
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  recipes: [RecipeSchema],
  weeklyrecipes: [WeeklySchema],
});

const User = mongoose.model("User", UserSchema);
const FoodItem = mongoose.model("FoodItem", FoodItemsSchema);
module.exports = { User, FoodItem };

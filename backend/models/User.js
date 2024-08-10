const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  ingredients: [String],
  instructions: String,
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  recipes: [RecipeSchema],
  weeklyRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User.recipes",
    },
  ],
});

const User = mongoose.model("User", UserSchema);
module.exports = { User };

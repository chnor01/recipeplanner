const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const auth = require("../middleware/auth");

router.post("/add", auth, async (req, res) => {
  const { name, ingredients, instructions } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ msg: "Recipe name is required" });
    }
    const user = await User.findById(req.user);

    if (user.recipes.some((recipe) => recipe.name === name)) { //checks array of objects
      return res.status(400).json({ msg: "Recipe already exists" });
    }
    const newRecipe = {
      name,
      ingredients,
      instructions,
    };
    user.recipes.push(newRecipe);

    await user.save();

    res
      .status(201)
      .json({ msg: "Recipe added successfully", recipe: newRecipe });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/add-weekly", auth, async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ msg: "Recipe name is required" });
    }
    const user = await User.findById(req.user);
    const recipe = user.recipes.find((recipe) => recipe.name === name);
    if (!recipe) {
      return res
        .status(404)
        .json({ msg: "Recipe not found in user's recipes" });
    }

    if (user.weeklyRecipes.includes(recipe._id)) {
      return res
        .status(400)
        .json({ msg: "Recipe already in weekly recipes of this user" });
    }
    user.weeklyRecipes.push(recipe._id);
    await user.save();
    res.json({ msg: "Successfully added recipe to weekly recipes", user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

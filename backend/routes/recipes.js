const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const auth = require("../middleware/auth");

router.post("/add", auth, async (req, res) => {
  const { name, ingredients, instructions } = req.body;

  try {
    if (!name || !ingredients || !instructions) {
      return res
        .status(400)
        .json({ msg: "Name, ingredients, instructions are required" });
    }
    const user = await User.findById(req.user);

    if (user.recipes.some((recipe) => recipe.name === name)) {
      //checks array of objects
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
    res.json({ msg: "Successfully added recipe to weekly recipes" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/view-recipes", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const allrecipes = user.recipes;
    res.json(allrecipes);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving food recipes" });
  }
});

router.get("/view-weekly", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const populatedWeeklyRecipes = user.weeklyRecipes.map((recipeId) =>
      user.recipes.find(
        (recipe) => recipe._id.toString() === recipeId.toString()
      )
    );
    res.json(populatedWeeklyRecipes);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving weekly recipes" });
  }
});

router.put("/update-recipe", auth, async (req, res) => {
  try {
    const { name, newname, ingredients, instructions } = req.body;

    const user = await User.findById(req.user);
    const recipe = user.recipes.find((recipe) => recipe.name === name);
    if (!recipe) {
      return res
        .status(404)
        .json({ msg: "Recipe not found in user's recipes" });
    }

    if (newname) recipe.name = newname;
    if (ingredients) recipe.ingredients = ingredients;
    if (instructions) recipe.instructions = instructions;

    await user.save();
    res.status(201).json({ msg: "Successfully updated recipe", recipe });
  } catch (error) {
    res.status(500).json({ error: "Error updating recipe" });
  }
});

router.delete("/delete-recipe", auth, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ msg: "Recipe name is required" });
    }
    const user = await User.findById(req.user);
    const recipeIndex = user.recipes.findIndex(
      (recipe) => recipe.name === name
    );
    if (recipeIndex === -1) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    user.recipes.splice(recipeIndex, 1);

    await user.save();
    res.status(201).json({ msg: "Successfully deleted recipe" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting recipe" });
  }
});

module.exports = router;

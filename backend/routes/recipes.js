const express = require("express");
const router = express.Router();
const { User, FoodItem } = require("../models/User");
const auth = require("../middleware/auth");

router.post("/add", auth, async (req, res) => {
  const { name, ingredients, instructions, food_type } = req.body;

  try {
    if (!name || !ingredients || !instructions || !food_type) {
      return res.status(400).json({
        msg: "Name, ingredients, instructions, food type are required",
      });
    }
    if (
      food_type !== "lunch" &&
      food_type !== "dinner" &&
      food_type !== "breakfast" &&
      food_type !== "snack"
    ) {
      return res.status(400).json({
        msg: "Food_type must be 'breakfast', 'lunch', 'dinner', or 'snack'",
      });
    }

    const user = await User.findById(req.user);

    if (user.recipes.some((recipe) => recipe.name === name)) {
      return res.status(400).json({ msg: "Recipe already exists" });
    }

    const foods = await FoodItem.find({
      Food: { $in: ingredients.map((ingredient) => ingredient.foodname) },
    });

    if (!foods || foods.length === 0) {
      return res.status(404).json({ error: "No food items found" });
    }

    let totalNutrients = {
      calories: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
    };

    foods.forEach((food) => {
      const ingredient = ingredients.find((ing) => ing.foodname === food.Food);

      const factor = ingredient.quantity / food.Grams;
      totalNutrients.calories += food.Calories * factor;
      totalNutrients.protein += food.Protein * factor;
      totalNutrients.fat += food.Fat * factor;
      totalNutrients.carbs += food.Carbs * factor;
    });
    totalNutrients.calories = Math.round(totalNutrients.calories);
    totalNutrients.protein = Math.round(totalNutrients.protein);
    totalNutrients.fat = Math.round(totalNutrients.fat);
    totalNutrients.carbs = Math.round(totalNutrients.carbs);

    const newRecipe = {
      name,
      ingredients,
      instructions,
      food_type,
      nutrients: totalNutrients,
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
  const { name, day } = req.body;
  const daylist = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  try {
    if (!name || !day) {
      return res.status(400).json({ msg: "Recipe name and day is required" });
    }
    if (!daylist.includes(day)) {
      return res.status(400).json({
        msg: "day must be 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' or 'Sunday'",
      });
    }
    const user = await User.findById(req.user);
    const recipe = user.recipes.find((recipe) => recipe.name === name);

    if (!recipe) {
      return res
        .status(404)
        .json({ msg: "Recipe not found in user's recipes" });
    }

    const mealType = recipe.food_type;
    const recipeID = recipe._id;

    let dayEntry = user.weeklyrecipes.find((entry) => entry.day === day);

    if (!dayEntry) {
      dayEntry = {
        day: day,
        meals: {
          breakfast: [],
          lunch: [],
          dinner: [],
          snack: [],
        },
      };
      dayEntry.meals[mealType].push(recipeID);
      user.weeklyrecipes.push(dayEntry);
    } else {
      if (!dayEntry.meals[mealType].includes(recipeID)) {
        dayEntry.meals[mealType].push(recipeID);
      } else {
        return res.status(400).json({
          msg: "Recipe already added for this meal type on this day.",
        });
      }
    }

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

    const populatedWeeklyRecipes = [];

    user.weeklyrecipes.forEach((dayEntry) => {
      for (const mealType in dayEntry.meals) {
        if (dayEntry.meals.hasOwnProperty(mealType)) {
          dayEntry.meals[mealType].forEach((recipeId) => {
            const recipe = user.recipes.find(
              (r) => r._id.toString() === recipeId.toString()
            );

            if (recipe) {
              populatedWeeklyRecipes.push({
                day: dayEntry.day,
                recipe: recipe,
              });
            }
          });
        }
      }
    });

    res.json(populatedWeeklyRecipes);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving weekly recipes" });
  }
});

router.put("/update-recipe", auth, async (req, res) => {
  try {
    const { name, newname, ingredients, instructions, food_type } = req.body;

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
    if (
      food_type !== "lunch" &&
      food_type !== "dinner" &&
      food_type !== "breakfast" &&
      food_type !== "snack"
    ) {
      return res.status(400).json({
        msg: "Food_type must be 'breakfast', 'lunch', 'dinner', or 'snack'",
      });
    }

    if (newname) recipe.name = newname;
    if (ingredients) recipe.ingredients = ingredients;
    if (instructions) recipe.instructions = instructions;
    if (food_type) recipe.food_type = food_type;

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

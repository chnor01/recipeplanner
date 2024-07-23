const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


//connect to mongodb
const url = 'mongodb://localhost:27017/fooddb';
mongoose.connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

//schema for food recipes
const Schema = mongoose.Schema;

const foodrecipes = new Schema({
  food: String,
  ingredients: [String]
});


const food = mongoose.model('food', foodrecipes);


//post new recipe
app.post('/recipes', async (req, res) => {
  const { foodname, ingredients } = req.body;
  if (!foodname || !Array.isArray(ingredients)) {
    return res.status(400).json({ error: 'Invalid foodname or array format' });
  }

  const newfoodrecipe = new food({
    food: foodname,
    ingredients: ingredients
  });

  try {
    const savedfood = await newfoodrecipe.save();
    res.status(201).json({ message: 'New food saved', food: savedfood });
  } catch (error) {
    res.status(500).json({ error: 'Error saving food' });
  }
});


//update existing food recipe
app.put('/recipes/:foodName', async (req, res) => {
  const foodName = req.params.foodName;
  const { ingredients } = req.body;

  if (!Array.isArray(ingredients)) {
    return res.status(400).json({ error: 'Invalid array format' });
  }

  try {
    const updatedFood = await food.findOneAndUpdate(
      { food: foodName },
      { $set: { ingredients: ingredients } },
      { returnNewDocument: true }
    );

    if (updatedFood) {
      res.json({ message: 'Recipe updated successfully', food: updatedFood });
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating recipe' });
  }
});


//get all recipes
app.get('/recipes', async (req, res) => {
  try {
    const allrecipes = await food.find({}, { food: 1, ingredients: 1, _id: 0 });
    res.json(allrecipes);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving food recipes' });
  }
});

//delete one recipe
app.delete('/recipes', async (req, res) => {
  try {
    const foodName = req.query.food;
    if (!foodName) {
      return res.status(400).json({ error: 'Food name is required' });
    }

    const result = await food.deleteOne({ food: foodName });
    if (result.deletedCount > 0) {
      res.json({ message: 'Recipe deleted successfully', result });
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting recipe' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

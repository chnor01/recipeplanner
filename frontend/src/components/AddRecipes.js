import React, { useState } from "react";

const AddRecipe = () => {
  const [foodname, setFoodname] = useState("");
  const [ingredients, setIngredients] = useState("");

  const handleSubmit = async () => {
    try {
      const ingredientsArray = ingredients
        .split(",")
        .map((ingredient) => ingredient.trim());

      const response = await fetch("http://localhost:3000/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foodname, ingredients: ingredientsArray }),
      });
      if (response.ok) {
        console.log("Recipe added!");
      } else {
        console.error("Error adding recipe: ", await response.text());
      }
    } catch (error) {
      console.error("Error adding recipe: ", error);
    }
  };

  return (
    <div>
      <h2>Add Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Recipe name:
          <input
            type="text"
            value={foodname}
            onChange={(e) => setFoodname(e.target.value)}
            required
          />
        </label>
        <label>
          Ingredients (comma-separated):
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;

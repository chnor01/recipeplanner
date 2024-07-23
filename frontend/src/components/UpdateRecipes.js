import React, { useState } from "react";

const UpdateRecipes = () => {
  const [foodname, setFoodname] = useState("");
  const [ingredients, setIngredients] = useState("");

  const handleSubmit = async () => {
    try {
      const ingredientsArray = ingredients
        .split(",")
        .map((ingredient) => ingredient.trim());

      const response = await fetch(
        "http://localhost:3000/recipes/" + encodeURIComponent(foodname),
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ingredients: ingredientsArray }),
        }
      );
      if (response.ok) {
        console.log("Recipe updated!");
      } else {
        console.error("Error updating recipe: ", await response.text());
      }
    } catch (error) {
      console.error("Error updating recipe: ", error);
    }
  };

  return (
    <div>
      <h2>Update Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Food Name to Update:
          <input
            type="text"
            value={foodname}
            onChange={(e) => setFoodname(e.target.value)}
            required
          />
        </label>
        <label>
          New Ingredients (comma-separated):
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </label>
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
};

export default UpdateRecipes;

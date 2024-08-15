import React, { useState } from "react";
import ViewRecipes from "./ViewRecipes";

const UpdateRecipes = () => {
  const [foodname, setFoodname] = useState("");
  const [newname, setNewname] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [food_type, setFoodtype] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ingredientsArray = ingredients
        .split(",")
        .map((ingredient) => ingredient.trim());

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, please log in.");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/recipes/update-recipe",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            name: foodname,
            newname,
            ingredients: ingredientsArray,
            instructions,
            food_type,
          }),
        }
      );
      if (response.ok) {
        console.log("Recipe updated!");
        alert("Recipe updated!");
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error("Error updating recipe: ", errorData);
        alert("Failed to update recipe");
      }
    } catch (error) {
      console.error("Error updating recipe: ", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <header>
          <h1>Update a recipe</h1>
        </header>
        <label>
          Recipe name to update:
          <input
            type="text"
            value={foodname}
            onChange={(e) => setFoodname(e.target.value)}
          />
        </label>
        <label>
          New name for recipe:
          <input
            type="text"
            value={newname}
            onChange={(e) => setNewname(e.target.value)}
          />
        </label>
        <label>
          New Ingredients (comma-separated):
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </label>
        <label>
          New instructions:
          <input
            type="text"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </label>
        <label>
          Food type(breakfast, lunch, dinner, snack):
          <input
            type="text"
            value={food_type}
            onChange={(e) => setFoodtype(e.target.value)}
          />
        </label>
        <button type="submit">Update Recipe</button>
      </form>
      <ViewRecipes></ViewRecipes>
    </div>
  );
};

export default UpdateRecipes;

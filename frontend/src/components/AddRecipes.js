import React, { useState } from "react";

const AddRecipe = () => {
  const [recipe, setFoodname] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ingredientsArray = ingredients
        .split(",")
        .map((ingredient) => ingredient.trim());

      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found, please log in.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/recipes/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          name: recipe,
          ingredients: ingredientsArray,
          instructions,
        }),
      });
      if (response.ok) {
        console.log("Recipe added!");
      } else {
        const errorData = await response.json();
        console.error("Error adding recipe: ", errorData);
      }
    } catch (error) {
      console.error("Error adding recipe: ", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <header>
          <h1>Add a new recipe to your collection</h1>
        </header>

        <label>Recipe Name:</label>
        <input
          type="text"
          value={recipe}
          onChange={(e) => setFoodname(e.target.value)}
        />
      </div>
      <div>
        <label>Ingredients (comma separated):</label>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
      </div>
      <div>
        <label>Instructions:</label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        ></textarea>
      </div>
      <button type="submit">Add Recipe</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default AddRecipe;

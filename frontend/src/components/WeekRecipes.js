import React, { useState } from "react";

const WeekRecipes = () => {
  const [recipe, setRecipe] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found, please log in.");
        return;
      }
      const response = await fetch(
        "http://localhost:5000/api/recipes/add-weekly",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            name: recipe,
          }),
        }
      );
      if (response.ok) {
        console.log("Recipe added!");
      } else {
        const errorData = await response.json();
        console.error("Error adding recipe: ", errorData);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <header>
          <h1>Add a recipe to your weekly schedule</h1>
        </header>
        <label>
          Recipe name:
          <input
            type="text"
            value={recipe}
            onChange={(e) => setRecipe(e.target.value)}
          />
        </label>
        <button type="submit">Add to weekly recipes</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default WeekRecipes;

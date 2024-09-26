import React, { useState } from "react";
import ViewRecipes from "./ViewRecipes";

const WeekRecipes = () => {
  const [recipe, setRecipe] = useState("");
  const [day, setDay] = useState("");
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
            day: day,
          }),
        }
      );
      if (response.ok) {
        console.log("Recipe added!");
        alert("Added recipe to weekly recipes!");
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error("Error adding recipe: ", errorData);
        alert("Failed to add to weekly recipes!");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <header>
          <h1>Add recipe to your daily meal plan</h1>
        </header>
        <label>
          Recipe name:
          <input
            type="text"
            value={recipe}
            onChange={(e) => setRecipe(e.target.value)}
          />
        </label>
        <label>
          Day:
          <input
            type="text"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </label>
        <button type="submit">Add to weekly recipes</button>
      </form>
      <ViewRecipes></ViewRecipes>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default WeekRecipes;

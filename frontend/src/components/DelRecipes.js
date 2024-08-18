import React, { useState } from "react";
import ViewRecipes from "./ViewRecipes";

const DeleteRecipe = () => {
  const [foodname, setFoodname] = useState("");
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
        "http://localhost:5000/api/recipes/delete-recipe",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            name: foodname,
            day,
          }),
        }
      );

      if (response.ok) {
        console.log("Recipe deleted");
        alert("Deleted recipe!");
        window.location.reload();
      } else {
        const data = await response.json();
        console.error("Error deleting recipe:", data);
        alert("Failed to delete recipe!");
      }
    } catch (error) {
      console.error("Error deleting recipe: ", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <header>
          <h1>Delete recipe</h1>
        </header>
        <label>
          Recipe name:
          <input
            type="text"
            value={foodname}
            onChange={(e) => setFoodname(e.target.value)}
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
        <button type="submit">Delete recipe</button>
      </form>
      <ViewRecipes></ViewRecipes>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default DeleteRecipe;

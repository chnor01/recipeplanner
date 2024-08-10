import React, { useState } from "react";
import ViewRecipes from "./ViewRecipes";

const DeleteRecipe = () => {
  const [foodname, setFoodname] = useState("");
  const [error, setError] = useState("");
  const [showrec, setShowrec] = useState(false);

  const recipeClick = () => {
    setShowrec(!showrec);
  };

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
          }),
        }
      );

      if (response.ok) {
        console.log("Recipe deleted");
        alert("Deleted recipe!")
        window.location.reload();
      } else {
        const data = await response.json();
        console.error("Error deleting recipe:", data);
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
        <button type="submit" onClick={setShowrec}>Delete recipe</button>
        <button onClick={recipeClick}>
          {showrec ? "Hide recipes" : "Show recipes"}
        </button>
      </form>
      {showrec && <ViewRecipes />};
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default DeleteRecipe;

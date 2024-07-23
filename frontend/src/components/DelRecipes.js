import React, { useState } from "react";

const DeleteRecipe = () => {
  const [foodname, setFoodname] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/recipes?food=" + encodeURIComponent(foodname),
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Recipe deleted");
      } else {
        console.error("Error deleting recipe:", data);
      }
    } catch (error) {
      console.error("Error deleting recipe: ", error);
    }
  };

  return (
    <div>
      <h2>Delete recipe</h2>
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
        <button type="submit">Delete recipe</button>
      </form>
    </div>
  );
};

export default DeleteRecipe;

import React, { useState } from "react";

const DeleteRecipe = () => {
  const [foodname, setFoodname] = useState("");
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
          }),
        }
      );

      if (response.ok) {
        console.log("Recipe deleted");
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
      <h2>Delete recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Recipe name:
          <input
            type="text"
            value={foodname}
            onChange={(e) => setFoodname(e.target.value)}
          />
        </label>
        <button type="submit">Delete recipe</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default DeleteRecipe;

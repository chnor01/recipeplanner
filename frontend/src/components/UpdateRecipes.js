import React, { useState } from "react";
import ViewRecipes from "./ViewRecipes";

const UpdateRecipes = () => {
  const [foodname, setFoodname] = useState("");
  const [newname, setNewname] = useState("");
  const [ingredients, setIngredients] = useState([
    { foodname: "", quantity: "" },
  ]);
  const [instructions, setInstructions] = useState("");
  const [food_type, setFoodtype] = useState("breakfast");
  const [error, setError] = useState("");

  const handleIngredientChange = (index, event) => {
    const values = [...ingredients];
    values[index][event.target.name] = event.target.value;
    setIngredients(values);
    console.log(ingredients, index);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { foodname: "", quantity: "" }]);
    console.log(ingredients);
  };

  const handleRemoveIngredient = (index) => {
    const values = [...ingredients];
    values.splice(index, 1);
    setIngredients(values);
    console.log(ingredients, index);
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
            ingredients,
            instructions,
            food_type,
          }),
        }
      );
      if (response.ok) {
        console.log("Recipe updated!");
        alert("Recipe updated!");
        setFoodname("");
        setIngredients([{ name: "", quantity: "" }]);
        setInstructions("");
        setFoodtype("breakfast");
        setError(null);
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
        <div>
          <label>Recipe name to update:</label>
          <input
            type="text"
            value={foodname}
            onChange={(e) => setFoodname(e.target.value)}
          />
        </div>
        <div>
          <label>New name for recipe:</label>
          <input
            type="text"
            value={newname}
            onChange={(e) => setNewname(e.target.value)}
          />
        </div>
        <div>
          <label>Food Type:</label>
          <select
            value={food_type}
            onChange={(e) => setFoodtype(e.target.value)}
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
        </div>

        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <label>Ingredient:</label>
            <input
              type="text"
              name="foodname"
              value={ingredient.foodname || ""}
              onChange={(e) => handleIngredientChange(index, e)}
              required
            />
            <label>Quantity (grams):</label>
            <input
              type="number"
              name="quantity"
              value={ingredient.quantity || ""}
              onChange={(e) => handleIngredientChange(index, e)}
              required
            />
            <button type="button" onClick={() => handleRemoveIngredient(index)}>
              Remove Ingredient
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddIngredient}>
          Add Another Ingredient
        </button>

        <div>
          <label>Instructions:</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit">Add Recipe</button>
      </form>
      <ViewRecipes></ViewRecipes>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UpdateRecipes;

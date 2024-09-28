import React, { useState, useEffect } from "react";
import ViewRecipes from "./ViewRecipes";

const UpdateRecipes = () => {
  const [recipe, setFoodname] = useState("");
  const [newname, setNewname] = useState("");
  const [instructions, setInstructions] = useState("");
  const [food_type, setFoodtype] = useState("breakfast");

  const [ingredients, setIngredients] = useState([
    { foodname: "", quantity: "" },
  ]);
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeInputIndex, setActiveInputIndex] = useState(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, please log in.");
          return;
        }
        const response = await fetch(
          "http://localhost:5000/api/recipes/ingredients",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const data = await response.json();
        setAvailableIngredients(data);
      } catch (error) {
        console.error("Error fetching ingredients", error);
      }
    };
    fetchIngredients();
  }, []);

  const handleIngredientChange = (index, event) => {
    const values = [...ingredients];
    values[index][event.target.name] = event.target.value;
    setIngredients(values);

    if (event.target.name === "foodname") {
      const suggestions = availableIngredients
        .filter((ingredient) =>
          ingredient.Food.toLowerCase().includes(
            event.target.value.toLowerCase()
          )
        )
        .slice(0, 5);
      setFilteredSuggestions(suggestions);
      setActiveInputIndex(index);
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (index, suggestion) => {
    const values = [...ingredients];
    values[index].foodname = suggestion.Food;
    setIngredients(values);
    setShowSuggestions(false);
    setActiveInputIndex(null);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { foodname: "", quantity: "" }]);
  };

  const handleRemoveIngredient = (index) => {
    const values = [...ingredients];
    values.splice(index, 1);
    setIngredients(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
            name: recipe,
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
      <header>
        <h1>Update a recipe</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Recipe name:</label>
          <input
            type="text"
            value={recipe}
            onChange={(e) => setFoodname(e.target.value)}
            required
          />
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
          <div>
            {ingredients.map((ingredient, index) => (
              <div key={index}>
                <label>Ingredient:</label>
                <input
                  type="text"
                  name="foodname"
                  value={ingredient.foodname || ""}
                  onChange={(e) => handleIngredientChange(index, e)}
                  autoComplete="off"
                  
                />
                {showSuggestions &&
                  activeInputIndex === index &&
                  filteredSuggestions.length > 0 && (
                    <ul className="suggestions-list">
                      {filteredSuggestions.map(
                        (suggestion, suggestionIndex) => (
                          <li
                            key={suggestionIndex}
                            onClick={() =>
                              handleSuggestionClick(index, suggestion)
                            }
                          >
                            {suggestion.Food}
                          </li>
                        )
                      )}
                    </ul>
                  )}

                <label>Quantity (grams):</label>
                <input
                  type="number"
                  name="quantity"
                  value={ingredient.quantity || ""}
                  onChange={(e) => handleIngredientChange(index, e)}
                  
                />
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                >
                  Remove Ingredient
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddIngredient}>
              Add Ingredient
            </button>
          </div>
        </div>

        <div>
          <label>Instructions:</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            
          ></textarea>
        </div>

        <button type="submit">Update Recipe</button>
      </form>
      <ViewRecipes></ViewRecipes>
    </div>
  );
};

export default UpdateRecipes;

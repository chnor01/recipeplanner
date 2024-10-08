import React, { useState, useEffect } from "react";

const AddRecipe = () => {
  const [recipe, setFoodname] = useState("");
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
    console.log(event.target.name);
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

      const response = await fetch("http://localhost:5000/api/recipes/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          name: recipe,
          ingredients,
          instructions,
          food_type,
        }),
      });
      if (response.ok) {
        console.log("Recipe added!");
        alert("Recipe added!");
        setFoodname("");
        setIngredients([{ foodname: "", quantity: "" }]);
        setInstructions("");
        setFoodtype("breakfast");
      } else {
        const errorData = await response.json();
        console.error("Error adding recipe: ", errorData);
        alert("Error: " + errorData.msg);
      }
    } catch (error) {
      console.error("Error adding recipe: ", error);
    }
  };
  return (
    <div>
      <header>
        <h1>Add a New Recipe</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Recipe Name:</label>
          <input
            type="text"
            value={recipe}
            onChange={(e) => setFoodname(e.target.value)}
            required
          />

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
                  required
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
                  required
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
            required
          ></textarea>
        </div>

        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;

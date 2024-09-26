import React, { useEffect, useState } from "react";

const ViewRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, please log in.");
          return;
        }
        const response = await fetch(
          "http://localhost:5000/api/recipes/view-recipes",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const data = await response.json();
        setRecipes(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <header>
        <h1>Current recipes </h1>
      </header>

      <ol>
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <li key={index}>
              {recipe.food_type}, <strong>{recipe.name}</strong>:{" "}
              <p>
                <strong>Ingredients:</strong>
              </p>
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index}>
                  {ingredient.foodname}
                  {index < recipe.ingredients.length - 1 ? ", " : ""}
                </div>
              ))}
              <p>
                <strong>Instructions:</strong>
              </p>
              {recipe.instructions}
              <div>
                <p>
                  <strong>Nutrients: </strong>
                </p>
                Calories: {recipe.nutrients.calories} cal, Protein:{" "}
                {recipe.nutrients.protein}g, Fat: {recipe.nutrients.fat}g,
                Carbohydrates: {recipe.nutrients.carbs}g
              </div>
            </li>
          ))
        ) : (
          <li>No recipes found</li>
        )}
      </ol>
    </div>
  );
};

export default ViewRecipes;

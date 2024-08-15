import React, { useEffect, useState } from "react";

const ViewWeekly = () => {
  const [weeklyrecipes, setWeeklyrecipes] = useState([]);
  const daysOfWeekOrder = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const sortedWeeklyRecipes = [...weeklyrecipes].sort((a, b) => {
    const dayA = a.day;
    const dayB = b.day;
    return daysOfWeekOrder.indexOf(dayA) - daysOfWeekOrder.indexOf(dayB);
  });

  useEffect(() => {
    const fetchWeeklyrecipes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, please log in.");
          return;
        }
        const response = await fetch(
          "http://localhost:5000/api/recipes/view-weekly",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        if (Array.isArray(data)) {
          setWeeklyrecipes(data.filter((item) => item !== null));
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchWeeklyrecipes();
  }, []);

  return (
    <div>
      <header>
        <h1>Weekly recipes</h1>
      </header>
      <ol>
        {sortedWeeklyRecipes.length > 0 ? (
          sortedWeeklyRecipes.map((recipe, index) => (
            <li key={index}>
              <strong>
                {recipe.day}: {recipe.recipe.food_type} {recipe.recipe.name}
              </strong>
              : {recipe.recipe.ingredients.join(", ")}{" "}
              <strong>{recipe.recipe.instructions}</strong>
            </li>
          ))
        ) : (
          <li>No recipes found</li>
        )}
      </ol>
    </div>
  );
};

export default ViewWeekly;

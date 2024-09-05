import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";

const ViewWeekly = () => {
  const [weeklyrecipes, setWeeklyrecipes] = useState([]);
  const daysOrder = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [weekcalories, setWeekcalories] = useState([]);
  const [weekfat, setWeekfat] = useState([]);
  const [weekprotein, setWeekprotein] = useState([]);
  const [weekcarbs, setWeekcarbs] = useState([]);

  const sortedWeeklyRecipes = weeklyrecipes.sort((a, b) => {
    return daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day);
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

        if (Array.isArray(data)) {
          setWeeklyrecipes(data.filter((item) => item !== null));

          const calories = [];
          const fat = [];
          const protein = [];
          const carbs = [];

          data.forEach((dayEntry) => {
            calories.push(dayEntry.dailynutrients.dailycalories);
            fat.push(dayEntry.dailynutrients.dailyfat);
            protein.push(dayEntry.dailynutrients.dailyprotein);
            carbs.push(dayEntry.dailynutrients.dailycarbs);
          });
          setWeekcalories(calories);
          setWeekfat(fat);
          setWeekprotein(protein);
          setWeekcarbs(carbs);
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
        <h1>Meal plan for the week</h1>
      </header>
      <br></br>
      {weeklyrecipes.length > 0 ? (
        sortedWeeklyRecipes.map((dayEntry) => (
          <div key={dayEntry.day}>
            <header>
              <h1>{dayEntry.day}</h1>
            </header>
            <div className="divDailyNutrients">
              <strong>
                <h2>Daily Nutrients:</h2>
              </strong>
              <p>
                <br />
                Calories: {dayEntry.dailynutrients.dailycalories}cal
                <br />
                Protein: {dayEntry.dailynutrients.dailyprotein}g
                <br />
                Fat: {dayEntry.dailynutrients.dailyfat}g
                <br />
                Carbs: {dayEntry.dailynutrients.dailycarbs}g
              </p>
            </div>

            <div>
              {Object.keys(dayEntry.meals).map((mealType) => (
                <div key={mealType}>
                  <h2>
                    {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                  </h2>
                  {dayEntry.meals[mealType].length > 0 ? (
                    <ul>
                      {dayEntry.meals[mealType].map((recipe, index) => (
                        <li key={index}>
                          Recipe: {recipe.name}
                          <br></br>
                          <strong>Ingredients:</strong>
                          {recipe.ingredients.map((ingredient, index) => (
                            <div key={index}>
                              {ingredient.foodname}
                              {index < recipe.ingredients.length - 1
                                ? ", "
                                : ""}
                            </div>
                          ))}
                          <strong>Instructions: </strong> <br></br>
                          {recipe.instructions}
                          <p>
                            <strong> Nutrients:</strong> <br></br>
                            Calories: {recipe.nutrients.calories}cal <br></br>
                            Protein: {recipe.nutrients.protein}g <br></br> Fat:{" "}
                            {recipe.nutrients.fat}g <br></br>
                            Carbs: {recipe.nutrients.carbs}g
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No recipes found</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No recipes found</p>
      )}
      <div className="chart-container">
        <div className="chart-item">
          <BarChart
            nutrition={weekcalories}
            titletext="Weekly Calories"
            labeltext="Calories"
            bgcolor="rgba(28, 73, 94, 0.7)"
          />
        </div>
        <div className="chart-item">
          <BarChart
            nutrition={weekfat}
            titletext="Weekly Fat"
            labeltext="Fats"
            bgcolor="rgba(186, 60, 60, 0.7)"
          />
        </div>
        <div className="chart-item">
          <BarChart
            nutrition={weekcarbs}
            titletext="Weekly Carbs"
            labeltext="Carbs"
            bgcolor="rgba(71, 143, 83, 0.7)"
          />
        </div>
        <div className="chart-item">
          <BarChart
            nutrition={weekprotein}
            titletext="Weekly Protein"
            labeltext="Protein"
            bgcolor="rgba(81, 164, 168, 0.7)"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewWeekly;

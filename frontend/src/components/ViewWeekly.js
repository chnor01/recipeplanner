import React, { useEffect, useState } from "react";

const ViewWeekly = () => {
  const [weeklyrecipes, setWeeklyrecipes] = useState([]);

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
        {weeklyrecipes.length > 0 ? (
          weeklyrecipes.map((weeklyrecipes, index) => (
            <li key={index}>
              <strong>{weeklyrecipes.name}</strong>:{" "}
              {weeklyrecipes.ingredients.join(", ")}{" "}
              <strong>{weeklyrecipes.instructions}</strong>
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

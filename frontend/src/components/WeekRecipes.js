import React, { useEffect, useState } from 'react';

const WeekRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/recipes/add-weekly');
        const data = await response.json();
        const shuffledRecipes = data.sort(() => 0.5 - Math.random());
        const selectedRecipes = shuffledRecipes.slice(0, 7);
        setRecipes(selectedRecipes);
        console.log(data);
        console.log(selectedRecipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <ol>
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <li key={index}>
              <strong>{recipe.food}</strong>: {recipe.ingredients.join(', ')}
            </li>
          ))
        ) : (
          <li>No recipes found</li>
        )}
      </ol>
    </div>
  );
};

export default WeekRecipes;
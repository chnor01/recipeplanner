import React, { useEffect, useState } from 'react';

const ViewRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:3000/recipes');
        const data = await response.json();
        setRecipes(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <h2>Current recipes </h2>
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

export default ViewRecipes;

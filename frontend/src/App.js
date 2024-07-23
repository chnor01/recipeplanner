import React, { useState } from 'react';
import './App.css';  
import ViewRecipes from "./components/ViewRecipes";
import AddRecipes from "./components/AddRecipes";
import DeleteRecipe from "./components/DelRecipes";
import UpdateRecipes from "./components/UpdateRecipes";
import WeekRecipes from "./components/WeekRecipes";

function App() {
  const [showRecipes, setShowRecipes] = useState(false);
  const handleButtonClick = () => {
    setShowRecipes(!showRecipes);
  };

  const [showWeeklyRecipes, setWeeklyRecipes] = useState(false);
  const handleWeeklyButton = () => {
    setWeeklyRecipes(!showWeeklyRecipes);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Food recipes</h2>
        <button onClick={handleButtonClick}>
          {showRecipes ? "Hide all recipes" : "Show all recipes"}
        </button>
        {showRecipes && <ViewRecipes></ViewRecipes>}
        <AddRecipes></AddRecipes>
        <DeleteRecipe></DeleteRecipe>
        <UpdateRecipes></UpdateRecipes>
        <h2>Weekly recipes</h2>
        <button onClick={handleWeeklyButton}>
          {showWeeklyRecipes ? "Hide weekly recipes" : "Show weekly recipes"}
        </button>
        {showWeeklyRecipes && <WeekRecipes></WeekRecipes>}
      </header>
    </div>
  );
}

export default App;


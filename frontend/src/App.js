import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AddRecipe from "./components/AddRecipes";
import DeleteRecipe from "./components/DelRecipes";
import ViewRecipes from "./components/ViewRecipes";
import UpdateRecipes from "./components/UpdateRecipes";
import ViewWeekly from "./components/ViewWeekly";
import WeekRecipes from "./components/WeekRecipes";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import "./App.css";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav>
      {location.pathname === "/register" && (
        <Link to="/login">
          <button>Already have an account?</button>
        </Link>
      )}
      {location.pathname === "/login" && (
        <Link to="/register">
          <button>Create an account here!</button>
        </Link>
      )}
      {location.pathname === "/add" && (
        <Link to="/dashboard">
          <button>Back to dashboard</button>
        </Link>
      )}
      {location.pathname === "/view" && (
        <Link to="/dashboard">
          <button>Back to dashboard</button>
        </Link>
      )}
      {location.pathname === "/delete" && (
        <Link to="/dashboard">
          <button>Back to dashboard</button>
        </Link>
      )}
      {location.pathname === "/update" && (
        <Link to="/dashboard">
          <button>Back to dashboard</button>
        </Link>
      )}
      {location.pathname === "/view-weekly" && (
        <Link to="/dashboard">
          <button>Back to dashboard</button>
        </Link>
      )}
      {location.pathname === "/add-weekly" && (
        <Link to="/dashboard">
          <button>Back to dashboard</button>
        </Link>
      )}
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<AddRecipe />} />
          <Route path="/delete" element={<DeleteRecipe />} />
          <Route path="/view" element={<ViewRecipes />} />
          <Route path="/update" element={<UpdateRecipes />} />
          <Route path="/view-weekly" element={<ViewWeekly />} />
          <Route path="/add-weekly" element={<WeekRecipes />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

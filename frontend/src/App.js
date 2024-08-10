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
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav>
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
      {location.pathname === "/dashboard" && (
        <Link to="/">
          <button>Back home</button>
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
          <Route element={<PrivateRoute />}>
            <Route path="/add" element={<AddRecipe />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/view" element={<ViewRecipes />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/delete" element={<DeleteRecipe />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/update" element={<UpdateRecipes />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/view-weekly" element={<ViewWeekly />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/add-weekly" element={<WeekRecipes />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;

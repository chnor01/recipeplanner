import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Welcome to Recipe Planner</h1>
      </header>
      <section className="homepage-content">
        <p>
          Recipe Planner is an app for managing and organizing your
          favorite recipes. Add new recipes, view your weekly meal plan, and
          keep track of all your recipes in one place.
        </p>
        <div className="homepage-links">
          <Link to="/register">
            <button>Register</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Homepage;

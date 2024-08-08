import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome!</h1>
      </header>
      <section className="dashboard-content">
        <p>Here you can manage your recipes.</p>
        <div className="dashboard-links">
          <Link to="/add">
            <button>Add a recipe</button>
          </Link>
          <Link to="/view">
            <button>View all your recipes</button>
          </Link>
          <Link to="/delete">
            <button>Delete a recipe</button>
          </Link>
          <Link to="/update">
            <button>Update a recipe</button>
          </Link>
          <Link to="/view-weekly">
            <button>View your weekly recipes</button>
          </Link>
          <Link to="/add-weekly">
            <button>Add recipe to weekly schedule</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

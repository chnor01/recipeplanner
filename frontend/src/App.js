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
import './App.css';

const Navigation = () => {
  const location = useLocation(); 

  return (
    <nav>
      {location.pathname === "/register" && (
        <div>
          <Register /> 
          <Link to="/login">
            <button>Already have an account?</button>
          </Link>
        </div>
      )}
      {location.pathname === "/login" && (
        <div>
          <Login /> 
          <Link to="/register">
            <button>Create an account here!</button>
          </Link>
        </div>
      )}
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Navigation />} />
          <Route path="/register" element={<Navigation />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

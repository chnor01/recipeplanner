import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg);
      }

      const data = await response.json();
      console.log(data);
      alert("Successfully logged in!");
      localStorage.setItem("token", data.token);
      navigate("/dashboard");

      
    } catch (error) {
      console.error(error.message);
      if (error.message === "Invalid username/password") {
        alert("Invalid username/password");
      } else if (error.message === "Invalid password/username") {
        alert("Invalid password/username");
      } else {
        alert("An error occurred during login: " + error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
      <Link to="/register">
          <button>Create an account here!</button>
        </Link>
    </form>
  );
};

export default Login;

import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7265/api/Users/login",
        {
          login,
          password,
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setError("");
        navigate("/");
      } else {
        setError("Invalid login data");
      }
    } catch (error) {
      console.error(error);
      setError("Invalid login data");
    }
  };

  return (
    <Layout>
      <div className="login">
        <h2 className="title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label>Login:</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          {error && <p className="message message--error">{error}</p>}
        </form>
      </div>
    </Layout>
  );
};

export default Login;

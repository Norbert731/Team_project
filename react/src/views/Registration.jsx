import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

const Registration = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform client-side validation
    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }
    setMessage("");

    try {
      const response = await axios.post(
        "https://localhost:7265/api/Users/register",
        {
          userid: 11,
          login,
          password,
          active: true,
        }
      );

      // Handle the response from the server
      if (response.status === 200) {
        console.log("success");
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="login">
        <h2 className="title">Register</h2>
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
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {message && <p className="message message--error">{message}</p>}
          <button type="submit" className="btn">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Registration;

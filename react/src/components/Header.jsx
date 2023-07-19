import React from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header__container container">
        <ul className="header__list">
          {decodedToken ? (
            <li>
              <Link to="/">Employees</Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/registration">Sign up</Link>
              </li>
            </>
          )}
        </ul>
        {decodedToken && (
          <div className="account">
            <p>Hello {decodedToken.login}!</p>
            <button className="secondary-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

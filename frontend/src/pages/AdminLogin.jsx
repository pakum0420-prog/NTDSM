import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "./AdminLogin.css";
function AdminLogin() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const handleLogin = (e) => {

    e.preventDefault();

    if (
      username === "admin" &&
      password === "admin@123"
    ) {

      localStorage.clear();

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      localStorage.setItem(
        "role",
        "admin"
      );

      toast.success(
        "Admin Login Successful"
      );

      navigate(
        "/admin-dashboard"
      );

    } else {

      toast.error(
        "Invalid Admin Credentials"
      );

    }

  };

return (
  <div className="login-page">

    <div className="login-left">

      <h1>Digital Subscription Manager</h1>

      <h3>Secure Admin Portal</h3>

      <p>
        Manage subscriptions, payments,
        reports and analytics from one
        powerful dashboard.
      </p>

      <div className="feature">
        ✔ Secure Authentication
      </div>

      <div className="feature">
        ✔ Subscription Management
      </div>

      <div className="feature">
        ✔ Analytics & Reports
      </div>

    </div>

    <div className="login-card">

      <img
        src="/lo.webp"
        alt="Logo"
        className="login-logo"
      />

      <h2>Admin Login</h2>

      <p className="login-subtitle">
        Enter your credentials to continue
      </p>

      <form onSubmit={handleLogin}>

        <input
          type="text"
          placeholder="Username"
          className="form-control mb-3"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />

        <div className="password-box">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="form-control"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <span
            className="password-icon"
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword ? <FaEyeSlash/> : <FaEye/>}
          </span>

        </div>

        <button
          className="login-btn"
          type="submit"
        >
          Login to Dashboard
        </button>

      </form>

      <small className="version">
        Version 1.0 • © 2026
      </small>

    </div>

  </div>
);

}

export default AdminLogin;
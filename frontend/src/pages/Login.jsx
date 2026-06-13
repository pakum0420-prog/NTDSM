import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaEye,
  FaEyeSlash,
  FaNewspaper
} from "react-icons/fa";

import { toast } from "react-toastify";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState(
      localStorage.getItem(
        "rememberedUser"
      ) || ""
    );

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const users = [
    {
      username: "admin",
      password: "admin@123",
      role: "Administrator"
    },
    {
      username: "manager",
      password: "manager@123",
      role: "Manager"
    }
  ];

  const handleLogin = (e) => {

    e.preventDefault();

    const user =
      users.find(
        (u) =>
          u.username === username &&
          u.password === password
      );

    if (!user) {

      toast.error(
        "Invalid Username or Password"
      );

      return;
    }

    setLoading(true);

    if (rememberMe) {

      localStorage.setItem(
        "rememberedUser",
        username
      );

    }

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    localStorage.setItem(
      "userRole",
      user.role
    );

    setTimeout(() => {

      navigate("/");

    }, 1200);

  };

  return (

    <div
      style={{
        height: "100vh",
        display: "flex"
      }}
    >

      {/* LEFT PANEL */}

      <div
        style={{
          flex: 1,
          background:
            "linear-gradient(135deg,#0d6efd,#052c65)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px"
        }}
      >

        <img
          src="/lo.webp"
          alt="Namasthe Telangana"
          style={{
            width: "300px",
            background: "white",
            padding: "15px",
            borderRadius: "15px",
            marginBottom: "30px"
          }}
        />

        <h1>
          Digital Subscription Manager
        </h1>

        <p
          style={{
            fontSize: "18px",
            textAlign: "center",
            maxWidth: "500px"
          }}
        >
          Manage digital subscriptions,
          paywall access, revenue tracking,
          analytics and reports for
          Namasthe Telangana.
        </p>

      </div>

      {/* RIGHT PANEL */}

      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f8fafc"
        }}
      >

        <form
          onSubmit={handleLogin}
          style={{
            width: "420px",
            background: "white",
            padding: "40px",
            borderRadius: "20px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.12)"
          }}
        >

          <h2
            style={{
              textAlign: "center",
              marginBottom: "25px"
            }}
          >
            Login
          </h2>

          <input
            type="text"
            placeholder="Username"
            className="form-control mb-3"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
          />

          <div
            style={{
              position: "relative"
            }}
          >

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />

            <span
              style={{
                position: "absolute",
                right: "15px",
                top: "10px",
                cursor: "pointer"
              }}
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >

              {showPassword
                ? <FaEyeSlash />
                : <FaEye />}

            </span>

          </div>

          <div
            className="mt-3 mb-3"
          >

            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() =>
                setRememberMe(
                  !rememberMe
                )
              }
            />

            {" "}
            Remember Me

          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
            style={{
              height: "48px",
              fontWeight: "600"
            }}
          >

            {loading
              ? "Logging In..."
              : "Login"}

          </button>

          <p
            style={{
              textAlign: "center",
              marginTop: "25px",
              color: "#6c757d"
            }}
          >
            © 2026 Namasthe Telangana
          </p>

        </form>

      </div>

    </div>

  );

}

export default Login;
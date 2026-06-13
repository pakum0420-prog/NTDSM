import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

function UserLogin() {

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
      username === "user" &&
      password === "user@123"
    ) {

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      localStorage.setItem(
        "role",
        "user"
      );

      localStorage.setItem(
        "userPlan",
        "Premium"
      );

      toast.success(
        "User Login Successful"
      );

      navigate(
        "/user-dashboard"
      );

    } else {

      toast.error(
        "Invalid User Credentials"
      );

    }

  };

  return (

    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#198754,#0f5132)"
      }}
    >

      <form
        onSubmit={handleLogin}
        style={{
          width: "420px",
          background: "white",
          padding: "40px",
          borderRadius: "20px"
        }}
      >

        <img
          src="/lo.webp"
          alt="Logo"
          style={{
            width: "220px",
            display: "block",
            margin: "0 auto 20px"
          }}
        />

        <h2
          style={{
            textAlign: "center"
          }}
        >
          User Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="form-control mb-3"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
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
              setPassword(e.target.value)
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

        <button
          type="submit"
          className="btn btn-success w-100 mt-3"
        >
          Login
        </button>

      </form>

    </div>

  );

}

export default UserLogin;
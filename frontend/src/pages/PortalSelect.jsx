import { Link } from "react-router-dom";

function PortalSelect() {

  return (

    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#0d6efd,#052c65)"
      }}
    >

      <div
        style={{
          width: "500px",
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          textAlign: "center",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.2)"
        }}
      >

        <img
          src="/lo.webp"
          alt="Namasthe Telangana"
          style={{
            width: "250px",
            marginBottom: "20px"
          }}
        />

        <h2>
          Digital Subscription Manager
        </h2>

        <p
          style={{
            color: "#6c757d",
            marginBottom: "30px"
          }}
        >
          Select Your Portal
        </p>

        <Link
          to="/login-admin"
          className="btn btn-primary w-100 mb-3"
        >
          Admin Login
        </Link>

        <Link
          to="/login-user"
          className="btn btn-success w-100"
        >
          User Login
        </Link>

      </div>

    </div>

  );

}

export default PortalSelect;
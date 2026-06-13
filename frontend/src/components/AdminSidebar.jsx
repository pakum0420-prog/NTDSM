import { Link, useLocation } from "react-router-dom";

import {
  FaTachometerAlt,
  FaChartPie,
  FaFileAlt,
  FaUserCircle,
  FaCreditCard,
  FaMoneyBillWave,
  FaUser,
  FaLock
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar() {

  const location = useLocation();

  return (

    <div className="sidebar">

      <div className="sidebar-logo">

        <img
          src="/lo.webp"
          alt="Namasthe Telangana"
          className="company-logo"
        />

      </div>

      <nav>

        <h6
          style={{
            padding: "10px 20px",
            color: "#adb5bd",
            fontSize: "12px",
            letterSpacing: "1px"
          }}
        >
          ADMIN PANEL
        </h6>

        <Link
          to="/admin-dashboard"
          className={
            location.pathname === "/admin-dashboard"
              ? "active"
              : ""
          }
        >
          <FaTachometerAlt />
          Dashboard
        </Link>

        <Link
          to="/subscriptions"
          className={
            location.pathname === "/subscriptions"
              ? "active"
              : ""
          }
        >
          <FaCreditCard />
          Subscriptions
        </Link>

        <Link
          to="/payments"
          className={
            location.pathname === "/payments"
              ? "active"
              : ""
          }
        >
          <FaMoneyBillWave />
          Payments
        </Link>

        <Link
          to="/analytics"
          className={
            location.pathname === "/analytics"
              ? "active"
              : ""
          }
        >
          <FaChartPie />
          Analytics
        </Link>

        <Link
          to="/reports"
          className={
            location.pathname === "/reports"
              ? "active"
              : ""
          }
        >
          <FaFileAlt />
          Reports
        </Link>

        <hr
          style={{
            margin: "15px 10px",
            borderColor: "#495057"
          }}
        />

        

        
       
        

      </nav>

      <div className="sidebar-user">

        <FaUserCircle size={45} />

        <div>

          <strong>
            {localStorage.getItem("role") === "user"
              ? "User"
              : "Admin"}
          </strong>

          <p>
            {localStorage.getItem("role") === "user"
              ? "Subscriber"
              : "System Manager"}
          </p>

          <button
            className="btn btn-light btn-sm mt-2"
            onClick={() => {

              localStorage.removeItem("isLoggedIn");
              localStorage.removeItem("role");

              window.location.href = "/";

            }}
          >
            Logout
          </button>

        </div>

      </div>

    </div>

  );

}

export default Sidebar;
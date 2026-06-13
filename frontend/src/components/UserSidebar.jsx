import { Link, useLocation } from "react-router-dom";

import {
  FaUser,
  FaCreditCard,
  FaLock,
  FaUserCircle,
  FaHistory,
  FaArrowUp,
  FaBell,
  FaUserCog
} from "react-icons/fa";

function UserSidebar() {

  const location = useLocation();

  return (

    <div className="sidebar">

      <div className="sidebar-logo">

        <img
          src="/lo.webp"
          alt="Logo"
          className="company-logo"
        />

      </div>

      <nav>

        <Link
          to="/user-dashboard"
          className={
            location.pathname === "/user-dashboard"
              ? "active"
              : ""
          }
        >
          <FaUser />
          Dashboard
        </Link>

          <Link
  to="/profile"
  className={
    location.pathname === "/profile"
      ? "active"
      : ""
  }
>
  <FaUserCog />
  Profile
</Link>

        <Link
          to="/my-subscription"
          className={
            location.pathname === "/my-subscription"
              ? "active"
              : ""
          }
        >
          <FaCreditCard />
          My Subscription
        </Link>

        <Link
          to="/premium-content"
          className={
            location.pathname === "/premium-content"
              ? "active"
              : ""
          }
        >
          <FaLock />
          Premium Content
        </Link>

        <Link
          to="/payment-history"
          className={
            location.pathname === "/payment-history"
              ? "active"
              : ""
          }
        >
          <FaHistory />
          Payment History
        </Link>

        <Link
          to="/upgrade-plan"
          className={
            location.pathname === "/upgrade-plan"
              ? "active"
              : ""
          }
        >
          <FaArrowUp />
          Upgrade Plan
        </Link>

        <Link
          to="/notifications"
          className={
            location.pathname === "/notifications"
              ? "active"
              : ""
          }
        >
          <FaBell />
          Notifications
        </Link>

      </nav>

      <div className="sidebar-user">

        <FaUserCircle size={45} />

        <div>

          <strong>User</strong>

          <p>Subscriber</p>

          <button
            className="btn btn-light btn-sm mt-2"
            onClick={() => {

              localStorage.clear();

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

export default UserSidebar;
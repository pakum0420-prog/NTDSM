import {
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaRupeeSign,
  FaExclamationTriangle
} from "react-icons/fa";

import "./DashboardCards.css";

function DashboardCards({ stats }) {

  return (

    <div className="dashboard-grid">

      <div className="modern-card">

        <div className="card-icon">
          <FaUsers />
        </div>

        <div>

          <h6>Total Subscribers</h6>

          <h2>{stats.total}</h2>

        </div>

      </div>

      <div className="modern-card">

        <div className="card-icon success">
          <FaCheckCircle />
        </div>

        <div>

          <h6>Active Subscribers</h6>

          <h2>{stats.active}</h2>

        </div>

      </div>

      <div className="modern-card">

        <div className="card-icon danger">
          <FaTimesCircle />
        </div>

        <div>

          <h6>Expired Subscribers</h6>

          <h2>{stats.expired}</h2>

        </div>

      </div>

      <div className="modern-card">

        <div className="card-icon warning">
          <FaClock />
        </div>

        <div>

          <h6>Trial Subscribers</h6>

          <h2>{stats.trial}</h2>

        </div>

      </div>

      <div className="modern-card">

        <div className="card-icon revenue">
          <FaRupeeSign />
        </div>

        <div>

          <h6>Total Revenue</h6>

          <h2>
            ₹{stats.total_revenue || 0}
          </h2>

        </div>

      </div>

      <div className="modern-card">

        <div className="card-icon pending">
          <FaExclamationTriangle />
        </div>

        <div>

          <h6>Pending Payments</h6>

          <h2>
            {stats.pending_payments || 0}
          </h2>

        </div>

      </div>

    </div>

  );

}

export default DashboardCards;
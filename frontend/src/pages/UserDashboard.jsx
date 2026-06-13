import Footer from "../components/Footer";

function UserDashboard() {
  return (
    <div>
      <h1 className="mb-4">
        Welcome User 👋
      </h1>

      {/* Summary Cards */}

      <div className="row g-4 mb-4">

        <div className="col-md-3">
          <div className="card text-white bg-primary shadow">
            <div className="card-body">
              <h6>Current Plan</h6>
              <h2>Premium</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-success shadow">
            <div className="card-body">
              <h6>Subscription Status</h6>
              <h2>Active</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-info shadow">
            <div className="card-body">
              <h6>Payment Status</h6>
              <h2>Paid</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-warning shadow">
            <div className="card-body">
              <h6>Days Remaining</h6>
              <h2>25</h2>
            </div>
          </div>
        </div>

      </div>

      {/* Subscription Overview */}

      <div className="card shadow mb-4">
        <div className="card-header bg-dark text-white">
          Subscription Overview
        </div>

        <div className="card-body">

          <div className="row">

            <div className="col-md-6">
              <p>
                <strong>Plan:</strong> Premium
              </p>

              <p>
                <strong>Access Level:</strong> Premium
              </p>

              <p>
                <strong>Access Type:</strong> Yearly
              </p>
            </div>

            <div className="col-md-6">
              <p>
                <strong>Renewal Date:</strong> 2026-12-31
              </p>

              <p>
                <strong>Monthly Cost:</strong> ₹499
              </p>

              <p>
                <strong>Payment Status:</strong> Paid
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Recent Activity */}

      <div className="card shadow mb-4">

        <div className="card-header bg-primary text-white">
          Recent Activity
        </div>

        <div className="card-body">

          <ul className="list-group">

            <li className="list-group-item">
              Subscription Activated
            </li>

            <li className="list-group-item">
              Premium Content Access Granted
            </li>

            <li className="list-group-item">
              Last Payment Successful
            </li>

          </ul>

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default UserDashboard;
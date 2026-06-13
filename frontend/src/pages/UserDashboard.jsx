import Footer from "../components/Footer";

function UserDashboard() {

  return (

    <div>

      <h1>Welcome User 👋</h1>

      <div className="row mt-4">

        <div className="col-md-3">
          <div className="card p-3">
            <h6>Current Plan</h6>
            <h3>Premium</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h6>Status</h6>
            <h3>Active</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h6>Payment</h6>
            <h3>Paid</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h6>Days Remaining</h6>
            <h3>25</h3>
          </div>
        </div>

      </div>

      <Footer />

    </div>

  );

}

export default UserDashboard;
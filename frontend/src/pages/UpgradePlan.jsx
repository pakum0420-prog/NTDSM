import Footer from "../components/Footer";

function UpgradePlan() {

  return (

    <div>

      <h1 className="mb-4">
        Upgrade Subscription
      </h1>

      <div className="row">

        <div className="col-md-4">

          <div className="card shadow p-3">

            <h3>Basic</h3>

            <h4>₹299/month</h4>

            <ul>

              <li>10 Articles / Day</li>

              <li>Basic Reports</li>

              <li>Email Support</li>

            </ul>

            <button className="btn btn-primary">
              Current Plan
            </button>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card shadow p-3">

            <h3>Premium</h3>

            <h4>₹999/year</h4>

            <ul>

              <li>Unlimited Articles</li>

              <li>Research Reports</li>

              <li>Analytics Access</li>

            </ul>

            <button
              className="btn btn-success"
              onClick={() => {

                localStorage.setItem(
                  "userPlan",
                  "Premium"
                );

                alert(
                  "Upgraded to Premium"
                );

              }}
            >
              Upgrade
            </button>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card shadow p-3">

            <h3>Enterprise</h3>

            <h4>₹4999/year</h4>

            <ul>

              <li>Everything in Premium</li>

              <li>Enterprise Reports</li>

              <li>Priority Support</li>

            </ul>

            <button
              className="btn btn-dark"
              onClick={() => {

                localStorage.setItem(
                  "userPlan",
                  "Enterprise"
                );

                alert(
                  "Upgraded to Enterprise"
                );

              }}
            >
              Upgrade
            </button>

          </div>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default UpgradePlan;
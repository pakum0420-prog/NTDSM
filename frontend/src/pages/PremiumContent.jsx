import Footer from "../components/Footer";

function PremiumContent() {

  const userPlan =
    localStorage.getItem("userPlan")
    || "Basic";

  if (
    userPlan !== "Premium" &&
    userPlan !== "Enterprise"
  ) {

    return (

      <div className="container mt-5">

        <div className="card shadow">

          <div className="card-body text-center">

            <h1>
              🔒 Access Denied
            </h1>

            <p className="mt-3">
              This content is available
              only for Premium and
              Enterprise subscribers.
            </p>

            <h4 className="text-danger">
              Current Plan: {userPlan}
            </h4>

            <div className="mt-4">

              <h5>
                Premium Features
              </h5>

              <ul
                className="list-group mt-3"
              >

                <li className="list-group-item">
                  📊 Advanced Analytics
                </li>

                <li className="list-group-item">
                  📑 Research Reports
                </li>

                <li className="list-group-item">
                  📈 Market Insights
                </li>

                <li className="list-group-item">
                  🎯 Premium Dashboard
                </li>

                <li className="list-group-item">
                  🚀 Enterprise Tools
                </li>

              </ul>

            </div>

            <button
              className="btn btn-warning mt-4"
            >
              Upgrade Plan
            </button>

          </div>

        </div>

        <Footer />

      </div>

    );

  }

  return (

    <div>

      <h1 className="mb-4">
        Premium Content
      </h1>

      {/* Premium Stats */}

      <div className="row mb-4">

        <div className="col-md-4">
          <div className="card bg-primary text-white shadow">
            <div className="card-body">
              <h5>Reports</h5>
              <h2>24</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-success text-white shadow">
            <div className="card-body">
              <h5>Articles</h5>
              <h2>150+</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-dark text-white shadow">
            <div className="card-body">
              <h5>Downloads</h5>
              <h2>50+</h2>
            </div>
          </div>
        </div>

      </div>

      {/* Content Table */}

      <div className="card shadow">

        <div className="card-header bg-primary text-white">
          Available Premium Resources
        </div>

        <div className="card-body">

          <table className="table table-bordered">

            <thead>

              <tr>
                <th>Resource</th>
                <th>Category</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              <tr>
                <td>Premium News Articles</td>
                <td>News</td>
                <td>Available</td>
              </tr>

              <tr>
                <td>Market Research Reports</td>
                <td>Research</td>
                <td>Available</td>
              </tr>

              <tr>
                <td>Editorial Content</td>
                <td>Articles</td>
                <td>Available</td>
              </tr>

              <tr>
                <td>Enterprise Reports</td>
                <td>Enterprise</td>
                <td>Available</td>
              </tr>

              <tr>
                <td>Premium Analytics</td>
                <td>Analytics</td>
                <td>Available</td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default PremiumContent;
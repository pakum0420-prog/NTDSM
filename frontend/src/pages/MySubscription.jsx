import Footer from "../components/Footer";

function MySubscription() {
  return (
    <div>

      <h1 className="mb-4">
        My Subscription
      </h1>

      {/* Subscription Details */}

      <div className="card shadow mb-4">

        <div className="card-header bg-primary text-white">
          Subscription Information
        </div>

        <div className="card-body">

          <div className="row">

            <div className="col-md-6">

              <p>
                <strong>Subscription ID:</strong> SUB-1001
              </p>

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
                <strong>Status:</strong>{" "}
                <span className="badge bg-success">
                  Active
                </span>
              </p>

              <p>
                <strong>Renewal Date:</strong> 2026-12-31
              </p>

              <p>
                <strong>Monthly Cost:</strong> ₹499
              </p>

              <p>
                <strong>Payment Status:</strong>{" "}
                <span className="badge bg-primary">
                  Paid
                </span>
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Payment History */}

      <div className="card shadow mb-4">

        <div className="card-header bg-dark text-white">
          Payment History
        </div>

        <div className="card-body">

          <table className="table table-bordered table-striped">

            <thead>

              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              <tr>
                <td>2026-05-01</td>
                <td>₹499</td>
                <td>
                  <span className="badge bg-success">
                    Paid
                  </span>
                </td>
              </tr>

              <tr>
                <td>2026-04-01</td>
                <td>₹499</td>
                <td>
                  <span className="badge bg-success">
                    Paid
                  </span>
                </td>
              </tr>

              <tr>
                <td>2026-03-01</td>
                <td>₹499</td>
                <td>
                  <span className="badge bg-success">
                    Paid
                  </span>
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default MySubscription;
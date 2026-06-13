import { useLocation, useNavigate } from "react-router-dom";

function SubscriptionDetails() {

  const location = useLocation();

  const navigate = useNavigate();

  const data = location.state;

  if (!data) {

    return (

      <div className="container">

        <h2>
          No Subscription Data Found
        </h2>

        <button
          className="btn btn-primary mt-3"
          onClick={() =>
            navigate("/subscriptions")
          }
        >
          Back
        </button>

      </div>

    );

  }

  return (

    <div className="container">

      <div
        className="card shadow"
        style={{
          maxWidth: "900px",
          margin: "auto"
        }}
      >

        <div className="card-header bg-primary text-white">

          <h2>
            Subscription Details
          </h2>

        </div>

        <div className="card-body">

          <div className="row">

            <div className="col-md-6">

              <p>
                <strong>Name:</strong>
                {" "}
                {data.subscriber_name}
              </p>

              <p>
                <strong>Email:</strong>
                {" "}
                {data.email}
              </p>

              <p>
                <strong>Phone:</strong>
                {" "}
                {data.phone}
              </p>

              <p>
                <strong>Plan:</strong>
                {" "}
                {data.plan}
              </p>

              <p>
                <strong>Access Level:</strong>
                {" "}
                {data.access_level}
              </p>

              <p>
                <strong>Access Type:</strong>
                {" "}
                {data.access_type}
              </p>

            </div>

            <div className="col-md-6">

              <p>
                <strong>Monthly Cost:</strong>
                {" "}
                ₹{data.monthly_cost}
              </p>

              <p>
                <strong>Payment Status:</strong>
                {" "}
                {data.payment_status}
              </p>

              <p>
                <strong>Start Date:</strong>
                {" "}
                {data.start_date}
              </p>

              <p>
                <strong>End Date:</strong>
                {" "}
                {data.end_date}
              </p>

              <p>
                <strong>Renewal Type:</strong>
                {" "}
                {data.renewal_type || "-"}
              </p>

              <p>
                <strong>Status:</strong>
                {" "}
                {data.status}
              </p>

            </div>

          </div>

          <hr />

           <h4 className="mt-4 mb-3">
  Billing History
</h4>

<table className="table table-bordered">

  <thead>

    <tr>
      <th>Date</th>
      <th>Amount</th>
      <th>Status</th>
    </tr>

  </thead>

  <tbody>

    <tr>

      <td>
        {data.last_payment_date || "-"}
      </td>

      <td>
        ₹{data.monthly_cost}
      </td>

      <td>

        <span
          className={
            data.payment_status === "Paid"
              ? "badge bg-success"
              : data.payment_status === "Pending"
              ? "badge bg-warning text-dark"
              : "badge bg-danger"
          }
        >
          {data.payment_status}
        </span>

      </td>

    </tr>

  </tbody>

</table>

          <p>
            <strong>Last Payment Date:</strong>
            {" "}
            {data.last_payment_date || "-"}
          </p>

          <p>
            <strong>Next Billing Date:</strong>
            {" "}
            {data.next_billing_date || "-"}
          </p>

          <button
            className="btn btn-secondary mt-3"
            onClick={() =>
              navigate("/subscriptions")
            }
          >
            Back to Subscriptions
          </button>

        </div>

      </div>

    </div>

  );

}

export default SubscriptionDetails;
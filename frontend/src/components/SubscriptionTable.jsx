import "./SubscriptionTable.css";
import { useNavigate } from "react-router-dom";

function SubscriptionTable({
  subscriptions,
  deleteSubscription,
  editSubscription,
  handleSort
}) {

  const navigate = useNavigate();

  return (
    <div style={{ overflowX: "auto" }}>
      <table
  className="subscription-table"
  style={{ minWidth: "1400px" }}
>
        <thead>

          <tr>

            <th>ID</th>

            <th
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleSort("subscriber_name")
              }
            >
              Name ↕
            </th>

            <th>Email</th>

            <th>Phone</th>

            <th
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleSort("plan")
              }
            >
              Plan ↕
            </th>

            <th>Access Level</th>

            <th>Access Type</th>

            <th
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleSort("monthly_cost")
              }
            >
              Monthly Cost ↕
            </th>

            <th>Payment</th>

            <th
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleSort("status")
              }
            >
              Status ↕
            </th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {subscriptions.length === 0 ? (

            <tr>

              <td
                colSpan="11"
                style={{
                  textAlign: "center",
                  padding: "50px"
                }}
              >

                <h3>
                  📭 No Subscriptions Found
                </h3>

                <p
                  style={{
                    color: "#6c757d",
                    marginTop: "10px"
                  }}
                >
                  Create your first subscription
                  to get started.
                </p>

              </td>

            </tr>

          ) : (

            subscriptions.map((item) => (

              <tr key={item.id}>

                <td>{item.id}</td>

                <td>{item.subscriber_name}</td>

                <td>{item.email}</td>

                <td>{item.phone}</td>

                <td>{item.plan}</td>

                <td>
                  {item.access_level || "-"}
                </td>

                <td>
                  {item.access_type || "-"}
                </td>

                <td>
                  ₹{item.monthly_cost || 0}
                </td>

                <td>

                  <span
                    className={
                      item.payment_status === "Paid"
                        ? "badge bg-success"
                        : item.payment_status === "Pending"
                        ? "badge bg-warning text-dark"
                        : "badge bg-danger"
                    }
                  >
                    {item.payment_status || "N/A"}
                  </span>

                </td>

                <td>

                  <span
                    className={
                      item.status === "Active"
                        ? "badge bg-success"
                        : item.status === "Expired"
                        ? "badge bg-danger"
                        : "badge bg-warning text-dark"
                    }
                  >
                    {item.status}
                  </span>

                </td>

                <td>

                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() =>
                      navigate(
                        "/subscription-details",
                        {
                          state: item
                        }
                      )
                    }
                  >
                    View
                  </button>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() =>
                      editSubscription(item)
                    }
                  >
                    Edit
                  </button>

                  <button
  className="btn btn-danger btn-sm"
  onClick={() => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subscription?"
    );

    if (confirmDelete) {
      deleteSubscription(item.id);
    }
  }}
>
  Delete
</button>
                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );

}

export default SubscriptionTable;
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      const response = await fetch(
        "https://ntdsm.onrender.com/api/payments"
      );

      const data = await response.json();

      setPayments(data);
    } catch (error) {
      console.error("Error loading payments:", error);
    }
  };

  const totalRevenue = payments.reduce(
    (sum, p) => sum + Number(p.amount || 0),
    0
  );

  const paid = payments.filter(
    (p) => p.status === "Paid"
  ).length;

  const pending = payments.filter(
    (p) => p.status === "Pending"
  ).length;

  const overdue = payments.filter(
    (p) => p.status === "Overdue"
  ).length;

  return (
    <div>
      <h1 className="mb-4">
        Payment & Billing Tracker
      </h1>

      <div className="row mb-4">

        <div className="col-md-3">
          <div className="card p-3">
            <h6>Total Revenue</h6>
            <h3>₹{totalRevenue}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h6>Paid Payments</h6>
            <h3>{paid}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h6>Pending Payments</h6>
            <h3>{pending}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h6>Overdue Payments</h6>
            <h3>{overdue}</h3>
          </div>
        </div>

      </div>

      <div className="card">
        <div className="card-body">

          <table className="table table-striped">

            <thead>
              <tr>
                <th>ID</th>
                <th>Subscriber</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Last Payment</th>
                <th>Next Billing</th>
              </tr>
            </thead>

            <tbody>

              {payments.length > 0 ? (
                payments.map((item) => (
                  <tr key={item.id}>

                    <td>{item.id}</td>

                    <td>
                      {item.subscriber_name}
                    </td>

                    <td>{item.plan}</td>

                    <td>
                      ₹{item.amount}
                    </td>

                    <td>
                      <span
                        className={
                          item.status === "Paid"
                            ? "badge bg-success"
                            : item.status === "Pending"
                            ? "badge bg-warning text-dark"
                            : "badge bg-danger"
                        }
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      {item.payment_date || "-"}
                    </td>

                    <td>
                      {item.next_billing || "-"}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center"
                  >
                    No Payments Found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Payments;
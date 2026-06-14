import { useEffect, useState } from "react";
import Footer from "../components/Footer";

function Payments() {

  const [payments, setPayments] =
    useState([]);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {

    const response = await fetch(
      "https://ntdsm.onrender.com/api/payments"
    );

    const data =
      await response.json();

    setPayments(data);

  };

  const totalRevenue =
    payments.reduce(
      (sum, p) =>
        sum +
        Number(
          p.monthly_cost || 0
        ),
      0
    );

  const paid =
    payments.filter(
      p =>
        p.payment_status ===
        "Paid"
    ).length;

  const pending =
    payments.filter(
      p =>
        p.payment_status ===
        "Pending"
    ).length;

  const overdue =
    payments.filter(
      p =>
        p.payment_status ===
        "Overdue"
    ).length;

  const collectionRate =
    payments.length > 0
      ? Math.round(
          (paid /
            payments.length) *
            100
        )
      : 0;

  return (

    <div>

      <h1 className="mb-4">
        Payment & Billing Tracker
      </h1>

      <div className="row mb-4">

        <div className="col-md-3">
          <div className="card p-3">
            <h6>Total Revenue</h6>
            <h3>
              ₹{totalRevenue}
            </h3>
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

              {payments.map(
                (item) => (

                <tr
                  key={item.id}
                >

                  <td>
                    {item.id}
                  </td>

                  <td>
                    {
                      item.subscriber_name
                    }
                  </td>

                  <td>
                    {item.plan}
                  </td>

                  <td>
                    ₹
                    {
                      item.monthly_cost
                    }
                  </td>

                  <td>

                    <span
                      className={
                        item.payment_status ===
                        "Paid"
                          ? "badge bg-success"
                          : item.payment_status ===
                            "Pending"
                          ? "badge bg-warning text-dark"
                          : "badge bg-danger"
                      }
                    >
                      {
                        item.payment_status
                      }
                    </span>

                  </td>

                  <td>
                    {
                      item.last_payment_date ||
                      "-"
                    }
                  </td>

                  <td>
                    {
                      item.next_billing_date ||
                      "-"
                    }
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default Payments;
import Footer from "../components/Footer";

function PaymentHistory() {

  const payments = [

    {
      id: "TXN001",
      date: "2026-06-01",
      plan: "Premium",
      amount: "₹999",
      method: "UPI",
      status: "Paid"
    },

    {
      id: "TXN002",
      date: "2026-05-01",
      plan: "Premium",
      amount: "₹999",
      method: "Card",
      status: "Paid"
    }

  ];

  return (

    <div>

      <h1 className="mb-4">
        Payment History
      </h1>

      <div className="card shadow">

        <div className="card-body">

          <table className="table table-bordered">

            <thead>

              <tr>

                <th>Transaction ID</th>

                <th>Date</th>

                <th>Plan</th>

                <th>Amount</th>

                <th>Method</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {payments.map((p) => (

                <tr key={p.id}>

                  <td>{p.id}</td>

                  <td>{p.date}</td>

                  <td>{p.plan}</td>

                  <td>{p.amount}</td>

                  <td>{p.method}</td>

                  <td>

                    <span className="badge bg-success">
                      {p.status}
                    </span>

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

export default PaymentHistory;
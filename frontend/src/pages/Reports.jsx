import { useEffect, useState } from "react";
import Footer from "../components/Footer";

function Reports() {

  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] =
  useState("All");
const [search, setSearch] = useState("");
const [planFilter, setPlanFilter] =
  useState("All");
 
const [currentPage, setCurrentPage] = useState(1);

const recordsPerPage = 5;



const [paymentFilter, setPaymentFilter] =
  useState("All");

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {

    const response = await fetch(
      "https://ntdsm.onrender.com/api/subscriptions"
    );

    const data = await response.json();

    setSubscriptions(data);
    setLoading(false);

  };

  const exportCSV = () => {

    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "Plan",
      "Access Level",
      "Access Type",
      "Monthly Cost",
      "Payment Status",
      "Next Billing Date",
      "Status"
    ];

 const rows = filteredSubscriptions.map((s) => [
      s.id,
      s.subscriber_name,
      s.email,
      s.phone,
      s.plan,
      s.access_level,
      s.access_type,
      s.monthly_cost,
      s.payment_status,
      s.next_billing_date,
      s.status
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(","))
    ].join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;"
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "subscription_report.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

  };

  const filteredSubscriptions = subscriptions.filter((item) => {

  const searchMatch =

    item.subscriber_name
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||

    item.email
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||

    item.phone
      ?.toLowerCase()
      .includes(search.toLowerCase());

  const statusMatch =
    statusFilter === "All" ||
    item.status === statusFilter;

  const planMatch =
    planFilter === "All" ||
    item.plan === planFilter;

  const paymentMatch =
    paymentFilter === "All" ||
    item.payment_status === paymentFilter;

  return (
    searchMatch &&
    statusMatch &&
    planMatch &&
    paymentMatch
  );

});

 
const indexOfLastRecord = currentPage * recordsPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

const currentSubscriptions =
  filteredSubscriptions.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

const totalPages = Math.ceil(
  filteredSubscriptions.length / recordsPerPage
);


  const totalSubscribers =
    subscriptions.length;

  const activeSubscribers =
    subscriptions.filter(
      (s) => s.status === "Active"
    ).length;

  const expiredSubscribers =
    subscriptions.filter(
      (s) => s.status === "Expired"
    ).length;

  const totalRevenue =
    subscriptions.reduce(
      (sum, s) =>
        sum +
        Number(
          s.monthly_cost || 0
        ),
      0
    );

  const pendingPayments =
    subscriptions.filter(
      (s) =>
        s.payment_status ===
        "Pending"
    ).length;

  const paidSubscriptions =
    subscriptions.filter(
      (s) =>
        s.payment_status ===
        "Paid"
    ).length;

    const upcomingRenewals =
  subscriptions.filter((s) => {

    if (!s.next_billing_date)
      return false;

    const billingDate =
      new Date(s.next_billing_date);

    const today = new Date();

    const diffDays =
      Math.ceil(
        (billingDate - today) /
        (1000 * 60 * 60 * 24)
      );

    return (
      diffDays >= 0 &&
      diffDays <= 7
    );

  }).length;

 if (loading) {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        height: "100vh"
      }}
    >
      <div
        className="spinner-border text-primary"
        role="status"
        style={{
          width: "4rem",
          height: "4rem"
        }}
      >
        <span className="visually-hidden">
          Loading...
        </span>
      </div>

      <h4 className="mt-4">
        Loading Reports...
      </h4>

      <p className="text-muted">
        Please wait...
      </p>
    </div>
  );
}

  return (

    <div>


      <h1 className="mb-4">
        Reports Dashboard
      </h1>

      {/* Top Summary Cards */}

      <div className="row mb-4">

<div className="col-12 col-md-4 mb-3">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5>Total Subscribers</h5>
              <h2>
                {totalSubscribers}
              </h2>
            </div>
          </div>
        </div>

       <div className="col-12 col-md-4 mb-3">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5>Active Subscribers</h5>
              <h2>
                {activeSubscribers}
              </h2>
            </div>
          </div>
        </div>

       <div className="col-12 col-md-4 mb-3">
          <div className="card text-white bg-danger">
            <div className="card-body">
              <h5>Expired Subscribers</h5>
              <h2>
                {expiredSubscribers}
              </h2>
            </div>
          </div>
        </div>

      </div>

      {/* Revenue Cards */}

      <div className="row mb-4">

 <div className="col-12 col-sm-6 col-lg-3 mb-3">
    <div className="card text-white bg-warning">
      <div className="card-body">
        <h5>Total Revenue</h5>
        <h2>₹{totalRevenue}</h2>
      </div>
    </div>
  </div>

 <div className="col-12 col-sm-6 col-lg-3 mb-3">
    <div className="card text-white bg-dark">
      <div className="card-body">
        <h5>Pending Payments</h5>
        <h2>{pendingPayments}</h2>
      </div>
    </div>
  </div>

 <div className="col-12 col-sm-6 col-lg-3 mb-3">
    <div className="card text-white bg-info">
      <div className="card-body">
        <h5>Paid Subscribers</h5>
        <h2>{paidSubscriptions}</h2>
      </div>
    </div>
  </div>

 <div className="col-12 col-sm-6 col-lg-3 mb-3">
    <div className="card text-white bg-secondary">
      <div className="card-body">
        <h5>Upcoming Renewals</h5>
        <h2>{upcomingRenewals}</h2>
      </div>
    </div>
  </div>

</div>
     
    <div className="row mb-3">

  <div className="col-md-4">

    <input
      type="text"
      className="form-control"
      placeholder="Search Name, Email or Phone..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

  </div>

  <div className="col-md-8 d-flex gap-2">
    
  </div>

  <select
    className="form-select"
    value={statusFilter}
    onChange={(e) =>
      setStatusFilter(
        e.target.value
      )
    }
  >
    <option value="All">
      All Status
    </option>

    <option value="Active">
      Active
    </option>

    <option value="Expired">
      Expired
    </option>

    <option value="Trial">
      Trial
    </option>

  </select>

  <select
    className="form-select"
    value={planFilter}
    onChange={(e) =>
      setPlanFilter(
        e.target.value
      )
    }
  >
    <option value="All">
      All Plans
    </option>

    <option value="Basic">
      Basic
    </option>

    <option value="Premium">
      Premium
    </option>

    <option value="Enterprise">
      Enterprise
    </option>

    <option value="Trial">
      Trial
    </option>

  </select>

  <select
    className="form-select"
    value={paymentFilter}
    onChange={(e) =>
      setPaymentFilter(
        e.target.value
      )
    }
  >
    <option value="All">
      All Payments
    </option>

    <option value="Paid">
      Paid
    </option>

    <option value="Pending">
      Pending
    </option>

    <option value="Overdue">
      Overdue
    </option>

  </select>

</div>

      <div className="d-flex gap-2 mb-4">

  <button
    className="btn btn-success"
    onClick={exportCSV}
  >
    Export CSV
  </button>

  <button
    className="btn btn-primary"
    onClick={() => window.print()}
  >
    Print Report
  </button>

</div>

      {/* Report Table */}

      <div className="card">

        <div className="card-header">
          Subscription Report
        </div>

        <div className="card-body">

          <div
            style={{
              overflowX: "auto"
            }}
          >
              <div className="table-responsive">
            <table
              className="table table-bordered table-striped"
              style={{
                minWidth: "1400px"
              }}
            >

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Plan</th>
                  <th>Access Level</th>
                  <th>Access Type</th>
                  <th>Monthly Cost</th>
                  <th>Payment Status</th>
                  <th>Next Billing Date</th>
                  <th>Status</th>
                </tr>

              </thead>

            <tbody>

{currentSubscriptions.length === 0 ? (

<tr>

<td
colSpan="11"
className="text-center py-5"
>

<h5 className="text-muted">
📭 No records found
</h5>

<p className="text-muted mb-0">
Try changing your search or filters.
</p>

</td>

</tr>

) : (

currentSubscriptions.map((item, index) => (

<tr key={item.id}>
                      <td>{index + 1}</td>

                      <td>
                        {
                          item.subscriber_name
                        }
                      </td>

                      <td>
                        {item.email}
                      </td>

                      <td>
                        {item.phone}
                      </td>

                      <td>
                        {item.plan}
                      </td>

                      <td>
                        {
                          item.access_level
                        }
                      </td>

                      <td>
                        {
                          item.access_type
                        }
                      </td>

                      <td>
                        ₹
                        {
                          item.monthly_cost
                        }
                      </td>

                      <td>
                        {
                          item.payment_status
                        }
                      </td>

                      <td>
                        {
                          item.next_billing_date
                        }
                      </td>

                      <td>
                        {item.status}
                      </td>

                    </tr>

                      )
                ))}

              </tbody>

            </table>
            </div>

          </div>

        </div>

      </div>
<div className="card mt-4">

  <div className="card-header">

    Upcoming Renewals

  </div>

  <div className="card-body">

    {subscriptions.filter(
      (s) => s.next_billing_date
    ).length === 0 ? (

      <p>
        No upcoming renewals
      </p>

    ) : (

      <table className="table">

        <thead>

          <tr>

            <th>Name</th>

            <th>Plan</th>

            <th>Next Billing Date</th>

          </tr>

        </thead>

        <tbody>

          {subscriptions
            .filter(
              (s) =>
                s.next_billing_date
            )
            .map((s) => (

              <tr key={s.id}>

                <td>
                  {s.subscriber_name}
                </td>

                <td>
                  {s.plan}
                </td>

                <td>
                  {s.next_billing_date}
                </td>

              </tr>

            ))}

        </tbody>

      </table>

    )}

<div className="d-flex justify-content-center mt-4">

  <button
    className="btn btn-secondary me-2"
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
  >
    Previous
  </button>

  {[...Array(totalPages)].map((_, index) => (

    <button
      key={index}
      className={
        currentPage === index + 1
          ? "btn btn-primary me-2"
          : "btn btn-outline-primary me-2"
      }
      onClick={() => setCurrentPage(index + 1)}
    >
      {index + 1}
    </button>

  ))}

  <button
    className="btn btn-secondary"
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(currentPage + 1)}
  >
    Next
  </button>

</div>
    
  </div>

</div>
  <Footer />
    </div>
       
  );

}

export default Reports;
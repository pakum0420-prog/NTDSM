import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
function Payments() {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  
  
const [editMode, setEditMode] = useState(false);
const [editingId, setEditingId] = useState(null);
const [currentPage, setCurrentPage] = useState(1);

const recordsPerPage = 5;


  const [formData, setFormData] = useState({
  subscriber_name: "",
  plan: "",
  amount: "",
  status: "Pending",
  payment_date: "",
  next_billing: ""
 });








  useEffect(() => {
    loadPayments();
   
setEditMode(false);
setEditingId(null);


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

   const handleSubmit = async (e) => {
  e.preventDefault();

  try {
  
const url = editMode
  ? `https://ntdsm.onrender.com/api/payments/${editingId}`
  : "https://ntdsm.onrender.com/api/payments";

const method = editMode ? "PUT" : "POST";

const response = await fetch(url, {
  method,
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(formData)
});


    if (response.ok) {
      alert(
  editMode
    ? "Payment Updated Successfully"
    : "Payment Added Successfully"
);
      setFormData({
        subscriber_name: "",
        plan: "",
        amount: "",
        status: "Pending",
        payment_date: "",
        next_billing: ""
      });

      loadPayments();

      setEditMode(false);
setEditingId(null);

setFormData({
  subscriber_name: "",
  plan: "",
  amount: "",
  status: "Pending",
  payment_date: "",
  next_billing: ""
});
    } else {
      alert("Failed to Add Payment");
    }

  } catch (error) {
    console.error(error);
  }
};
     

const handleEdit = (payment) => {
  setFormData({
    subscriber_name: payment.subscriber_name,
    plan: payment.plan,
    amount: payment.amount,
    status: payment.status,
    payment_date: payment.payment_date,
    next_billing: payment.next_billing
  });

  setEditingId(payment.id);
  setEditMode(true);
};
   

    const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this payment?"
  );

  if (!confirmDelete) return;

  try {

    const response = await fetch(
      `https://ntdsm.onrender.com/api/payments/${id}`,
      {
        method: "DELETE"
      }
    );

    if (response.ok) {
      alert("Payment Deleted Successfully");
      loadPayments();
    } else {
      alert("Delete Failed");
    }

  } catch (error) {
    console.error(error);
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

   
   const filteredPayments = payments.filter((item) => {

  const matchesSearch =
    item.subscriber_name
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||

    item.plan
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||

    item.status
      ?.toLowerCase()
      .includes(search.toLowerCase());

  const matchesFilter =
    filter === "All" ||
    item.status === filter;

  return matchesSearch && matchesFilter;

});

const indexOfLastRecord = currentPage * recordsPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

const currentPayments = filteredPayments.slice(
  indexOfFirstRecord,
  indexOfLastRecord
);

const totalPages = Math.ceil(
  filteredPayments.length / recordsPerPage
);

  return (
    <div>
     
     <Breadcrumb
  items={[
    {
      label: "Dashboard",
      path: "/admin-dashboard"
    },
    {
      label: "Payments"
    }
  ]}
/>

      <h1 className="mb-4">
        Payment & Billing Tracker
      </h1>


      <div className="mb-4">
  <input
    type="text"
    className="form-control"
    placeholder="Search by Subscriber, Plan or Status..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>


<div className="mb-4">
  <select
    className="form-select"
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
  >
    <option value="All">All Payments</option>
    <option value="Paid">Paid</option>
    <option value="Pending">Pending</option>
    <option value="Overdue">Overdue</option>
  </select>
</div>
       
       
   <div className="card mb-4">
    <div className="card-header">
    <h5>Add New Payment</h5>
    </div>

  <div className="card-body">

    <form onSubmit={handleSubmit}>

      <div className="row">

        <div className="col-md-4 mb-3">
          <input
            className="form-control"
            placeholder="Subscriber Name"
            value={formData.subscriber_name}
            onChange={(e) =>
              setFormData({
                ...formData,
                subscriber_name: e.target.value
              })
            }
            required
          />
        </div>

        <div className="col-md-4 mb-3">
          <input
            className="form-control"
            placeholder="Plan"
            value={formData.plan}
            onChange={(e) =>
              setFormData({
                ...formData,
                plan: e.target.value
              })
            }
            required
          />
        </div>

        <div className="col-md-4 mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({
                ...formData,
                amount: e.target.value
              })
            }
            required
          />
        </div>

        <div className="col-md-4 mb-3">
          <select
            className="form-select"
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value
              })
            }
          >
            <option>Paid</option>
            <option>Pending</option>
            <option>Overdue</option>
          </select>
        </div>

        <div className="col-md-4 mb-3">
          <input
            type="date"
            className="form-control"
            value={formData.payment_date}
            onChange={(e) =>
              setFormData({
                ...formData,
                payment_date: e.target.value
              })
            }
          />
        </div>

        <div className="col-md-4 mb-3">
          <input
            type="date"
            className="form-control"
            value={formData.next_billing}
            onChange={(e) =>
              setFormData({
                ...formData,
                next_billing: e.target.value
              })
            }
          />
        </div>

      </div>

     
<button
  className="btn btn-primary"
  type="submit"
>
  {editMode ? "Update Payment" : "Add Payment"}
</button>


    </form>

  </div>
</div>



      <div className="row mb-4">

        <div className="col-md-3">
          <div className="card p-3">
            <h6>Total Revenue</h6>
            <h3>₹{totalRevenue}</h3>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3 mb-3">
          <div className="card p-3">
            <h6>Paid Payments</h6>
            <h3>{paid}</h3>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3 mb-3">
          <div className="card p-3">
            <h6>Pending Payments</h6>
            <h3>{pending}</h3>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3 mb-3">
          <div className="card p-3">
            <h6>Overdue Payments</h6>
            <h3>{overdue}</h3>
          </div>
        </div>

      </div>

      <div className="card">
        <div className="card-body">

          <div className="table-responsive">

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
                <th>Actions</th>
              </tr>
            </thead>

           
<tbody>

  {currentPayments.length > 0 ? (

    currentPayments.map((item) => (

      <tr key={item.id}>

        <td>{item.id}</td>

        <td>{item.subscriber_name}</td>

        <td>{item.plan}</td>

        <td>₹{item.amount}</td>

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

        <td>{item.payment_date || "-"}</td>

        <td>{item.next_billing || "-"}</td>

        <td>
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => handleEdit(item)}
          >
            Edit
          </button>

        <button
  className="btn btn-danger btn-sm"
  onClick={() => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this payment?"
    );

    if (confirmDelete) {
      handleDelete(item.id);
    }
  }}
>
  Delete
</button>
        </td>

      </tr>

    ))

  ) : (

    <tr>
      <td colSpan="8" className="text-center">
        No Payments Found
      </td>
    </tr>

  )}

</tbody>


          </table>
          </div>


           
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

export default Payments;
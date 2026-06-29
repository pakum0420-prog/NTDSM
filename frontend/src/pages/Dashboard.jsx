import { useEffect, useState } from "react";

import "./Dashboard.css";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import DashboardCards from "../components/DashboardCards";
import Breadcrumb from "../components/Breadcrumb";

import AlertsPanel from "../components/AlertsPanel";
import AccessOverview
from "../components/AccessOverview";
function Dashboard() {

  const [subscriptions, setSubscriptions] = useState([]);

  const [search, setSearch] = useState("");
  const [sortField, setSortField] =
  useState("");

const [sortOrder, setSortOrder] =
  useState("asc");

  const [editMode, setEditMode] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] =
  useState(true);

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    expired: 0,
    trial: 0
  });
     
  const [formData, setFormData] = useState({
  subscriber_name: "",
  email: "",
  phone: "",

  plan: "",

  access_level: "",
  access_type: "",

  trial_days: "",

  start_date: "",
  end_date: "",

  status: "Active",

  monthly_cost: "",

  payment_status: "",

  last_payment_date: "",

  next_billing_date: ""
});

  useEffect(() => {
    loadSubscriptions();
    loadDashboard();
  }, []);

  const loadSubscriptions = async () => {

    const response = await fetch(
      "https://ntdsm.onrender.com/api/subscriptions"
    );

    const data = await response.json();

    setSubscriptions(data);

  };

  const loadDashboard = async () => {

  setLoading(true);

  const response = await fetch(
    "https://ntdsm.onrender.com/api/dashboard"
  );

  const data =
    await response.json();

  setStats(data);

  setLoading(false);

};

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const clearForm = () => {

    setFormData({
  subscriber_name: "",
  email: "",
  phone: "",

  plan: "",

  access_level: "",
  access_type: "",

  trial_days: "",

  start_date: "",
  end_date: "",

  status: "Active",

  monthly_cost: "",

  payment_status: "",

  last_payment_date: "",

  next_billing_date: ""
});

    setEditMode(false);

    setEditingId(null);

  };

  const saveSubscription = async (e) => {

  e.preventDefault();

 // =========================
// COMPLETE FORM VALIDATION
// =========================

if (!formData.subscriber_name.trim()) {
  alert("Subscriber Name is required");
  return;
}

if (formData.subscriber_name.length < 3) {
  alert("Subscriber Name must be at least 3 characters");
  return;
}

if (!formData.email.trim()) {
  alert("Email is required");
  return;
}

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(formData.email)) {
  alert("Please enter a valid email address");
  return;
}

if (!formData.phone.trim()) {
  alert("Phone Number is required");
  return;
}

if (!/^\d+$/.test(formData.phone)) {
  alert("Phone Number must contain only digits");
  return;
}

if (formData.phone.length !== 10) {
  alert("Phone Number must be exactly 10 digits");
  return;
}

if (!formData.plan) {
  alert("Please select a Plan");
  return;
}

if (!formData.access_level) {
  alert("Please select an Access Level");
  return;
}

if (!formData.access_type) {
  alert("Please select an Access Type");
  return;
}

if (!formData.monthly_cost) {
  alert("Monthly Cost is required");
  return;
}

if (Number(formData.monthly_cost) <= 0) {
  alert("Monthly Cost must be greater than 0");
  return;
}

if (!formData.start_date) {
  alert("Start Date is required");
  return;
}

if (!formData.end_date) {
  alert("End Date is required");
  return;
}

if (
  new Date(formData.end_date) <
  new Date(formData.start_date)
) {
  alert(
    "End Date must be after Start Date"
  );
  return;
}

if (!formData.payment_status) {
  alert("Please select Payment Status");
  return;
}

if (!formData.next_billing_date) {
  alert("Next Billing Date is required");
  return;
}

if (!formData.status) {
  alert("Please select Status");
  return;
}

  if (editMode) {

    await fetch(
      `https://ntdsm.onrender.com/api/subscriptions/${editingId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }
      
    );
      toast.success(
  "Subscription Updated Successfully"
);
  } else {

  await fetch(
    "https://ntdsm.onrender.com/api/subscriptions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }
  );

  toast.success(
    "Subscription Created Successfully"
  );


       await fetch(
  "https://ntdsm.onrender.com/api/subscriptions",
       );
       }

  await loadSubscriptions();

  await loadDashboard();

  clearForm();

};

  const deleteSubscription = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this subscription?"
      );

    if (!confirmDelete) return;

    await fetch(
      `https://ntdsm.onrender.com/api/subscriptions/${id}`,
      {
        method: "DELETE"
      }
    );
      toast.success(
  "Subscription Deleted Successfully"
);
    await loadSubscriptions();
    await loadDashboard();

  };

  const editSubscription = (item) => {

    setFormData({
  subscriber_name: item.subscriber_name,
  email: item.email,
  phone: item.phone,

  plan: item.plan,

  access_level: item.access_level || "",
  access_type: item.access_type || "",

  trial_days: item.trial_days,

  start_date: item.start_date,
  end_date: item.end_date,

  status: item.status,

  monthly_cost: item.monthly_cost || "",

  payment_status:
    item.payment_status || "",

  last_payment_date:
    item.last_payment_date || "",

  next_billing_date:
    item.next_billing_date || ""
});

    setEditingId(item.id);

    setEditMode(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
        
   
  
  };

    const handleSort = (field) => {

  if (sortField === field) {

    setSortOrder(
      sortOrder === "asc"
        ? "desc"
        : "asc"
    );

  } else {

    setSortField(field);

    setSortOrder("asc");

  }

};

const filteredSubscriptions =
  subscriptions
    .filter((item) => {

      const name =
        item.subscriber_name?.toLowerCase() || "";

      const email =
        item.email?.toLowerCase() || "";

      const plan =
        item.plan?.toLowerCase() || "";

      const searchText =
        search.toLowerCase();

      return (
        name.includes(searchText) ||
        email.includes(searchText) ||
        plan.includes(searchText)
      );

    })

    .sort((a, b) => {

      if (!sortField) return 0;

      let valueA =
        a[sortField] || "";

      let valueB =
        b[sortField] || "";

      if (
        sortField === "monthly_cost"
      ) {
        valueA =
          Number(valueA);

        valueB =
          Number(valueB);
      } else {

        valueA =
          valueA
            .toString()
            .toLowerCase();

        valueB =
          valueB
            .toString()
            .toLowerCase();

      }

      if (valueA < valueB)
        return sortOrder === "asc"
          ? -1
          : 1;

      if (valueA > valueB)
        return sortOrder === "asc"
          ? 1
          : -1;

      return 0;

    });

     
    if (loading) {

  return (

    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >

      <div
        className="spinner-border text-primary"
        role="status"
      />

      <h5 className="mt-3">
        Loading Dashboard...
      </h5>

    </div>

  );

}

 return (

  <div className="dashboard-container">

  

<div className="hero-banner">

  <div>

    <Breadcrumb
  items={[
    {
      label: "Dashboard"
    }
  ]}
/>

    <h1>
      👋 Welcome Back, Admin
    </h1>

    <p>
      Monitor subscriptions, payments, revenue and customer activity from one place.
    </p>

  </div>

  <div className="hero-date">

    <h5>
      {new Date().toLocaleDateString()}
    </h5>

    <small>
      Last Updated
    </small>

  </div>

</div>

    <DashboardCards stats={stats} />

     <div className="card mb-4">

  <div className="card-header">

    Quick Actions

  </div>

  <div className="card-body">

    <div
      style={{
        display: "flex",
        gap: "15px",
        flexWrap: "wrap"
      }}
    >

      <button
        className="btn btn-primary"
        onClick={() =>
          window.location.href =
            "/subscriptions"
        }
      >
        ➕ New Subscription
      </button>

      <button
        className="btn btn-success"
        onClick={() =>
          window.location.href =
            "/reports"
        }
      >
        📄 Export Reports
      </button>

      <button
        className="btn btn-info"
        onClick={() =>
          window.location.href =
            "/analytics"
        }
      >
        📈 View Analytics
      </button>

    </div>

  </div>

</div>

    <AlertsPanel
      subscriptions={subscriptions}
    />

    <AccessOverview
  subscriptions={subscriptions}
/>

   

     
<div className="card shadow-sm border-0 mt-4">
  <div className="card-body">

    <h4 className="mb-4">
      📋 Recent Activity
    </h4>

    <div
      style={{
        maxHeight: "350px",
        overflowY: "auto"
      }}
    >
      {subscriptions.length === 0 ? (
        <div
          className="text-center text-muted p-5"
        >
          No recent activities found.
        </div>
      ) : (
        subscriptions
          .slice(-5)
          .reverse()
          .map((item) => (

            <div
              key={item.id}
              style={{
                background: "#f8f9fa",
                borderRadius: "15px",
                padding: "15px",
                marginBottom: "15px",
                borderLeft:
                  `5px solid ${
                    item.status === "Expired"
                      ? "#dc3545"
                      : item.status === "Trial"
                      ? "#ffc107"
                      : "#198754"
                  }`
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center"
                }}
              >
                <strong>
                  {item.subscriber_name}
                </strong>

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
              </div>

              <div
                style={{
                  color: "#6c757d",
                  marginTop: "5px"
                }}
              >
                {item.status === "Active"
                  ? `Activated ${item.plan} subscription`
                  : item.status === "Expired"
                  ? "Subscription expired"
                  : "Started free trial"}
              </div>

              <small
                style={{
                  color: "#adb5bd"
                }}
              >
                ID : {item.id}
              </small>
            </div>

          ))
      )}
    </div>

  </div>
</div>

      
       <Footer />
    </div>

  );

}

export default Dashboard;
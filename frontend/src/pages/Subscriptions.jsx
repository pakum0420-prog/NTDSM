import { useEffect, useState } from "react";

import SearchBar from "../components/SearchBar";
import SubscriptionForm from "../components/SubscriptionForm";
import { toast } from "react-toastify";
import SubscriptionTable from "../components/SubscriptionTable";
import Footer from "../components/Footer";

function Subscriptions() {
         const [subscriptions, setSubscriptions] =
  useState([]);

const [search, setSearch] =
  useState("");
  const [statusFilter, setStatusFilter] =
  useState("All");

const [paymentFilter, setPaymentFilter] =
  useState("All");

const [planFilter, setPlanFilter] =
  useState("All");

const [currentPage, setCurrentPage] =
  useState(1);

const recordsPerPage = 5;
const [sortField, setSortField] =
  useState("");

const [sortOrder, setSortOrder] =
  useState("asc");

const [editMode, setEditMode] =
  useState(false);

const [editingId, setEditingId] =
  useState(null);

const [formData, setFormData] =
  useState({
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
}, []);

const loadSubscriptions = async () => {

  const response = await fetch(
    "http://https://ntdsm.onrender.com/api/subscriptions"
  );

  const data =
    await response.json();

  setSubscriptions(data);

};

const handleChange = (e) => {

  setFormData({
    ...formData,
    [e.target.name]:
      e.target.value
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
    renewal_type: "",

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
      `http://https://ntdsm.onrender.com/api/subscriptions/${editingId}`,
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
    "http://https://ntdsm.onrender.com/api/subscriptions",
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


       }

  await loadSubscriptions();

  

  clearForm();

};

  const deleteSubscription = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this subscription?"
      );

    if (!confirmDelete) return;

    await fetch(
      `http://https://ntdsm.onrender.com/api/subscriptions/${id}`,
      {
        method: "DELETE"
      }
    );
      toast.success(
  "Subscription Deleted Successfully"
);
    await loadSubscriptions();
   

  };

  const editSubscription = (item) => {

    setFormData({
  subscriber_name: item.subscriber_name,
  email: item.email,
  phone: item.phone,

  plan: item.plan,

  access_level: item.access_level || "",
  access_type: item.access_type || "",
   renewal_type:
  item.renewal_type || "",

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

      const matchesSearch =
        name.includes(searchText) ||
        email.includes(searchText) ||
        plan.includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      const matchesPayment =
        paymentFilter === "All" ||
        item.payment_status === paymentFilter;

      const matchesPlan =
        planFilter === "All" ||
        item.plan === planFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPayment &&
        matchesPlan
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

        valueA = Number(valueA);
        valueB = Number(valueB);

      } else {

        valueA =
          valueA.toString().toLowerCase();

        valueB =
          valueB.toString().toLowerCase();

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

     const lastIndex =
  currentPage * recordsPerPage;

const firstIndex =
  lastIndex - recordsPerPage;

const currentRecords =
  filteredSubscriptions.slice(
    firstIndex,
    lastIndex
  );

const totalPages =
  Math.ceil(
    filteredSubscriptions.length /
    recordsPerPage
  );
 return (

  <div>

    <h1 className="mb-4">
      Subscription Management
    </h1>
<SearchBar
  search={search}
  setSearch={setSearch}
/>

<div
  style={{
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    marginTop: "15px"
  }}
>

  <select
    value={statusFilter}
    onChange={(e) =>
      setStatusFilter(
        e.target.value
      )
    }
  >
    <option value="All">All Status</option>
    <option value="Active">Active</option>
    <option value="Expired">Expired</option>
    <option value="Trial">Trial</option>
  </select>

  <select
    value={paymentFilter}
    onChange={(e) =>
      setPaymentFilter(
        e.target.value
      )
    }
  >
    <option value="All">All Payments</option>
    <option value="Paid">Paid</option>
    <option value="Pending">Pending</option>
    <option value="Overdue">Overdue</option>
  </select>

  <select
    value={planFilter}
    onChange={(e) =>
      setPlanFilter(
        e.target.value
      )
    }
  >
    <option value="All">All Plans</option>
    <option value="Basic">Basic</option>
    <option value="Premium">Premium</option>
    <option value="Enterprise">Enterprise</option>
    <option value="Trial">Trial</option>
  </select>

</div>

    <div className="form-section">

      <h3 className="mb-3">

        {editMode
          ? "Update Subscription"
          : "Create Subscription"}

      </h3>

      <SubscriptionForm
        formData={formData}
        handleChange={handleChange}
        saveSubscription={saveSubscription}
        editMode={editMode}
      />

    </div>

    <div className="table-section">

      <SubscriptionTable
       subscriptions={currentRecords}
        deleteSubscription={deleteSubscription}
        editSubscription={editSubscription}
        handleSort={handleSort}
      />

    </div>
    <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px"
  }}
>

  <button
    className="btn btn-secondary"
    disabled={currentPage === 1}
    onClick={() =>
      setCurrentPage(
        currentPage - 1
      )
    }
  >
    Previous
  </button>

  <span
    style={{
      padding: "8px 12px"
    }}
  >
    Page {currentPage} of {totalPages}
  </span>

  <button
    className="btn btn-secondary"
    disabled={
      currentPage === totalPages
    }
    onClick={() =>
      setCurrentPage(
        currentPage + 1
      )
    }
  >
    Next
  </button>

</div>
    <Footer />
  </div>

);
}

export default Subscriptions;
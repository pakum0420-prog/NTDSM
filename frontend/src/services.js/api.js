javascript
const API_URL = "https://ntdsm.onrender.com";

export const getSubscriptions = async () => {
  const response = await fetch(
    `${API_URL}/api/subscriptions`
  );

  return response.json();
};

export const createSubscription = async (data) => {
  const response = await fetch(
    `${API_URL}/api/subscriptions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
  );

  return response.json();
};

export const updateSubscription = async (id, data) => {
  const response = await fetch(
    `${API_URL}/api/subscriptions/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
  );

  return response.json();
};

export const deleteSubscription = async (id) => {
  const response = await fetch(
    `${API_URL}/api/subscriptions/${id}`,
    {
      method: "DELETE"
    }
  );

  return response.json();
};

export const getDashboardStats = async () => {
  const response = await fetch(
    `${API_URL}/api/dashboard`
  );

  return response.json();
};

export const getPayments = async () => {
  const response = await fetch(
    `${API_URL}/api/payments`
  );

  return response.json();
};

export const createPayment = async (data) => {
  const response = await fetch(
    `${API_URL}/api/payments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
  );

  return response.json();
};

export const getAuditLogs = async () => {
  const response = await fetch(
    `${API_URL}/api/audit-logs`
  );

  return response.json();
};


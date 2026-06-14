const API_URL = "http://https://ntdsm.onrender.com";

export const getSubscriptions = async () => {
  const response = await fetch(
    `${API_URL}/api/subscriptions`
  );

  return response.json();
};

export const createSubscription = async (data) => {

  await fetch(
    `${API_URL}/api/subscriptions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
  );
};

export const getDashboardStats = async () => {

  const response = await fetch(
    `${API_URL}/api/dashboard`
  );

  return response.json();
};
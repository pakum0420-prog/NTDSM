import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

function Analytics() {

  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {

    const response = await fetch(
      "http://127.0.0.1:5000/api/subscriptions"
    );

    const data = await response.json();

    setSubscriptions(data);

  };

  const basicCount =
    subscriptions.filter(
      (s) => s.plan === "Basic"
    ).length;

  const premiumCount =
    subscriptions.filter(
      (s) => s.plan === "Premium"
    ).length;

  const enterpriseCount =
    subscriptions.filter(
      (s) => s.plan === "Enterprise"
    ).length;

  const trialCount =
    subscriptions.filter(
      (s) => s.plan === "Trial"
    ).length;

  const activeCount =
    subscriptions.filter(
      (s) => s.status === "Active"
    ).length;

  const expiredCount =
    subscriptions.filter(
      (s) => s.status === "Expired"
    ).length;

  const pendingPayments =
    subscriptions.filter(
      (s) => s.payment_status === "Pending"
    ).length;

  const totalRevenue =
    subscriptions.reduce(
      (sum, s) =>
        sum + Number(s.monthly_cost || 0),
      0
    );

  const planData = [
    {
      name: "Basic",
      value: basicCount
    },
    {
      name: "Premium",
      value: premiumCount
    },
    {
      name: "Enterprise",
      value: enterpriseCount
    },
    {
      name: "Trial",
      value: trialCount
    }
  ];

  const statusData = [
    {
      status: "Active",
      count: activeCount
    },
    {
      status: "Expired",
      count: expiredCount
    }
  ];

  const revenueData = [
    {
      name: "Revenue",
      amount: totalRevenue
    }
  ];

  const COLORS = [
    "#0d6efd",
    "#198754",
    "#dc3545",
    "#ffc107"
  ];

  return (

    <div>

      <h1 className="mb-4">
        Analytics Dashboard
      </h1>

      <div className="row mb-4">

        <div className="col-md-4">

          <div className="card bg-primary text-white">

            <div className="card-body">

              <h5>Total Subscribers</h5>

              <h2>
                {subscriptions.length}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card bg-success text-white">

            <div className="card-body">

              <h5>Total Revenue</h5>

              <h2>
                ₹{totalRevenue}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card bg-warning text-dark">

            <div className="card-body">

              <h5>Pending Payments</h5>

              <h2>
                {pendingPayments}
              </h2>

            </div>

          </div>

        </div>

      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px"
        }}
      >

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.1)"
          }}
        >

          <h3>
            Plan Distribution
          </h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={planData}
                dataKey="value"
                outerRadius={100}
                label
              >

                {planData.map(
                  (entry, index) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[index %
                        COLORS.length]
                      }
                    />

                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.1)"
          }}
        >

          <h3>
            Subscription Status
          </h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart
              data={statusData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="status"
              />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="count"
                fill="#0d6efd"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      <div
        style={{
          background: "white",
          marginTop: "20px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.1)"
        }}
      >

        <h3>
          Revenue Overview
        </h3>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart
            data={revenueData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="name"
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="amount"
              fill="#198754"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>
          <Footer />
    </div>

  );

}

export default Analytics;
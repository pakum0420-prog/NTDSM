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

function AnalyticsChart({
  subscriptions
}) {

  const active =
    subscriptions.filter(
      (s) => s.status === "Active"
    ).length;

  const expired =
    subscriptions.filter(
      (s) => s.status === "Expired"
    ).length;

  const trial =
    subscriptions.filter(
      (s) =>
        s.plan?.toLowerCase() === "trial"
    ).length;

  const paid =
    subscriptions.filter(
      (s) =>
        s.payment_status === "Paid"
    ).length;

  const pending =
    subscriptions.filter(
      (s) =>
        s.payment_status === "Pending"
    ).length;

  const revenue =
    subscriptions.reduce(
      (sum, s) =>
        sum + Number(s.monthly_cost || 0),
      0
    );

  const pieData = [
    {
      name: "Active",
      value: active
    },
    {
      name: "Expired",
      value: expired
    },
    {
      name: "Trial",
      value: trial
    }
  ];

  const paymentData = [
    {
      name: "Paid",
      value: paid
    },
    {
      name: "Pending",
      value: pending
    }
  ];

  const revenueData = [
    {
      name: "Revenue",
      amount: revenue
    }
  ];

  const COLORS = [
    "#28a745",
    "#dc3545",
    "#ffc107"
  ];

  return (

    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px"
      }}
    >

      <h3>
        Subscription Analytics
      </h3>

      {/* Status Chart */}

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <PieChart>

          <Pie
            data={pieData}
            dataKey="value"
            outerRadius={100}
            label
          >

            {pieData.map(
              (entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              )
            )}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

      {/* Payment Chart */}

      <h3
        style={{
          marginTop: "30px"
        }}
      >
        Payment Status
      </h3>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <BarChart
          data={paymentData}
        >

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar dataKey="value" />

        </BarChart>

      </ResponsiveContainer>

      {/* Revenue Chart */}

      <h3
        style={{
          marginTop: "30px"
        }}
      >
        Revenue Overview
      </h3>

      <ResponsiveContainer
        width="100%"
        height={250}
      >

        <BarChart
          data={revenueData}
        >

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar dataKey="amount" />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default AnalyticsChart;
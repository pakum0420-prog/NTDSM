// Analytics.jsx
import { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from "recharts";

function Analytics() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => { loadSubscriptions(); }, []);

  const loadSubscriptions = async () => {
    const response = await fetch("https://ntdsm.onrender.com/api/subscriptions");
    const data = await response.json();
    setSubscriptions(data);
  };

  const totalSubscribers = subscriptions.length;
  const activeCount = subscriptions.filter(s=>s.status==="Active").length;
  const expiredCount = subscriptions.filter(s=>s.status==="Expired").length;
  const trialCount = subscriptions.filter(s=>s.plan==="Trial").length;
  const pendingPayments = subscriptions.filter(s=>s.payment_status==="Pending").length;
  const overduePayments = subscriptions.filter(s=>s.payment_status==="Overdue").length;

  const totalRevenue = subscriptions.reduce(
    (sum,s)=>sum+Number(s.monthly_cost||0),0
  );

  const averageRevenue =
    totalSubscribers>0 ? Math.round(totalRevenue/totalSubscribers) : 0;

  const renewalRate =
    totalSubscribers>0 ? Math.round((activeCount/totalSubscribers)*100) : 0;

  const plans=["Basic","Premium","Enterprise","Trial"];
  const planData=plans.map(plan=>({
    name:plan,
    value:subscriptions.filter(s=>s.plan===plan).length
  }));

  const statusData=[
    {status:"Active",count:activeCount},
    {status:"Expired",count:expiredCount},
    {status:"Trial",count:trialCount}
  ];

  const revenueData=plans.map(plan=>({
    plan,
    revenue:subscriptions
      .filter(s=>s.plan===plan)
      .reduce((a,b)=>a+Number(b.monthly_cost||0),0)
  }));

  const COLORS=["#0d6efd","#198754","#ffc107","#dc3545"];

  return (
    <div className="container-fluid py-3">
      <Breadcrumb
  items={[
    {
      label: "Dashboard",
      path: "/admin-dashboard"
    },
    {
      label: "Analytics"
    }
  ]}
/>
      <h1 className="mb-4">Analytics Dashboard</h1>

      <div className="row g-3 mb-4">
        {[
          ["Total Subscribers",totalSubscribers,"primary"],
          ["Active Subscribers",activeCount,"success"],
          ["Total Revenue","₹"+totalRevenue,"whitetext-dark"],
          ["Renewal Rate",renewalRate + "%","secondary"],
          ["Avg Revenue/User","₹"+averageRevenue,"info"],
          ["Pending Payments",pendingPayments,"warning text-dark"],
          ["Overdue Payments",overduePayments,"danger"]
        ].map(([title,value,color])=>(
          <div className="col-12 col-sm-6 col-lg-2" key={title}>
            <div className={`card bg-${color} h-100`}>
              <div className="card-body">
               <h6
  className="text-uppercase text-muted fw-semibold"
  style={{
    fontSize: "12px",
    letterSpacing: "1px"
  }}
>
  {title}
</h6>
                <div className="d-flex justify-content-between align-items-center">

 <h2
  className="fw-bold mt-2 mb-2"
  style={{ fontSize: "32px" }}
>
  {value}
</h2>

  

</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-body">
              <h5>Plan Distribution</h5>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                <Pie
  data={planData}
  dataKey="value"
  nameKey="name"
  cx="50%"
  cy="50%"
  outerRadius={110}
  innerRadius={55}
  paddingAngle={4}
  label={({ name, percent }) =>
    `${name} ${(percent * 100).toFixed(0)}%`
  }
>
                    {planData.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
                  </Pie>
                 <Tooltip
  formatter={(value) => [`₹${value}`, "Revenue"]}
/>
                  <Legend/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-body">
              <h5>Subscription Status</h5>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="status"/>
                  <YAxis/>
                  <Tooltip/>
                  <Legend/>
                <Bar
  dataKey="count"
  fill="#0d6efd"
  radius={[10, 10, 0, 0]}
  barSize={50}
/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
             <h5 className="fw-bold mb-3">
  Revenue by Subscription Plan
</h5>

<p className="text-muted mb-4">
  Monthly revenue generated from each subscription plan.
</p>
              <ResponsiveContainer width="100%" height={320}>
              <BarChart
  data={revenueData}
  margin={{
    top: 20,
    right: 30,
    left: 20,
    bottom: 5
  }}
>
                  <CartesianGrid
  strokeDasharray="5 5"
  vertical={false}
/>
                  <XAxis dataKey="plan"/>
                  <YAxis/>
                  <Tooltip/>
                  <Legend/>
                  <Bar dataKey="revenue" fill="#198754"/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <div className="card-body">

  <h5 className="fw-bold mb-4">
    📈 Business Insights
  </h5>

  <div className="mb-3">
    <strong>👥 Subscriber Base</strong>
    <p className="text-muted mb-0">
      {totalSubscribers} total subscribers are currently registered.
    </p>
  </div>

  <div className="mb-3">
    <strong>💰 Revenue Performance</strong>
    <p className="text-muted mb-0">
      Average monthly revenue per subscriber is ₹{averageRevenue}.
    </p>
  </div>

  <div className="mb-3">
    <strong>🔄 Renewal Health</strong>
    <p className="text-muted mb-0">
      Renewal success rate is {renewalRate}%.
    </p>
  </div>

  <div className="mb-3">
    <strong>⚠️ Payment Health</strong>
    <p className="text-muted mb-0">
      {pendingPayments} pending and {overduePayments} overdue payments require attention.
    </p>
  </div>

</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">👥 Total Subscribers: {totalSubscribers}</li>
                <li className="list-group-item">🟢 Renewal Rate: {renewalRate}%</li>
                <li className="list-group-item">💰 Avg Revenue/User: ₹{averageRevenue}</li>
                <li className="list-group-item">⚠️ Pending Payments: {pendingPayments}</li>
                <li className="list-group-item">🔴 Overdue Payments: {overduePayments}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
}

export default Analytics;

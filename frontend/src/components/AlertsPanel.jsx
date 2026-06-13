function AlertsPanel({ subscriptions }) {

  const trialCount =
    subscriptions.filter(
      (s) =>
        s.plan?.toLowerCase() === "trial"
    ).length;

  const expiredCount =
    subscriptions.filter(
      (s) =>
        s.status?.toLowerCase() === "expired"
    ).length;

  const activeCount =
    subscriptions.filter(
      (s) =>
        s.status?.toLowerCase() === "active"
    ).length;

  const pendingPayments =
    subscriptions.filter(
      (s) =>
        s.payment_status?.toLowerCase() ===
        "pending"
    ).length;

  const overduePayments =
    subscriptions.filter(
      (s) =>
        s.payment_status?.toLowerCase() ===
        "overdue"
    ).length;

  const today = new Date();

  const expiringSoon =
    subscriptions.filter((s) => {

      if (!s.end_date) return false;

      const endDate =
        new Date(s.end_date);

      const diffTime =
        endDate - today;

      const diffDays =
        Math.ceil(
          diffTime /
          (1000 * 60 * 60 * 24)
        );

      return (
        diffDays >= 0 &&
        diffDays <= 7
      );

    }).length;

  

    return (

  <div className="card mb-4">

    <div className="card-body">

      <h4 className="mb-4">
        Alerts & Notifications
      </h4>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "15px"
        }}
      >

        <div
          className="alert-card"
          style={{
            borderLeft:
              "5px solid #ffc107"
          }}
        >
          <h6>
            ⚠ Trial Accounts
          </h6>

          <h2>
            {trialCount}
          </h2>
        </div>

        <div
          className="alert-card"
          style={{
            borderLeft:
              "5px solid #dc3545"
          }}
        >
          <h6>
            🚨 Expired
          </h6>

          <h2>
            {expiredCount}
          </h2>
        </div>

        <div
          className="alert-card"
          style={{
            borderLeft:
              "5px solid #fd7e14"
          }}
        >
          <h6>
            💳 Pending Payments
          </h6>

          <h2>
            {pendingPayments}
          </h2>
        </div>

        <div
          className="alert-card"
          style={{
            borderLeft:
              "5px solid #0dcaf0"
          }}
        >
          <h6>
            📅 Renewals Soon
          </h6>

          <h2>
            {expiringSoon}
          </h2>
        </div>

      </div>

      <hr />

      <h5>
        Upcoming Renewals
      </h5>

      {

        subscriptions

          .filter((s) => {

            if (!s.end_date)
              return false;

            const today =
              new Date();

            const endDate =
              new Date(s.end_date);

            const diffDays =
              Math.ceil(

                (endDate - today) /

                (1000 * 60 * 60 * 24)

              );

            return (
              diffDays >= 0 &&
              diffDays <= 7
            );

          })

          .map((s) => (

            <div
              key={s.id}
              className="mb-2"
            >

              🔔

              <strong>
                {" "}
                {s.subscriber_name}
              </strong>

              {" "}({s.plan})

              expires on

              {" "}

              {s.end_date}

            </div>

          ))

      }

    </div>

  </div>

);
};
export default AlertsPanel;
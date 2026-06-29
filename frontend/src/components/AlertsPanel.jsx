
import {
  FaExclamationTriangle,
  FaTimesCircle,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaUsers,
  FaBell
} from "react-icons/fa";

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
  <div className="card mb-4 shadow-sm border-0">
    <div className="card-body">

      <h4 className="mb-4">
        🔔 Alerts & Notifications
      </h4>

      <div className="row text-center g-3">

        <div className="col-md-3">
          <div className="p-3 bg-warning bg-opacity-10 rounded">
            <FaExclamationTriangle
              size={22}
              color="#ffc107"
            />
            <h5 className="mt-2 mb-1">
              {trialCount}
            </h5>
            <small>Trial Accounts</small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="p-3 bg-danger bg-opacity-10 rounded">
            <FaTimesCircle
              size={22}
              color="#dc3545"
            />
            <h5 className="mt-2 mb-1">
              {expiredCount}
            </h5>
            <small>Expired</small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="p-3 bg-warning bg-opacity-10 rounded">
            <FaMoneyBillWave
              size={22}
              color="#fd7e14"
            />
            <h5 className="mt-2 mb-1">
              {pendingPayments}
            </h5>
            <small>Pending Payments</small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="p-3 bg-info bg-opacity-10 rounded">
            <FaCalendarAlt
              size={22}
              color="#0dcaf0"
            />
            <h5 className="mt-2 mb-1">
              {expiringSoon}
            </h5>
            <small>Renewals Soon</small>
          </div>
        </div>

      </div>

      <hr />

      <h5 className="mb-3">
        <FaBell className="me-2" />
        Upcoming Renewals
      </h5>

      {subscriptions
        .filter((s) => {
          if (!s.end_date) return false;

          const endDate = new Date(s.end_date);

          const diffDays = Math.ceil(
            (endDate - today) /
              (1000 * 60 * 60 * 24)
          );

          return diffDays >= 0 && diffDays <= 7;
        })
        .map((s) => (
          <div
            key={s.id}
            className="d-flex justify-content-between align-items-center p-2 mb-2 border rounded"
          >
            <div>
              <strong>
                {s.subscriber_name}
              </strong>
              <br />
              <small>
                {s.plan}
              </small>
            </div>

            <span className="badge bg-primary">
              {s.end_date}
            </span>
          </div>
        ))}

      {expiringSoon === 0 && (
        <div className="text-center text-muted py-3">
          🎉 No renewals this week
        </div>
      )}

    </div>
  </div>
);
};
export default AlertsPanel;
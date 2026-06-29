import {
  FaUser,
  FaCrown,
  FaBuilding
} from "react-icons/fa";

function AccessOverview({ subscriptions }) {
  const basic =
    subscriptions.filter(
      (s) => s.access_level === "Basic"
    ).length;

  const premium =
    subscriptions.filter(
      (s) => s.access_level === "Premium"
    ).length;

  const enterprise =
    subscriptions.filter(
      (s) => s.access_level === "Enterprise"
    ).length;

  const total =
    basic + premium + enterprise;

  const basicPercent =
    total ? ((basic / total) * 100).toFixed(1) : 0;

  const premiumPercent =
    total ? ((premium / total) * 100).toFixed(1) : 0;

  const enterprisePercent =
    total
      ? ((enterprise / total) * 100).toFixed(1)
      : 0;

  return (
  <div className="card mb-4 shadow-sm border-0">
    <div className="card-body">

      <h4 className="mb-4">
        📊 Access Overview
      </h4>

      <div className="mb-4">

        <div className="d-flex justify-content-between">
          <span>
            <FaUser className="me-2 text-primary" />
            Basic Access
          </span>
          <strong>{basic}</strong>
        </div>

        <div className="progress mt-2">
          <div
            className="progress-bar bg-primary"
            style={{
              width: `${basicPercent}%`
            }}
          >
            {basicPercent}%
          </div>
        </div>

      </div>

      <div className="mb-4">

        <div className="d-flex justify-content-between">
          <span>
            <FaCrown className="me-2 text-warning" />
            Premium Access
          </span>
          <strong>{premium}</strong>
        </div>

        <div className="progress mt-2">
          <div
            className="progress-bar bg-warning"
            style={{
              width: `${premiumPercent}%`
            }}
          >
            {premiumPercent}%
          </div>
        </div>

      </div>

      <div>

        <div className="d-flex justify-content-between">
          <span>
            <FaBuilding className="me-2 text-success" />
            Enterprise Access
          </span>
          <strong>{enterprise}</strong>
        </div>

        <div className="progress mt-2">
          <div
            className="progress-bar bg-success"
            style={{
              width: `${enterprisePercent}%`
            }}
          >
            {enterprisePercent}%
          </div>
        </div>

      </div>

    </div>
  </div>
);
}

export default AccessOverview;
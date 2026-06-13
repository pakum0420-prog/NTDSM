

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
    total ? (basic / total) * 100 : 0;

  const premiumPercent =
    total ? (premium / total) * 100 : 0;

  const enterprisePercent =
    total ? (enterprise / total) * 100 : 0;

  return (

    <div className="card mb-4">

      <div className="card-body">

        <h4 className="mb-4">
          Access Overview
        </h4>

        <div className="access-item">

          <div className="access-header">

            <span>
              🔹 Basic Access
            </span>

            <strong>
              {basic}
            </strong>

          </div>

          <div className="progress">

            <div
              className="progress-bar bg-primary"
              style={{
                width:
                  `${basicPercent}%`
              }}
            />

          </div>

        </div>

        <div className="access-item">

          <div className="access-header">

            <span>
              ⭐ Premium Access
            </span>

            <strong>
              {premium}
            </strong>

          </div>

          <div className="progress">

            <div
              className="progress-bar bg-warning"
              style={{
                width:
                  `${premiumPercent}%`
              }}
            />

          </div>

        </div>

        <div className="access-item">

          <div className="access-header">

            <span>
              🏢 Enterprise Access
            </span>

            <strong>
              {enterprise}
            </strong>

          </div>

          <div className="progress">

            <div
              className="progress-bar bg-success"
              style={{
                width:
                  `${enterprisePercent}%`
              }}
            />

          </div>

        </div>

      </div>

    </div>

  );

}

export default AccessOverview;
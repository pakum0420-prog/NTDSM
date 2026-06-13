import Footer from "../components/Footer";

function PremiumContent() {

  const userPlan =
    localStorage.getItem(
      "userPlan"
    ) || "Basic";

  if (
    userPlan !== "Premium" &&
    userPlan !== "Enterprise"
  ) {

    return (

      <div className="container mt-5">

        <div className="card shadow">

          <div className="card-body text-center">

            <h1>
              🔒 Access Denied
            </h1>

            <p className="mt-3">

              This content is available
              only for Premium and
              Enterprise subscribers.

            </p>

            <h4
              className="text-danger"
            >
              Current Plan:
              {" "}
              {userPlan}
            </h4>

            <button
              className="btn btn-warning mt-3"
            >
              Upgrade Plan
            </button>

          </div>

        </div>

        <Footer />

      </div>

    );

  }

  return (

    <div>

      <h1>
        Premium Content
      </h1>

      <div className="card mt-4">

        <div className="card-body">

          <ul>

            <li>
              ✅ Premium News Articles
            </li>

            <li>
              ✅ Market Research Reports
            </li>

            <li>
              ✅ Editorial Content
            </li>

            <li>
              ✅ Enterprise Reports
            </li>

            <li>
              ✅ Premium Analytics
            </li>

          </ul>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default PremiumContent;
import Footer from "../components/Footer";

function Notifications() {

  return (

    <div>

      <h1 className="mb-4">
        Notifications
      </h1>

      <div className="alert alert-warning">

        🔔 Your subscription
        renews in 5 days.

      </div>

      <div className="alert alert-success">

        ✅ Last payment was
        successful.

      </div>

      <div className="alert alert-info">

        📊 New Premium Report
        available.

      </div>

      <div className="alert alert-primary">

        🚀 Enterprise plan
        now available.

      </div>

      <Footer />

    </div>

  );

}

export default Notifications;
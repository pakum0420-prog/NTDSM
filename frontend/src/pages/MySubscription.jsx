import Footer from "../components/Footer";

function MySubscription() {

  return (

    <div>

      <h1>My Subscription</h1>

      <div className="card mt-4">

        <div className="card-body">

          <p><strong>Plan:</strong> Premium</p>

          <p><strong>Access Level:</strong> Premium</p>

          <p><strong>Access Type:</strong> Yearly</p>

          <p><strong>Status:</strong> Active</p>

          <p><strong>Renewal Date:</strong> 2026-12-31</p>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default MySubscription;
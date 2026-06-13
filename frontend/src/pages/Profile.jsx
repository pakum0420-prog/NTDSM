import Footer from "../components/Footer";

function Profile() {

  return (

    <div>

      <h1 className="mb-4">
        My Profile
      </h1>

      <div className="card shadow">

        <div className="card-body">

          <div className="text-center mb-4">

            <img
              src="https://via.placeholder.com/120"
              alt="Profile"
              className="rounded-circle"
            />

            <h3 className="mt-3">
              Demo User
            </h3>

            <p>
              Premium Subscriber
            </p>

          </div>

          <div className="row">

            <div className="col-md-6">

              <p>
                <strong>Name:</strong>
                {" "}
                Demo User
              </p>

              <p>
                <strong>Email:</strong>
                {" "}
                user@test.com
              </p>

            </div>

            <div className="col-md-6">

              <p>
                <strong>Phone:</strong>
                {" "}
                9876543210
              </p>

              <p>
                <strong>Plan:</strong>
                {" "}
                Premium
              </p>

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default Profile;
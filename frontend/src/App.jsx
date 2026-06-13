import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Subscriptions from "./pages/Subscriptions";
import Payments from "./pages/Payments";
import SubscriptionDetails from "./pages/SubscriptionDetails";
import UserDashboard from "./pages/UserDashboard";
import MySubscription from "./pages/MySubscription";
import PremiumContent from "./pages/PremiumContent";

import AdminLogin from "./pages/AdminLogin";
import UserLogin from "./pages/UserLogin";
import PortalSelect from "./pages/PortalSelect";

import AdminSidebar from "./components/AdminSidebar";
import UserSidebar from "./components/UserSidebar";

const AdminRoute = ({ children }) => {

  const role =
    localStorage.getItem("role");

  return role === "admin"
    ? children
    : <Navigate to="/" />;

};

const UserRoute = ({ children }) => {

  const role =
    localStorage.getItem("role");

  return role === "user"
    ? children
    : <Navigate to="/" />;

};

function Layout() {

  const location = useLocation();

  const showSidebar =
    location.pathname !== "/" &&
    location.pathname !== "/login-admin" &&
    location.pathname !== "/login-user";

  const role =
    localStorage.getItem("role");

  return (

    <div
      style={{
        display: "flex"
      }}
    >

      {showSidebar && (
        role === "user"
          ? <UserSidebar />
          : <AdminSidebar />
      )}

      <div
        style={{
          flex: 1,
          padding: showSidebar
            ? "20px"
            : "0",
         marginLeft:
  window.innerWidth > 768 &&
  showSidebar
    ? "260px"
    : "0"
        }}
      >

        <Routes>

          {/* Portal */}

          <Route
            path="/"
            element={<PortalSelect />}
          />

          {/* Login Pages */}

          <Route
            path="/login-admin"
            element={<AdminLogin />}
          />

          <Route
            path="/login-user"
            element={<UserLogin />}
          />

          {/* Admin Pages */}

          <Route
            path="/admin-dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/subscriptions"
            element={
              <AdminRoute>
                <Subscriptions />
              </AdminRoute>
            }
          />

           <Route
  path="/subscription-details"
  element={
    <AdminRoute>
      <SubscriptionDetails />
    </AdminRoute>
  }
/>

          <Route
            path="/payments"
            element={
              <AdminRoute>
                <Payments />
              </AdminRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <AdminRoute>
                <Analytics />
              </AdminRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <AdminRoute>
                <Reports />
              </AdminRoute>
            }
          />

          {/* User Pages */}

          <Route
            path="/user-dashboard"
            element={
              <UserRoute>
                <UserDashboard />
              </UserRoute>
            }
          />

          <Route
            path="/my-subscription"
            element={
              <UserRoute>
                <MySubscription />
              </UserRoute>
            }
          />

          <Route
            path="/premium-content"
            element={
              <UserRoute>
                <PremiumContent />
              </UserRoute>
            }
          />

        </Routes>

      </div>

    </div>

  );

}

function App() {

  return (

    <BrowserRouter>

      <Layout />

    </BrowserRouter>

  );

}

export default App;
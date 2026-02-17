import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  const goTo =
    !isAuthenticated ? "/login" :
    user.role === "patient" ? "/patient" :
    user.role === "doctor" ? "/doctor" :
    "/admin";

  return (
    <div className="card">
      <h1>Hospital Management System</h1>
      <p className="muted">
        Frontend-first UI: Registration, Secure Login, Role-based dashboards, Appointment booking (mocked).
      </p>

      <div className="grid">
        <div className="panel">
          <h3>Key Features</h3>
          <ul>
            <li>Patient Registration & Profile</li>
            <li>Appointment Booking & Scheduling</li>
            <li>Doctor Dashboard & Patient Records (placeholder)</li>
            <li>Billing (placeholder)</li>
            <li>Admin Control Panel (Users & Roles)</li>
          </ul>
        </div>

        <div className="panel">
          <h3>Demo Accounts</h3>
          <div className="mono">
            <div><b>Admin</b>: admin@hms.com / admin123</div>
            <div><b>Doctor</b>: doctor@hms.com / doctor123</div>
            <div><b>Patient</b>: patient@hms.com / patient123</div>
          </div>
          <div className="spacer" />
          <Link className="btn" to={goTo}>
            {isAuthenticated ? "Go to Dashboard" : "Login to Continue"}
          </Link>
        </div>
      </div>
    </div>
  );
}

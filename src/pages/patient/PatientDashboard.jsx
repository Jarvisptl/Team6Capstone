import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function PatientDashboard() {
  const { user } = useAuth();

  return (
    <>
      <div className="card">
        <h2>Welcome, {user.name}</h2>
        <p className="muted">Manage appointments, profile, and billing.</p>
      </div>

      <div className="grid grid-3">
        <div className="stat-card">
          <div className="stat-left">
            <div className="stat-title">Appointments</div>
            <div className="stat-value">View</div>
            <div className="stat-sub">Check upcoming schedules</div>
          </div>
          <div className="stat-icon">📅</div>
        </div>

        <div className="stat-card">
          <div className="stat-left">
            <div className="stat-title">Book Visit</div>
            <div className="stat-value">New</div>
            <div className="stat-sub">Book an appointment</div>
          </div>
          <div className="stat-icon">➕</div>
        </div>

        <div className="stat-card">
          <div className="stat-left">
            <div className="stat-title">Billing</div>
            <div className="stat-value">Open</div>
            <div className="stat-sub">Invoices and payments</div>
          </div>
          <div className="stat-icon">💳</div>
        </div>
      </div>

      <div className="card">
        <h3>Quick Actions</h3>
        <div className="row">
          <Link className="btn" to="/patient/book">Book Appointment</Link>
          <Link className="btn btn-outline" to="/patient/appointments">My Appointments</Link>
          <Link className="btn btn-outline" to="/patient/profile">Profile</Link>
          <Link className="btn btn-outline" to="/billing">Billing</Link>
        </div>
      </div>
    </>
  );
}


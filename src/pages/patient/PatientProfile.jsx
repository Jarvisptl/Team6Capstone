import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function PatientProfile() {
  const { user } = useAuth();

  return (
    <div className="card">
      <h2>Patient Profile</h2>
      <div className="panel">
        <div><b>Name:</b> {user.name}</div>
        <div><b>Email:</b> {user.email}</div>
        <div><b>Role:</b> {user.role}</div>
      </div>

      <div className="panel">
        <h3>Medical Records</h3>
        <p className="muted">Sprint 0 placeholder. Later: show visits, prescriptions, lab reports.</p>
      </div>
    </div>
  );
}

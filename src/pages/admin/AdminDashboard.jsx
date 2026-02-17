import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="card">
      <h2>Admin Control Panel</h2>
      <p className="muted">Manage users, roles, and system modules.</p>

      <div className="row">
        <Link className="btn" to="/admin/users">Users Management</Link>
        <Link className="btn btn-outline" to="/billing">Billing Module</Link>
      </div>

      <div className="panel">
        <h3>Modules</h3>
        <ul>
          <li>Patient & User Management</li>
          <li>Appointments & Doctor Management</li>
          <li>Billing & Medical Records</li>
        </ul>
      </div>
    </div>
  );
}

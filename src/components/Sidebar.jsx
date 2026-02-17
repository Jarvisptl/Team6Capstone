import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Sidebar() {
  const { user, logout } = useAuth();

  const linksByRole = {
    patient: [
      { to: "/patient", label: "Dashboard" },
      { to: "/patient/book", label: "Book Appointment" },
      { to: "/patient/appointments", label: "My Appointments" },
      { to: "/patient/profile", label: "Profile" },
      { to: "/billing", label: "Billing" },
    ],
    doctor: [
      { to: "/doctor", label: "Dashboard" },
      { to: "/doctor/records", label: "Patient Records" },
    ],
    admin: [
      { to: "/admin", label: "Admin Dashboard" },
      { to: "/admin/users", label: "Users Management" },
      { to: "/billing", label: "Billing" },
    ],
  };

  const links = user ? linksByRole[user.role] || [] : [];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="logo">H</div>
        <div>
          HMS Portal <div className="muted" style={{ color: "rgba(255,255,255,.75)", fontSize: 12 }}>Capstone</div>
        </div>
      </div>

      {user && (
        <>
          <div className="sidebar-section">MENU</div>
          <nav className="sidebar-links">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? "active" : "")}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="sidebar-footer">
            <span className="pill">
              {user.role.toUpperCase()} • {user.name}
            </span>
            <button className="btn btn-outline" onClick={logout}>Logout</button>
          </div>
        </>
      )}

      {!user && (
        <>
          <div className="sidebar-section">WELCOME</div>
          <div style={{ padding: "10px", color: "rgba(255,255,255,.85)", fontSize: 14 }}>
            Please login to access the portal.
          </div>
        </>
      )}
    </aside>
  );
}

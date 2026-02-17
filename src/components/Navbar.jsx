import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">HMS</Link>

        <nav className="nav-links">
          <NavLink to="/" className={({isActive}) => (isActive ? "active" : "")}>Home</NavLink>

          {!isAuthenticated && (
            <>
              <NavLink to="/login" className={({isActive}) => (isActive ? "active" : "")}>Login</NavLink>
              <NavLink to="/register" className={({isActive}) => (isActive ? "active" : "")}>Register</NavLink>
            </>
          )}

          {isAuthenticated && user.role === "patient" && (
            <>
              <NavLink to="/patient" className={({isActive}) => (isActive ? "active" : "")}>Dashboard</NavLink>
              <NavLink to="/patient/book" className={({isActive}) => (isActive ? "active" : "")}>Book</NavLink>
              <NavLink to="/patient/appointments" className={({isActive}) => (isActive ? "active" : "")}>My Appointments</NavLink>
              <NavLink to="/billing" className={({isActive}) => (isActive ? "active" : "")}>Billing</NavLink>
            </>
          )}

          {isAuthenticated && user.role === "doctor" && (
            <>
              <NavLink to="/doctor" className={({isActive}) => (isActive ? "active" : "")}>Dashboard</NavLink>
              <NavLink to="/doctor/records" className={({isActive}) => (isActive ? "active" : "")}>Records</NavLink>
            </>
          )}

          {isAuthenticated && user.role === "admin" && (
            <>
              <NavLink to="/admin" className={({isActive}) => (isActive ? "active" : "")}>Admin</NavLink>
              <NavLink to="/admin/users" className={({isActive}) => (isActive ? "active" : "")}>Users</NavLink>
              <NavLink to="/billing" className={({isActive}) => (isActive ? "active" : "")}>Billing</NavLink>
            </>
          )}
        </nav>

        <div className="nav-right">
          {isAuthenticated ? (
            <>
              <span className="pill">{user.role.toUpperCase()}</span>
              <span className="muted">{user.name}</span>
              <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <span className="muted">Hospital Management System</span>
          )}
        </div>
      </div>
    </header>
  );
}

import React from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Topbar({ title }) {
  const { user } = useAuth();

  return (
    <div className="topbar">
      <h2>{title || "Hospital Management System"}</h2>
      <div className="topbar-right">
        {user && <span className="pill" style={{ background: "#eef6ff", color: "#0f4c81" }}>{user.role.toUpperCase()}</span>}
        {user && <span className="muted">{user.email}</span>}
      </div>
    </div>
  );
}

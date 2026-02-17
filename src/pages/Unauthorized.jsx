import React from "react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="card">
      <h2>Unauthorized</h2>
      <p className="muted">You don’t have access to that page.</p>
      <Link className="btn" to="/">Go Home</Link>
    </div>
  );
}

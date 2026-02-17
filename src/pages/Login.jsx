import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("patient@hms.com");
  const [password, setPassword] = useState("patient123");
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const u = await login(email, password);

      const redirect =
        location.state?.from ||
        (u.role === "patient" ? "/patient" : u.role === "doctor" ? "/doctor" : "/admin");

      navigate(redirect, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    }
  }

  return (
    <div className="card narrow">
      <h2>Login</h2>
      <p className="muted">Role-based authentication (frontend-first).</p>

      {error && <div className="alert">{error}</div>}

      <form onSubmit={onSubmit} className="form">
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </label>

        <label>
          Password
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        </label>

        <button className="btn" type="submit">Login</button>
      </form>

      <div className="muted small">
        New patient? <Link to="/register">Create account</Link>
      </div>
    </div>
  );
}

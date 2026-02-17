import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await register({ name, email, password });
      navigate("/patient", { replace: true });
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  }

  return (
    <div className="card narrow">
      <h2>Patient Registration</h2>
      <p className="muted">Creates a Patient role account (mocked).</p>

      {error && <div className="alert">{error}</div>}

      <form onSubmit={onSubmit} className="form">
        <label>
          Full Name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>

        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </label>

        <label>
          Password
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required minLength={6} />
        </label>

        <button className="btn" type="submit">Create Account</button>
      </form>

      <div className="muted small">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import * as api from "../../services/mockApi.js";

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function load() {
    const data = await api.listUsers();
    setUsers(data);
  }

  useEffect(() => { load(); }, []);

  async function changeRole(userId, role) {
    setMsg(""); setErr("");
    try {
      await api.setUserRole(userId, role);
      setMsg("✅ Role updated");
      await load();
    } catch (e) {
      setErr(e.message || "Failed");
    }
  }

  return (
    <div className="card">
      <h2>Users Management</h2>
      <p className="muted">Change user roles (mock).</p>

      {msg && <div className="success">{msg}</div>}
      {err && <div className="alert">{err}</div>}

      <div className="table">
        <div className="thead">
          <div>Name</div>
          <div>Email</div>
          <div>Role</div>
          <div>Action</div>
        </div>

        {users.map(u => (
          <div className="trow" key={u.id}>
            <div>{u.name}</div>
            <div className="muted">{u.email}</div>
            <div><span className="pill">{u.role}</span></div>
            <div className="row">
              <button className="btn btn-outline" onClick={() => changeRole(u.id, "patient")}>Patient</button>
              <button className="btn btn-outline" onClick={() => changeRole(u.id, "doctor")}>Doctor</button>
              <button className="btn btn-outline" onClick={() => changeRole(u.id, "admin")}>Admin</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

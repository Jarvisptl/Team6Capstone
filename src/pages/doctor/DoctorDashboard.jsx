import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import * as api from "../../services/mockApi.js";
import { Link } from "react-router-dom";

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [appts, setAppts] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await api.listAppointmentsByDoctor(user.id);
      setAppts(data);
    })();
  }, [user.id]);

  return (
    <>
      <div className="card">
        <h2>Welcome, {user.name}</h2>
        <p className="muted">Track appointments and patient records.</p>
      </div>

      <div className="grid grid-3">
        <div className="stat-card">
          <div className="stat-left">
            <div className="stat-title">Today’s Appointments</div>
            <div className="stat-value">{appts.length}</div>
            <div className="stat-sub">Total assigned</div>
          </div>
          <div className="stat-icon">🩺</div>
        </div>

        <div className="stat-card">
          <div className="stat-left">
            <div className="stat-title">Patient Records</div>
            <div className="stat-value">Open</div>
            <div className="stat-sub">View history & notes</div>
          </div>
          <div className="stat-icon">📄</div>
        </div>

        <div className="stat-card">
          <div className="stat-left">
            <div className="stat-title">Reports</div>
            <div className="stat-value">Soon</div>
            <div className="stat-sub">Sprint 1 module</div>
          </div>
          <div className="stat-icon">📊</div>
        </div>
      </div>

      <div className="card">
        <div className="row">
          <Link className="btn" to="/doctor/records">Open Patient Records</Link>
        </div>

        <h3 style={{ marginTop: 16 }}>Appointments</h3>

        {appts.length === 0 ? (
          <div className="muted">No appointments assigned yet.</div>
        ) : (
          <div className="table">
            <div className="thead">
              <div>Date</div>
              <div>Time</div>
              <div>Patient</div>
              <div>Reason</div>
            </div>
            {appts.map((a) => (
              <div className="trow" key={a.id}>
                <div>{a.date}</div>
                <div>{a.time}</div>
                <div>{a.patientName}</div>
                <div className="muted">{a.reason}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

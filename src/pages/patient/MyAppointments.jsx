import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import * as api from "../../services/mockApi.js";

export default function MyAppointments() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await api.listAppointmentsByPatient(user.id);
      setItems(data);
    })();
  }, [user.id]);

  return (
    <div className="card">
      <h2>My Appointments</h2>
      <p className="muted">All your scheduled appointments.</p>

      {items.length === 0 ? (
        <div className="panel">No appointments yet.</div>
      ) : (
        <div className="table">
          <div className="thead">
            <div>Date</div>
            <div>Time</div>
            <div>Doctor</div>
            <div>Status</div>
          </div>

          {items.map(a => (
            <div className="trow" key={a.id}>
              <div>{a.date}</div>
              <div>{a.time}</div>
              <div>{a.doctorName}</div>
              <div><span className="pill">{a.status}</span></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

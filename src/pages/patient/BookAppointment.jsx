import React, { useMemo, useState } from "react";
import { doctors } from "../../data/doctors.js";
import { useAuth } from "../../context/AuthContext.jsx";
import * as api from "../../services/mockApi.js";

export default function BookAppointment() {
  const { user } = useAuth();

  const [doctorId, setDoctorId] = useState(doctors[0]?.id || "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const doctor = useMemo(() => doctors.find(d => d.id === doctorId), [doctorId]);

  async function onSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      if (!date || !time) throw new Error("Please select date and time");

      await api.createAppointment({
        patientId: user.id,
        patientName: user.name,
        doctorId,
        doctorName: doctor?.name || "Doctor",
        date,
        time,
        reason: reason.trim() || "General consultation",
      });

      setMessage("✅ Appointment confirmed!");
      setDate("");
      setTime("");
      setReason("");
    } catch (err) {
      setError(err.message || "Failed to book appointment");
    }
  }

  return (
    <div className="card">
      <h2>Book Appointment</h2>
      <p className="muted">Select doctor, date, and time to confirm an appointment.</p>

      {message && <div className="success">{message}</div>}
      {error && <div className="alert">{error}</div>}

      <form className="form" onSubmit={onSubmit}>
        <label>
          Choose Doctor
          <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)}>
            {doctors.map(d => (
              <option key={d.id} value={d.id}>
                {d.name} — {d.specialty}
              </option>
            ))}
          </select>
        </label>

        <div className="grid-2">
          <label>
            Date
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <label>
            Time
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </label>
        </div>

        <label>
          Reason (optional)
          <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g., fever, follow-up, checkup" />
        </label>

        <button className="btn" type="submit">Confirm Appointment</button>
      </form>
    </div>
  );
}

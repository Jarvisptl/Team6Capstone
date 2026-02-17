const LS_USERS = "hms_users";
const LS_SESSION = "hms_session_user";
const LS_APPOINTMENTS = "hms_appointments";

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function seedIfNeeded() {
  const users = JSON.parse(localStorage.getItem(LS_USERS) || "[]");

  if (users.length === 0) {
    const seeded = [
      { id: uid(), name: "Admin User", email: "admin@hms.com", password: "admin123", role: "admin" },
      { id: uid(), name: "Dr. Patel", email: "doctor@hms.com", password: "doctor123", role: "doctor" },
      { id: uid(), name: "Patient Demo", email: "patient@hms.com", password: "patient123", role: "patient" },
    ];
    localStorage.setItem(LS_USERS, JSON.stringify(seeded));
  }

  const appts = JSON.parse(localStorage.getItem(LS_APPOINTMENTS) || "[]");
  if (appts.length === 0) localStorage.setItem(LS_APPOINTMENTS, JSON.stringify([]));
}

seedIfNeeded();

export function getSessionUser() {
  return JSON.parse(localStorage.getItem(LS_SESSION) || "null");
}

export function logout() {
  localStorage.removeItem(LS_SESSION);
}

export async function login(email, password) {
  const users = JSON.parse(localStorage.getItem(LS_USERS) || "[]");
  const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!found) throw new Error("Invalid email or password");

  const sessionUser = { id: found.id, name: found.name, email: found.email, role: found.role };
  localStorage.setItem(LS_SESSION, JSON.stringify(sessionUser));
  return sessionUser;
}

export async function register({ name, email, password }) {
  const users = JSON.parse(localStorage.getItem(LS_USERS) || "[]");
  const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (exists) throw new Error("Email already registered");

  const newUser = { id: uid(), name, email, password, role: "patient" };
  users.push(newUser);
  localStorage.setItem(LS_USERS, JSON.stringify(users));

  const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
  localStorage.setItem(LS_SESSION, JSON.stringify(sessionUser));
  return sessionUser;
}

export async function listUsers() {
  const users = JSON.parse(localStorage.getItem(LS_USERS) || "[]");
  return users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role }));
}

export async function setUserRole(userId, role) {
  const users = JSON.parse(localStorage.getItem(LS_USERS) || "[]");
  const idx = users.findIndex(u => u.id === userId);
  if (idx === -1) throw new Error("User not found");
  users[idx].role = role;
  localStorage.setItem(LS_USERS, JSON.stringify(users));
  return true;
}

export async function createAppointment({ patientId, patientName, doctorId, doctorName, date, time, reason }) {
  const appts = JSON.parse(localStorage.getItem(LS_APPOINTMENTS) || "[]");
  const newAppt = {
    id: uid(),
    patientId,
    patientName,
    doctorId,
    doctorName,
    date,
    time,
    reason,
    status: "Confirmed",
    createdAt: new Date().toISOString(),
  };
  appts.push(newAppt);
  localStorage.setItem(LS_APPOINTMENTS, JSON.stringify(appts));
  return newAppt;
}

export async function listAppointmentsByPatient(patientId) {
  const appts = JSON.parse(localStorage.getItem(LS_APPOINTMENTS) || "[]");
  return appts.filter(a => a.patientId === patientId).sort((a,b) => (a.date+a.time).localeCompare(b.date+b.time));
}

export async function listAppointmentsByDoctor(doctorId) {
  const appts = JSON.parse(localStorage.getItem(LS_APPOINTMENTS) || "[]");
  return appts.filter(a => a.doctorId === doctorId).sort((a,b) => (a.date+a.time).localeCompare(b.date+b.time));
}

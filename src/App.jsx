import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";

import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";

import PatientDashboard from "./pages/patient/PatientDashboard.jsx";
import BookAppointment from "./pages/patient/BookAppointment.jsx";
import MyAppointments from "./pages/patient/MyAppointments.jsx";
import PatientProfile from "./pages/patient/PatientProfile.jsx";

import DoctorDashboard from "./pages/doctor/DoctorDashboard.jsx";
import PatientRecords from "./pages/doctor/PatientRecords.jsx";

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import UsersManagement from "./pages/admin/UsersManagement.jsx";

import BillingDashboard from "./pages/billing/BillingDashboard.jsx";

function TitleBar() {
  const location = useLocation();
  const { user } = useAuth();

  const path = location.pathname;
  let title = "Hospital Management System";

  if (!user) title = "Welcome";
  else if (path.startsWith("/patient")) title = "Patient Portal";
  else if (path.startsWith("/doctor")) title = "Doctor Portal";
  else if (path.startsWith("/admin")) title = "Admin Portal";
  else if (path.startsWith("/billing")) title = "Billing";

  return <Topbar title={title} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-shell">
          <Sidebar />

          <div className="main">
            <TitleBar />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Patient */}
                <Route
                  path="/patient"
                  element={
                    <ProtectedRoute allowedRoles={["patient"]}>
                      <PatientDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/patient/book"
                  element={
                    <ProtectedRoute allowedRoles={["patient"]}>
                      <BookAppointment />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/patient/appointments"
                  element={
                    <ProtectedRoute allowedRoles={["patient"]}>
                      <MyAppointments />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/patient/profile"
                  element={
                    <ProtectedRoute allowedRoles={["patient"]}>
                      <PatientProfile />
                    </ProtectedRoute>
                  }
                />

                {/* Doctor */}
                <Route
                  path="/doctor"
                  element={
                    <ProtectedRoute allowedRoles={["doctor"]}>
                      <DoctorDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/doctor/records"
                  element={
                    <ProtectedRoute allowedRoles={["doctor"]}>
                      <PatientRecords />
                    </ProtectedRoute>
                  }
                />

                {/* Admin */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <UsersManagement />
                    </ProtectedRoute>
                  }
                />

                {/* Billing */}
                <Route
                  path="/billing"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "patient"]}>
                      <BillingDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

import React from "react";

export default function BillingDashboard() {
  return (
    <div className="card">
      <h2>Billing & Payments</h2>
      <p className="muted">
        Sprint 0 placeholder. Later: invoices, payment status, receipt download, admin billing controls.
      </p>

      <div className="grid">
        <div className="panel">
          <h3>Invoices</h3>
          <div className="muted">No invoices yet (mock).</div>
        </div>
        <div className="panel">
          <h3>Payments</h3>
          <div className="muted">Integrate payment gateway / backend later.</div>
        </div>
      </div>
    </div>
  );
}

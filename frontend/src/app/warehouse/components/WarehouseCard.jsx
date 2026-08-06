"use client";

import Link from "next/link";

export default function WarehouseCard({ warehouse }) {
  const isMaintenance = warehouse.status === "Maintenance";

  return (
    <div className="warehouse-card">
      <div>
        <div className="warehouse-card-header">
          <div>
            <h2 className="warehouse-title">{warehouse.name}</h2>
            <div className="warehouse-location">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 21s-6-5.333-6-10a6 6 0 0 1 12 0c0 4.667-6 10-6 10z" />
                <circle cx="12" cy="11" r="2" />
              </svg>
              {warehouse.location}
            </div>
          </div>

          <span className={`badge-status ${isMaintenance ? "maintenance" : "active"}`}>
            <span className={`w-2 h-2 rounded-full ${isMaintenance ? "bg-amber-500" : "bg-emerald-500"}`}></span>
            {warehouse.status}
          </span>
        </div>

        <div className="warehouse-stats-grid">
          <div className="stat-box">
            <span className="stat-label">Total Products</span>
            <div className="stat-number">{warehouse.products.toLocaleString()}</div>
          </div>

          <div className="stat-box">
            <span className="stat-label">Total Stock</span>
            <div className="stat-number">{warehouse.stock.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="warehouse-card-actions">
        <Link href="/warehouse/stock" className="btn-card-action secondary">
          View Stock
        </Link>

        <Link href="/warehouse/transfer" className="btn-card-action primary">
          Stock Transfer
        </Link>
      </div>
    </div>
  );
}
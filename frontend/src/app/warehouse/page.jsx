"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import WarehouseCard from "./components/WarehouseCard";
import "./warehouse.css";

const warehousesData = [
  {
    id: 1,
    name: "Main Warehouse",
    location: "Head Office, Central District",
    products: 1450,
    stock: 8540,
    status: "Active",
  },
  {
    id: 2,
    name: "Branch Warehouse",
    location: "Kozhikode Regional Hub",
    products: 980,
    stock: 5240,
    status: "Active",
  },
  {
    id: 3,
    name: "Backup Warehouse",
    location: "Palakkad Facility Center",
    products: 610,
    stock: 3180,
    status: "Maintenance",
  },
];

export default function WarehousePage() {
  const [activeTab, setActiveTab] = useState("Warehouse Overview");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredWarehouses = useMemo(() => {
    return warehousesData.filter((warehouse) => {
      const matchesSearch =
        warehouse.name.toLowerCase().includes(search.toLowerCase()) ||
        warehouse.location.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        warehouse.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalProductsCount = warehousesData.reduce((acc, curr) => acc + curr.products, 0);
  const totalStockCount = warehousesData.reduce((acc, curr) => acc + curr.stock, 0);

  return (
    <div className="warehouse-page-wrapper">
      {/* Top Module Sub-Navigation */}
      <nav className="warehouse-nav-tabs">
        <Link href="/warehouse" className="nav-tab-item active">
          Warehouse Overview
        </Link>
        <Link href="/warehouse/stock" className="nav-tab-item">
          Stock Inventory
        </Link>
        <Link href="/warehouse/transfer" className="nav-tab-item">
          Stock Transfer
        </Link>
        <button
          className={`nav-tab-item ${activeTab === "Reports" ? "active" : ""}`}
          onClick={() => setActiveTab("Reports")}
        >
          Reports & Analytics
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="warehouse-main-content">
        {/* Action Toolbar */}
        <div className="warehouse-toolbar">
          <button className="btn-add-action" onClick={() => alert("Add New Warehouse Form Modal")}>
            Add New Warehouse <span>+</span>
          </button>

          <div className="toolbar-controls">
            <input
              type="text"
              placeholder="Search warehouses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input-pill"
            />
            <button className="btn-search-icon" title="Search">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-dropdown-pill"
            >
              <option value="All">Status</option>
              <option value="Active">Active</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
        </div>

        {/* Stats Quick Summary */}
        <div className="warehouse-stats-summary">
          <div className="stat-pill-card">
            <span className="stat-pill-label">Total Warehouses</span>
            <span className="stat-pill-value">{warehousesData.length}</span>
          </div>
          <div className="stat-pill-card">
            <span className="stat-pill-label">Active Locations</span>
            <span className="stat-pill-value" style={{ color: "#16a34a" }}>
              {warehousesData.filter(w => w.status === "Active").length}
            </span>
          </div>
          <div className="stat-pill-card">
            <span className="stat-pill-label">Unique Products</span>
            <span className="stat-pill-value">{totalProductsCount.toLocaleString()}</span>
          </div>
          <div className="stat-pill-card">
            <span className="stat-pill-label">Total In-Stock Units</span>
            <span className="stat-pill-value">{totalStockCount.toLocaleString()}</span>
          </div>
        </div>

        {/* Warehouse Cards Grid */}
        <div className="warehouse-cards-grid">
          {filteredWarehouses.map((warehouse) => (
            <WarehouseCard key={warehouse.id} warehouse={warehouse} />
          ))}
        </div>

        {/* Bottom Floating Pagination */}
        <div className="warehouse-pagination-wrapper">
          <div className="warehouse-pagination-pill">
            <button
              className="page-btn"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              &lt;
            </button>
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className={`page-btn ${currentPage === num ? "active" : ""}`}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            ))}
            <button
              className="page-btn"
              onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
            >
              &gt;
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
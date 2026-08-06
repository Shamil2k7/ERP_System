"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PurchaseTable from "./components/PurchaseTable";
import "./purchases.css";

const purchaseData = [
  {
    id: 1,
    purchaseNo: "144826",
    supplier: "Name Goes Here",
    totalProducts: 20,
    totalQty: 1200,
    total: 12000,
    phone: "+985 1256 48799",
    status: "Pending",
  },
  {
    id: 2,
    purchaseNo: "144826",
    supplier: "Name Goes Here",
    totalProducts: 20,
    totalQty: 1200,
    total: 12000,
    phone: "+985 1256 48799",
    status: "Delivered",
  },
  {
    id: 3,
    purchaseNo: "144826",
    supplier: "Name Goes Here",
    totalProducts: 20,
    totalQty: 1200,
    total: 12000,
    phone: "+985 1256 48799",
    status: "Delivered",
  },
  {
    id: 4,
    purchaseNo: "144826",
    supplier: "Name Goes Here",
    totalProducts: 20,
    totalQty: 1200,
    total: 12000,
    phone: "+985 1256 48799",
    status: "Delivered",
  },
  {
    id: 5,
    purchaseNo: "144826",
    supplier: "Name Goes Here",
    totalProducts: 20,
    totalQty: 1200,
    total: 12000,
    phone: "+985 1256 48799",
    status: "Pending",
  },
  {
    id: 6,
    purchaseNo: "144826",
    supplier: "Name Goes Here",
    totalProducts: 20,
    totalQty: 1200,
    total: 12000,
    phone: "+985 1256 48799",
    status: "Pending",
  },
  {
    id: 7,
    purchaseNo: "144826",
    supplier: "Name Goes Here",
    totalProducts: 20,
    totalQty: 1200,
    total: 12000,
    phone: "+985 1256 48799",
    status: "Pending",
  },
  {
    id: 8,
    purchaseNo: "144826",
    supplier: "Name Goes Here",
    totalProducts: 20,
    totalQty: 1200,
    total: 12000,
    phone: "+985 1256 48799",
    status: "Delivered",
  },
  {
    id: 9,
    purchaseNo: "144826",
    supplier: "Name Goes Here",
    totalProducts: 20,
    totalQty: 1200,
    total: 12000,
    phone: "+985 1256 48799",
    status: "Delivered",
  },
  {
    id: 10,
    purchaseNo: "144826",
    supplier: "Name Goes Here",
    totalProducts: 20,
    totalQty: 1200,
    total: 12000,
    phone: "+985 1256 48799",
    status: "Pending",
  },
];

export default function PurchasesPage() {
  const [activeTab, setActiveTab] = useState("Purchase Order Management");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPurchases = useMemo(() => {
    return purchaseData.filter((purchase) => {
      const matchesSearch =
        purchase.purchaseNo.toLowerCase().includes(search.toLowerCase()) ||
        purchase.supplier.toLowerCase().includes(search.toLowerCase()) ||
        purchase.phone.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        purchase.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="purchases-page-wrapper">
      {/* Top Module Sub-Navigation */}
      <nav className="purchases-nav-tabs">
        {[
          "Purchase Order Management",
          "Inventory Replenishment",
          "Supplier Management",
          "Returns and Refunds",
        ].map((tab) => (
          <button
            key={tab}
            className={`nav-tab-item ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Main Purchases Content Area */}
      <main className="purchases-main-content">
        {/* Action Toolbar */}
        <div className="purchases-toolbar">
          <Link href="/purchases/add" className="btn-add-order">
            Add New Order <span>+</span>
          </Link>

          <div className="toolbar-controls">
            <input
              type="text"
              placeholder="Search Orders..."
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
              <option value="Pending">Pending</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>

        {/* Purchase Table */}
        <PurchaseTable purchases={filteredPurchases} />

        {/* Bottom Floating Pagination */}
        <div className="purchases-pagination-wrapper">
          <div className="purchases-pagination-pill">
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
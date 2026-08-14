"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import axios from "axios";
import PurchaseTable from "./components/PurchaseTable";
import "./purchases.css";

const PAGE_SIZE = 10;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
});

export default function PurchasesPage() {
  const [activeTab, setActiveTab] = useState("Purchase Order Management");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get("/purchases");
      setPurchases(res.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load purchases. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Map backend shape -> table row shape
  const mappedPurchases = useMemo(() => {
    return purchases.map((p) => ({
      id: p.id,
      purchaseNo: p.purchaseNo,
      supplier: p.supplier?.name || "—",
      totalProducts: p.items?.length || 0,
      totalQty:
        p.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0,
      total: p.totalAmount,
      phone: p.supplier?.phone || "—",
      status: p.status,
    }));
  }, [purchases]);

  const filteredPurchases = useMemo(() => {
    return mappedPurchases.filter((purchase) => {
      const q = search.toLowerCase();
      const matchesSearch =
        purchase.purchaseNo?.toLowerCase().includes(q) ||
        purchase.supplier?.toLowerCase().includes(q) ||
        purchase.phone?.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "All" ||
        purchase.status?.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [mappedPurchases, search, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPurchases.length / PAGE_SIZE)
  );

  const paginatedPurchases = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredPurchases.slice(start, start + PAGE_SIZE);
  }, [filteredPurchases, currentPage]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
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
              <option value="PENDING">Pending</option>
              <option value="RECEIVED">Received</option>
              <option value="PARTIAL">Partial</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Purchase Table */}
        {loading ? (
          <div className="purchases-state-message">Loading purchases...</div>
        ) : error ? (
          <div className="purchases-state-message error">
            {error}{" "}
            <button className="btn-retry" onClick={fetchPurchases}>
              Retry
            </button>
          </div>
        ) : filteredPurchases.length === 0 ? (
          <div className="purchases-state-message">No purchases found.</div>
        ) : (
          <>
            <PurchaseTable purchases={paginatedPurchases} />

            {/* Bottom Floating Pagination */}
            <div className="purchases-pagination-wrapper">
              <div className="purchases-pagination-pill">
                <button
                  className="page-btn"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (num) => (
                    <button
                      key={num}
                      className={`page-btn ${currentPage === num ? "active" : ""}`}
                      onClick={() => setCurrentPage(num)}
                    >
                      {num}
                    </button>
                  )
                )}
                <button
                  className="page-btn"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
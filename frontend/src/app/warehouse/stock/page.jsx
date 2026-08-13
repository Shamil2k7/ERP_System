"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import StockTable from "../components/StockTable";
import { useAlert } from "@/context/AlertContext";
import "../warehouse.css";

const stockData = [
  {
    id: 1,
    sku: "PRD-001",
    product: "Dell Inspiron 15 3000",
    category: "Laptops",
    warehouse: "Main Warehouse",
    quantity: 40,
    reorder: 10,
  },
  {
    id: 2,
    sku: "PRD-002",
    product: "HP Laserjet Pro Printer",
    category: "Printers",
    warehouse: "Main Warehouse",
    quantity: 6,
    reorder: 8,
  },
  {
    id: 3,
    sku: "PRD-003",
    product: "Logitech MX Master 3S",
    category: "Accessories",
    warehouse: "Branch Warehouse",
    quantity: 120,
    reorder: 20,
  },
  {
    id: 4,
    sku: "PRD-004",
    product: "Keychron K2 Mechanical Keyboard",
    category: "Accessories",
    warehouse: "Backup Warehouse",
    quantity: 15,
    reorder: 15,
  },
  {
    id: 5,
    sku: "PRD-005",
    product: 'Samsung Odyssey 27" Monitor',
    category: "Monitors",
    warehouse: "Branch Warehouse",
    quantity: 4,
    reorder: 8,
  },
  {
    id: 6,
    sku: "PRD-006",
    product: "Apple MacBook Pro 14",
    category: "Laptops",
    warehouse: "Main Warehouse",
    quantity: 0,
    reorder: 5,
  },
  {
    id: 7,
    sku: "PRD-007",
    product: "Anker USB-C Multi Hub",
    category: "Accessories",
    warehouse: "Backup Warehouse",
    quantity: 85,
    reorder: 15,
  },
];

export default function WarehouseStockPage() {
  const { showWarning } = useAlert();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredStock = useMemo(() => {
    return stockData.filter((item) => {
      const matchesSearch =
        item.product.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase()) ||
        item.warehouse.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" || item.category === categoryFilter;

      let itemStatus = "In Stock";
      if (item.quantity === 0) itemStatus = "Out of Stock";
      else if (item.quantity <= item.reorder) itemStatus = "Low Stock";

      const matchesStatus =
        statusFilter === "All" || itemStatus.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [search, categoryFilter, statusFilter]);

  return (
    <div className="warehouse-page-wrapper">
      {/* Sub-Navigation */}
      <nav className="warehouse-nav-tabs">
        <Link href="/warehouse" className="nav-tab-item">
          Warehouse Overview
        </Link>
        <Link href="/warehouse/stock" className="nav-tab-item active">
          Stock Inventory
        </Link>
        <Link href="/warehouse/transfer" className="nav-tab-item">
          Stock Transfer
        </Link>
        <button className="nav-tab-item">
          Reports & Analytics
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="warehouse-main-content">
        {/* Action Toolbar */}
        <div className="warehouse-toolbar">
          <button className="btn-add-action" onClick={() => showWarning("Unsaved changes", "Add New Stock Item form module opening...")}>
            Add New Product <span>+</span>
          </button>

          <div className="toolbar-controls">
            <input
              type="text"
              placeholder="Search product, SKU, warehouse..."
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
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="status-dropdown-pill"
            >
              <option value="All">All Categories</option>
              <option value="Laptops">Laptops</option>
              <option value="Printers">Printers</option>
              <option value="Monitors">Monitors</option>
              <option value="Accessories">Accessories</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-dropdown-pill"
            >
              <option value="All">Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Stock Table */}
        <StockTable stock={filteredStock} />

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
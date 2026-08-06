"use client";

import Link from "next/link";

export default function PurchaseTable({ purchases = [] }) {
  return (
    <div className="purchases-table-container">
      <table className="purchases-table">
        <thead>
          <tr>
            <th>Purchase ID</th>
            <th>Total Products</th>
            <th>Total Quantity</th>
            <th>Total Amount</th>
            <th>Vendor Name</th>
            <th>Phone</th>
            <th>Status</th>
            <th style={{ textAlign: "right" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {purchases.length === 0 ? (
            <tr>
              <td colSpan={8} style={{ textAlign: "center", padding: "32px", color: "#71717a" }}>
                No Purchase Orders Found
              </td>
            </tr>
          ) : (
            purchases.map((item) => {
              const statusClass =
                item.status?.toLowerCase() === "delivered" || item.status?.toLowerCase() === "received"
                  ? "delivered"
                  : "pending";

              return (
                <tr key={item.id}>
                  <td className="purchase-id-cell">{item.purchaseNo || `144826`}</td>
                  <td>{item.totalProducts || 20}</td>
                  <td>{item.totalQty || 1200}</td>
                  <td className="purchase-amount-cell">
                    ${(item.total || 12000).toLocaleString()}
                  </td>
                  <td>{item.supplier || "Name Goes Here"}</td>
                  <td>{item.phone || "+985 1256 48799"}</td>
                  <td>
                    <span className={`badge-status ${statusClass}`}>
                      {item.status || "Pending"}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "8px", alignItems: "center" }}>
                      <Link
                        href={`/purchases/${item.id}`}
                        style={{ fontSize: "12px", color: "#52525b", textDecoration: "none" }}
                      >
                        View
                      </Link>
                      <button className="action-dots-btn" title="More Actions">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
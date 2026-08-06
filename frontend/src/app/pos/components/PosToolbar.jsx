"use client";
import pos from "../pos.css";

import { useState } from "react";
import { IconSearch, IconBarcode } from "./icons";

export default function PosToolbar({
  query,
  onQueryChange,
  onScan,
}) {
  const [mode, setMode] = useState("dashboard");
  const [scanOpen, setScanOpen] = useState(false);
  const [scanValue, setScanValue] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const submitScan = () => {
    if (scanValue.trim()) {
      onScan?.(scanValue.trim());
      setScanValue("");
    }
    setScanOpen(false);
  };

  return (
    <div className="pos-toolbar-container">
      {/* Top Tabs */}
      <div className="pos-mode-tabs">
        <button
          onClick={() => setMode("machine")}
          className={`pos-mode-btn ${mode === "machine" ? "active" : ""}`}
        >
          POS Machine
        </button>
        <button
          onClick={() => setMode("dashboard")}
          className={`pos-mode-btn ${mode === "dashboard" ? "active" : ""}`}
        >
          POS Dashboard
        </button>
      </div>

      {/* Action Bar */}
      <div className="pos-actions-bar">
        <button className="pos-btn-pill">
          View All Orders
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", position: "relative" }}>
          {/* Search */}
          <div style={{ position: "relative" }}>
            {searchOpen && (
              <input
                autoFocus
                value={query}
                onChange={(e) => onQueryChange?.(e.target.value)}
                onBlur={() => !query && setSearchOpen(false)}
                placeholder="Search product..."
                style={{
                  position: "absolute",
                  right: 0,
                  top: "-4px",
                  width: "220px",
                  borderRadius: "9999px",
                  padding: "8px 16px",
                  fontSize: "13px",
                  outline: "none",
                  border: "1px solid #e4e4e7",
                  background: "#ffffff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  zIndex: 20,
                }}
              />
            )}
            <button
              onClick={() => setSearchOpen((s) => !s)}
              className="pos-icon-btn"
              aria-label="Search products"
              style={{ opacity: searchOpen ? 0 : 1 }}
            >
              <IconSearch />
            </button>
          </div>

          {/* Barcode Scanner */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setScanOpen((s) => !s)}
              className="pos-btn-pill"
            >
              Scan Barcode
              <IconBarcode />
            </button>

            {scanOpen && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "100%",
                  marginTop: "8px",
                  zIndex: 30,
                  display: "flex",
                  gap: "8px",
                  borderRadius: "16px",
                  padding: "10px",
                  background: "#ffffff",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  border: "1px solid #f4f4f5",
                }}
              >
                <input
                  autoFocus
                  value={scanValue}
                  onChange={(e) => setScanValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submitScan()}
                  placeholder="Scan or enter barcode"
                  style={{
                    width: "170px",
                    borderRadius: "10px",
                    padding: "6px 12px",
                    fontSize: "13px",
                    outline: "none",
                    border: "1px solid #e4e4e7",
                  }}
                />
                <button
                  onClick={submitScan}
                  style={{
                    borderRadius: "10px",
                    background: "#232328",
                    color: "#ffffff",
                    fontSize: "13px",
                    fontWeight: 600,
                    padding: "0 14px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Add
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

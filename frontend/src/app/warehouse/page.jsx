"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getWarehouses,
  searchWarehouses,
  deleteWarehouse,
} from "@/services/warehouseService";

import "./warehouse.css";

export default function WarehousePage() {
  const [warehouses, setWarehouses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  // Load warehouses
  const loadWarehouses = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getWarehouses();

      /*
        Supports:

        {
          data: [...]
        }

        OR

        [...]
      */

      const data = response?.data || response || [];

      setWarehouses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Warehouse error:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to load warehouses"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWarehouses();
  }, []);

  // Dynamic search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!search.trim()) {
        loadWarehouses();
        return;
      }

      try {
        setSearchLoading(true);

        const response = await searchWarehouses(search);

        const data = response?.data || response || [];

        setWarehouses(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Search error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to search warehouses"
        );
      } finally {
        setSearchLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this warehouse?"
    );

    if (!confirmDelete) return;

    try {
      await deleteWarehouse(id);

      alert("Warehouse deleted successfully");

      await loadWarehouses();
    } catch (error) {
      console.error("Delete error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete warehouse"
      );
    }
  };

  return (
    <div className="warehouse-page">

      {/* Header */}

      <div className="warehouse-header">

        <div>
          <h1>Warehouse Management</h1>

          <p>
            Manage warehouses and storage locations
          </p>
        </div>

        <Link
          href="/warehouse/add"
          className="add-warehouse-btn"
        >
          + Add Warehouse
        </Link>

      </div>

      {/* Search */}

      <div className="warehouse-search">

        <input
          type="text"
          placeholder="Search warehouse..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {searchLoading && (
          <span>
            Searching...
          </span>
        )}

      </div>

      {/* Error */}

      {error && (
        <div className="warehouse-error">
          {error}
        </div>
      )}

      {/* Loading */}

      {loading ? (
        <div className="warehouse-loading">
          Loading warehouses...
        </div>
      ) : warehouses.length === 0 ? (
        <div className="warehouse-empty">
          <h2>No warehouses found</h2>

          <p>
            Add a warehouse or change your search.
          </p>
        </div>
      ) : (
        <div className="warehouse-grid">

          {warehouses.map((warehouse) => (
            <div
              key={warehouse.id}
              className="warehouse-card-wrapper"
            >

              <Link
                href={`/warehouse/${warehouse.id}`}
              >
                <div className="warehouse-card">

                  <h2>
                    {warehouse.name || "Unnamed Warehouse"}
                  </h2>

                  <p>
                    Code:{" "}
                    {warehouse.code || "-"}
                  </p>

                  <p>
                    Location:{" "}
                    {warehouse.location || "-"}
                  </p>

                  <span
                    className={
                      warehouse.status === "INACTIVE"
                        ? "status inactive"
                        : "status active"
                    }
                  >
                    {warehouse.status || "ACTIVE"}
                  </span>

                </div>
              </Link>

              <div className="warehouse-actions">

                <Link
                  href={`/warehouse/${warehouse.id}`}
                >
                  View
                </Link>

                <Link
                  href={`/warehouse/edit/${warehouse.id}`}
                >
                  Edit
                </Link>

                <button
                  onClick={() =>
                    handleDelete(warehouse.id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}
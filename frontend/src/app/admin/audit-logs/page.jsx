"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiClock,
  FiSearch,
  FiRefreshCw,
  FiUserCheck,
  FiShield,
  FiActivity,
  FiPlusCircle,
  FiEdit,
  FiTrash2,
  FiLogIn,
  FiInfo,
  FiX,
  FiLayers,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import styles from "./auditLogs.module.css";

export default function AuditLogsPage() {
  const [logs, setLogs] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [entityFilter, setEntityFilter] = useState("");
  const [page, setPage] = useState(1);

  // Modal State
  const [selectedLog, setSelectedLog] = useState(null);

  useEffect(() => {
    fetchLogs();
  }, [page, actionFilter, entityFilter]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const params = {
        page,
        limit: 20,
      };

      if (search.trim()) params.search = search.trim();
      if (actionFilter) params.action = actionFilter;
      if (entityFilter) params.entity = entityFilter;

      const res = await axios.get("http://localhost:5000/api/audit", {
        headers,
        params,
      });

      if (res.data && res.data.success) {
        setLogs(res.data.data || []);
        if (res.data.pagination) {
          setPagination(res.data.pagination);
        }
      }
    } catch (error) {
      console.error("Failed to fetch audit logs:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchLogs();
  };

  const handleResetFilters = () => {
    setSearch("");
    setActionFilter("");
    setEntityFilter("");
    setPage(1);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchLogs();
  };

  // Helper for action badges
  const renderActionBadge = (action) => {
    const act = (action || "").toUpperCase();
    switch (act) {
      case "CREATE":
        return (
          <span className={`${styles.badge} ${styles.badgeCreate}`}>
            <FiPlusCircle size={12} /> CREATE
          </span>
        );
      case "UPDATE":
        return (
          <span className={`${styles.badge} ${styles.badgeUpdate}`}>
            <FiEdit size={12} /> UPDATE
          </span>
        );
      case "DELETE":
        return (
          <span className={`${styles.badge} ${styles.badgeDelete}`}>
            <FiTrash2 size={12} /> DELETE
          </span>
        );
      case "LOGIN":
        return (
          <span className={`${styles.badge} ${styles.badgeLogin}`}>
            <FiLogIn size={12} /> LOGIN
          </span>
        );
      default:
        return (
          <span className={`${styles.badge} ${styles.badgeDefault}`}>
            {act}
          </span>
        );
    }
  };

  // Date and Time Formatter
  const formatDateTime = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "N/A";

    const formattedDate = date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    return `${formattedDate} at ${formattedTime}`;
  };

  // Time ago calculator
  const getTimeAgo = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  // Stats calculation
  const totalLogsCount = pagination.total || logs.length;
  const employeeCount = logs.filter(
    (l) => (l.entity || "").toLowerCase() === "employee"
  ).length;
  const authCount = logs.filter(
    (l) => (l.entity || "").toLowerCase() === "auth"
  ).length;
  const todayCount = logs.filter((l) => {
    if (!l.createdAt) return false;
    const d = new Date(l.createdAt);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  }).length;

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>
              <FiClock className={styles.titleIcon} />
              Audit Logs & Activity History
            </h1>
            <p className={styles.subtitle}>
              Monitor real-time system operations, employee additions, updates, deletions, and logins with full timestamps.
            </p>
          </div>

          <button
            className={styles.refreshButton}
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <FiRefreshCw className={refreshing ? styles.spinning : ""} />
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={`${styles.iconWrapper} ${styles.indigo}`}>
              <FiActivity />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{totalLogsCount}</span>
              <span className={styles.statLabel}>Total Activity Logs</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.iconWrapper} ${styles.emerald}`}>
              <FiUserCheck />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{employeeCount}</span>
              <span className={styles.statLabel}>Employee Operations</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.iconWrapper} ${styles.amber}`}>
              <FiShield />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{authCount}</span>
              <span className={styles.statLabel}>Authentication Events</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.iconWrapper} ${styles.rose}`}>
              <FiClock />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{todayCount}</span>
              <span className={styles.statLabel}>Recorded Today</span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className={styles.filterCard}>
          <form className={styles.filterGrid} onSubmit={handleSearchSubmit}>
            <div className={styles.searchBox}>
              <FiSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search by user, employee, ID, or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <select
              value={actionFilter}
              onChange={(e) => {
                setActionFilter(e.target.value);
                setPage(1);
              }}
              className={styles.selectInput}
            >
              <option value="">All Actions</option>
              <option value="CREATE">CREATE</option>
              <option value="UPDATE">UPDATE</option>
              <option value="DELETE">DELETE</option>
              <option value="LOGIN">LOGIN</option>
            </select>

            <select
              value={entityFilter}
              onChange={(e) => {
                setEntityFilter(e.target.value);
                setPage(1);
              }}
              className={styles.selectInput}
            >
              <option value="">All Modules</option>
              <option value="Employee">Employee</option>
              <option value="Auth">Auth</option>
              <option value="Customer">Customer</option>
              <option value="Product">Product</option>
            </select>

            <button
              type="button"
              className={styles.resetButton}
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
          </form>
        </div>

        {/* Logs Table */}
        <div className={styles.tableCard}>
          <div className={styles.tableWrapper}>
            {loading ? (
              <div className={styles.stateContainer}>
                <FiRefreshCw className={styles.spinning} size={32} />
                <p style={{ marginTop: 12 }}>Loading activity logs...</p>
              </div>
            ) : logs.length === 0 ? (
              <div className={styles.stateContainer}>
                <FiLayers className={styles.emptyIcon} size={40} />
                <h3>No audit logs found</h3>
                <p>Try adjusting your search criteria or filter selections.</p>
              </div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>Date & Time</th>
                    <th className={styles.th}>Performed By</th>
                    <th className={styles.th}>Action</th>
                    <th className={styles.th}>Module</th>
                    <th className={styles.th}>Activity Description</th>
                    <th className={styles.th} align="right">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => {
                    const description =
                      log.details?.description ||
                      (log.action === "CREATE"
                        ? `Created ${log.entity} (${log.entityId || "N/A"})`
                        : log.action === "DELETE"
                        ? `Deleted ${log.entity} (${log.entityId || "N/A"})`
                        : log.action === "UPDATE"
                        ? `Updated ${log.entity} (${log.entityId || "N/A"})`
                        : log.action === "LOGIN"
                        ? `User logged in`
                        : `${log.action} on ${log.entity}`);

                    const actorName = log.userName || "System / Guest";
                    const actorInitial = actorName.charAt(0).toUpperCase();

                    return (
                      <tr key={log.id} className={styles.tr}>
                        <td className={styles.td}>
                          <div className={styles.timestampText}>
                            {formatDateTime(log.createdAt)}
                            <span className={styles.timeAgo}>
                              ({getTimeAgo(log.createdAt)})
                            </span>
                          </div>
                        </td>

                        <td className={styles.td}>
                          <div className={styles.userInfo}>
                            <div className={styles.avatar}>{actorInitial}</div>
                            <div>
                              <div className={styles.userName}>{actorName}</div>
                              {log.userEmail && (
                                <div className={styles.userEmail}>
                                  {log.userEmail}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className={styles.td}>
                          {renderActionBadge(log.action)}
                        </td>

                        <td className={styles.td}>
                          <span className={styles.entityTag}>
                            {log.entity || "System"}
                          </span>
                        </td>

                        <td className={styles.td}>
                          <div className={styles.descriptionText}>
                            {description}
                          </div>
                        </td>

                        <td className={styles.td} align="right">
                          <button
                            className={styles.detailsButton}
                            onClick={() => setSelectedLog(log)}
                          >
                            <FiInfo size={14} /> Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {!loading && logs.length > 0 && (
            <div className={styles.pagination}>
              <div>
                Showing Page {pagination.page} of {pagination.totalPages} (Total{" "}
                {pagination.total} entries)
              </div>
              <div className={styles.pageControls}>
                <button
                  className={styles.pageButton}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                >
                  <FiChevronLeft /> Previous
                </button>
                <button
                  className={styles.pageButton}
                  onClick={() =>
                    setPage((p) => Math.min(pagination.totalPages, p + 1))
                  }
                  disabled={page >= pagination.totalPages}
                >
                  Next <FiChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {selectedLog && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedLog(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3>Audit Log Entry Details</h3>
              <button
                className={styles.closeButton}
                onClick={() => setSelectedLog(null)}
              >
                <FiX size={20} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div style={{ marginBottom: 16 }}>
                <p>
                  <strong>ID:</strong> {selectedLog.id}
                </p>
                <p>
                  <strong>Date & Time:</strong>{" "}
                  {formatDateTime(selectedLog.createdAt)}
                </p>
                <p>
                  <strong>User:</strong>{" "}
                  {selectedLog.userName || "System / Guest"}{" "}
                  {selectedLog.userEmail ? `(${selectedLog.userEmail})` : ""}
                </p>
                <p>
                  <strong>Action & Entity:</strong> {selectedLog.action} on{" "}
                  {selectedLog.entity} (ID: {selectedLog.entityId || "N/A"})
                </p>
                {selectedLog.ipAddress && (
                  <p>
                    <strong>IP Address:</strong> {selectedLog.ipAddress}
                  </p>
                )}
                {selectedLog.userAgent && (
                  <p>
                    <strong>User Agent:</strong> {selectedLog.userAgent}
                  </p>
                )}
              </div>

              <h4>Raw Details Metadata:</h4>
              <div className={styles.jsonBox}>
                {JSON.stringify(selectedLog.details || {}, null, 2)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

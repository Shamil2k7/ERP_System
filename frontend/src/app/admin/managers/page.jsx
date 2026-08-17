"use client";

import { useMemo, useState, useEffect } from "react";
import axios from "axios";
import {
  FiPrinter,
  FiSearch,
  FiRefreshCw,
  FiTrash2,
  FiPhone,
  FiMail,
  FiShield,
  FiUserCheck,
  FiMapPin,
} from "react-icons/fi";
import { toast, Toaster } from "react-hot-toast";

import { useAlert } from "@/context/AlertContext";
import styles from "./managers.module.css";

export default function ManagersPage() {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const { showSuccess, showError, showConfirm } = useAlert();

  // Fetch managers on load
  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/employees");
      const allEmployees = res.data?.data || [];
      const managerOnlyList = allEmployees.filter((item) => {
        const roleName = (item.roleRef?.name || item.role || item.type || "").toLowerCase().trim();
        return roleName.includes("manager") && !roleName.includes("admin");
      });
      setManagers(managerOnlyList);
    } catch (err) {
      console.error("Failed to fetch managers:", err);
      toast.error("Failed to fetch manager records");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteManager = (id, name) => {
    showConfirm({
      title: "Delete Manager Account",
      message: `Are you sure you want to delete manager "${name}"? This action cannot be undone.`,
      confirmText: "Delete Manager",
      type: "danger",
      onConfirm: async () => {
        try {
          await axios.delete(`http://localhost:5000/api/employees/${id}`);
          showSuccess("Manager Deleted", "Manager record deleted successfully.");
          fetchManagers();
        } catch (err) {
          console.error(err);
          showError("Deletion Failed", err.response?.data?.message || "Failed to delete manager");
        }
      },
    });
  };

  // Filter managers by search
  const filteredManagers = useMemo(() => {
    return managers.filter((item) => {
      const keyword = search.toLowerCase();
      const name = (item.fullName || item.name || "").toLowerCase();
      const email = (item.email || "").toLowerCase();
      const phone = (item.phone || "").toLowerCase();
      const branchName = (item.branch?.name || "").toLowerCase();
      const role = (item.roleRef?.name || item.role || "").toLowerCase();

      return (
        name.includes(keyword) ||
        email.includes(keyword) ||
        phone.includes(keyword) ||
        branchName.includes(keyword) ||
        role.includes(keyword)
      );
    });
  }, [managers, search]);

  const getInitials = (name) => {
    if (!name) return "MG";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };

  return (
    <main className={styles.page}>
      <Toaster position="top-right" />

      {/* HEADER */}
      <header className={styles.header}>
        <div>
          <h1>
            <FiUserCheck style={{ color: "#4f46e5" }} /> Managers Management
          </h1>
          <p>View all managers and track assigned branches.</p>
        </div>

        <div className={styles.headerActions}>
          <button
            className={styles.secondaryButton}
            onClick={() => window.print()}
          >
            <FiPrinter size={15} />
            Print
          </button>

          <button className={styles.secondaryButton} onClick={() => fetchManagers()}>
            <FiRefreshCw size={15} />
            Refresh
          </button>
        </div>
      </header>

      {/* MANAGERS TABLE */}
      <section className={styles.tableCard}>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <FiSearch size={18} style={{ color: "#94a3b8" }} />
            <input
              type="text"
              placeholder="Search by manager name, phone, email, or branch..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Manager Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Branch</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className={styles.empty}>
                    Loading managers list...
                  </td>
                </tr>
              ) : filteredManagers.length > 0 ? (
                filteredManagers.map((item) => {
                  const managerName = item.fullName || item.name || "Manager";
                  const roleName = item.roleRef?.name || item.role || "Manager";
                  const branchName = item.branch?.name || "Main Branch";
                  const initials = getInitials(managerName);

                  return (
                    <tr key={item.id}>
                      {/* Name */}
                      <td>
                        <div className={styles.managerCell}>
                          <div className={styles.avatarBadge}>{initials}</div>
                          <div>
                            <strong className={styles.managerName}>{managerName}</strong>
                            <span className={styles.managerId}>
                              ID: {item.employeeId || `MGR-${item.id.substring(0, 6)}`}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Phone */}
                      <td>
                        <div className={styles.contactItem}>
                          <FiPhone size={13} style={{ color: "#64748b" }} />
                          <span>{item.phone || "N/A"}</span>
                        </div>
                      </td>

                      {/* Email */}
                      <td>
                        <div className={styles.contactItem}>
                          <FiMail size={13} style={{ color: "#64748b" }} />
                          <span>{item.email || "N/A"}</span>
                        </div>
                      </td>

                      {/* Branch */}
                      <td>
                        <span className={styles.branchBadge}>
                          <FiMapPin size={12} />
                          {branchName}
                        </span>
                      </td>

                      {/* Role */}
                      <td>
                        <span className={styles.roleBadge}>
                          <FiShield size={12} />
                          {roleName}
                        </span>
                      </td>

                      {/* Actions */}
                      <td>
                        <button
                          className={styles.actionButton}
                          title="Delete Manager"
                          onClick={() => handleDeleteManager(item.id, managerName)}
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className={styles.empty}>
                    No manager records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

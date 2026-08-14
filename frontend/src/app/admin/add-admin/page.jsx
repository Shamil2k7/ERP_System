"use client";

import { useMemo, useState, useEffect } from "react";
import axios from "axios";
import {
  FiPlus,
  FiPrinter,
  FiDownload,
  FiSearch,
  FiChevronDown,
  FiMoreVertical,
  FiRefreshCw,
  FiArrowDown,
  FiX,
  FiSave,
  FiTrash2,
  FiPhone,
  FiMail,
  FiShield,
  FiUser,
  FiLock,
  FiBriefcase,
} from "react-icons/fi";
import { toast, Toaster } from "react-hot-toast";

import {
  getAdmins,
  createAdmin,
  deleteAdmin,
} from "@/services/adminService";

import styles from "./addAdmin.module.css";
import { useAlert } from "@/context/AlertContext";

export default function AddAdminPage() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showSuccess, showError, showConfirm } = useAlert();

  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [sortOrder, setSortOrder] = useState("default");

  const [errors, setErrors] = useState({});

  const [dbBusinessTypes, setDbBusinessTypes] = useState([]);

  useEffect(() => {
    const fetchBT = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/business-types");
        if (res.data.success && res.data.data) {
          setDbBusinessTypes(res.data.data);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchBT();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    type: "",
  });

  const validateAdminForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Enter a valid email address";
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      const phoneRegex = /^[\+\d\s\-\(\)]{7,20}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        newErrors.phone = "Enter a valid phone number (7-20 digits)";
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.type.trim()) {
      newErrors.type = "Business type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* =========================
     FETCH ADMINS
  ========================= */
  const fetchAdminsData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAdmins();
      if (res.success) {
        setAdmins(res.data || []);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch admin accounts");
      toast.error(err.response?.data?.message || "Failed to fetch admins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminsData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.actionWrapper}`)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* =========================
     SEARCH & FILTER
  ========================= */
  const filteredAdmins = useMemo(() => {
    let result = admins.filter((item) => {
      const keyword = search.toLowerCase();
      const name = item.fullName?.toLowerCase() || item.name?.toLowerCase() || "";
      const email = item.email?.toLowerCase() || "";
      const phone = item.phone?.toLowerCase() || "";
      const type = item.type?.toLowerCase() || "";

      return (
        name.includes(keyword) ||
        email.includes(keyword) ||
        phone.includes(keyword) ||
        type.includes(keyword)
      );
    });

    if (sortOrder === "asc") {
      result.sort((a, b) => (a.fullName || a.name || "").localeCompare(b.fullName || b.name || ""));
    }

    if (sortOrder === "desc") {
      result.sort((a, b) => (b.fullName || b.name || "").localeCompare(a.fullName || a.name || ""));
    }

    return result;
  }, [admins, search, sortOrder]);

  /* =========================
     FORM HANDLERS
  ========================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSaveAdmin = async (e) => {
    e.preventDefault();

    if (!validateAdminForm()) {
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      password: formData.password,
      type: formData.type.trim(),
    };

    try {
      await createAdmin(payload);
      toast.success("Admin created successfully!");
      showSuccess("Admin Created", `Administrator account ${payload.name} has been added successfully.`);

      fetchAdminsData();
      handleCancel();
    } catch (err) {
      console.error(err);
      const serverMessage = err.response?.data?.message || err.message || "";
      const errorList = err.response?.data?.errors;
      if (errorList && Array.isArray(errorList)) {
        toast.error(errorList.join(", "));
      } else {
        toast.error(serverMessage || "Failed to create admin");
      }
    }
  };

  const handleDeleteAdminItem = (id, name) => {
    setOpenMenu(null);
    showConfirm({
      title: "Delete Admin Account",
      message: `Are you sure you want to delete admin account "${name}"? This action cannot be undone.`,
      confirmText: "Delete Admin",
      type: "danger",
      onConfirm: async () => {
        try {
          await deleteAdmin(id);
          showSuccess("Admin Deleted", "Admin account deleted successfully.");
          fetchAdminsData();
        } catch (err) {
          console.error(err);
          showError("Deletion Failed", err.response?.data?.message || "Failed to delete admin");
        }
      },
    });
  };

  const handleCancel = () => {
    setErrors({});
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      type: "General Admin",
    });
    setShowAdd(false);
  };

  const handleSort = () => {
    if (sortOrder === "default") setSortOrder("asc");
    else if (sortOrder === "asc") setSortOrder("desc");
    else setSortOrder("default");
  };

  const handleRefresh = () => {
    setSearch("");
    setSortOrder("default");
    setOpenMenu(null);
    fetchAdminsData();
  };

  return (
    <main className={styles.page}>
      <Toaster position="top-right" />

      {/* PAGE HEADER */}
      <header className={styles.header}>
        <div>
          <h1>
            <FiShield style={{ color: "#4f46e5" }} /> Add & Manage Admins
          </h1>
          <p>Super Admin control panel for registering and managing system administrators.</p>
        </div>

        <div className={styles.headerActions}>
          <button
            className={styles.secondaryButton}
            onClick={() => window.print()}
          >
            <FiPrinter size={15} />
            Print
          </button>

          <button className={styles.secondaryButton}>
            <FiDownload size={15} />
            Export
            <FiChevronDown size={14} />
          </button>

          <button
            className={styles.addButton}
            onClick={() => {
              if (showAdd) handleCancel();
              else setShowAdd(true);
            }}
          >
            {showAdd ? <FiX size={17} /> : <FiPlus size={17} />}
            {showAdd ? "Close Form" : "Add Admin"}
          </button>
        </div>
      </header>

      {/* ADD ADMIN FORM */}
      {showAdd && (
        <section className={styles.addCard}>
          <div className={styles.addHeader}>
            <div>
              <h2>Create New Administrator</h2>
              <p>Fill in the administrator profile details to grant administrative access.</p>
            </div>
            <button className={styles.closeButton} onClick={handleCancel}>
              <FiX />
            </button>
          </div>

          <form className={styles.form} onSubmit={handleSaveAdmin} noValidate>
            <div className={styles.formGroup}>
              <label>
                Full Name <span>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                style={errors.name ? { borderColor: "#ef4444" } : {}}
              />
              {errors.name && (
                <span style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px", display: "block" }}>
                  {errors.name}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>
                Email Address <span>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@company.com"
                style={errors.email ? { borderColor: "#ef4444" } : {}}
              />
              {errors.email && (
                <span style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px", display: "block" }}>
                  {errors.email}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>
                Phone Number <span>*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                style={errors.phone ? { borderColor: "#ef4444" } : {}}
              />
              {errors.phone && (
                <span style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px", display: "block" }}>
                  {errors.phone}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>
                Password <span>*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                style={errors.password ? { borderColor: "#ef4444" } : {}}
              />
              {errors.password && (
                <span style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px", display: "block" }}>
                  {errors.password}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>
                Business Type <span>*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                style={errors.type ? { borderColor: "#ef4444" } : {}}
              >
                <option value="">Select Business Type</option>
                {dbBusinessTypes.length > 0 ? (
                  dbBusinessTypes.map((bt) => (
                    <option key={bt.id} value={bt.name}>
                      {bt.name} ({bt.code})
                    </option>
                  ))
                ) : (
                  <>
                    <option value="Retail Store">Retail Store</option>
                    <option value="Wholesale & Distribution">Wholesale & Distribution</option>
                    <option value="Supermarket & Grocery">Supermarket & Grocery</option>
                    <option value="Pharmacy & Healthcare">Pharmacy & Healthcare</option>
                    <option value="Restaurant & Food Service">Restaurant & Food Service</option>
                    <option value="Electronics & Technology">Electronics & Technology</option>
                    <option value="Fashion & Apparel">Fashion & Apparel</option>
                    <option value="General Business">General Business</option>
                  </>
                )}
              </select>
              {errors.type && (
                <span style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px", display: "block" }}>
                  {errors.type}
                </span>
              )}
            </div>

            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={handleCancel}
              >
                <FiX size={16} />
                Cancel
              </button>

              <button type="submit" className={styles.saveButton}>
                <FiSave size={16} />
                Save Administrator
              </button>
            </div>
          </form>
        </section>
      )}

      {/* ADMIN LIST TABLE */}
      <section className={styles.tableCard}>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <FiSearch size={18} />
            <input
              type="text"
              placeholder="Search by name, email, phone, or business type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className={styles.toolbarRight}>
            <button className={styles.sortButton} onClick={handleSort}>
              <FiArrowDown size={16} />
              Sort ({sortOrder})
              <FiChevronDown size={14} />
            </button>

            <button
              className={styles.iconButton}
              title="Refresh"
              onClick={handleRefresh}
            >
              <FiRefreshCw size={17} />
            </button>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Administrator Name</th>
                <th>Contact Info</th>
                <th>Business Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className={styles.empty}>
                    Loading administrator list...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" className={styles.empty}>
                    {error}
                  </td>
                </tr>
              ) : filteredAdmins.length > 0 ? (
                filteredAdmins.map((item, index) => {
                  const adminName = item.fullName || item.name || "Admin User";
                  const displayId = item.employeeId || item.adminId || (item.id ? `ADM-${item.id.substring(0, 6).toUpperCase()}` : `ADM-${1001 + index}`);
                  return (
                    <tr key={item.id}>
                      <td>
                        <strong className={styles.adminName}>{adminName}</strong>
                        <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
                          ID: {displayId}
                        </div>
                      </td>
                      <td>
                        <div>
                          {item.email && (
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
                              <FiMail size={13} style={{ color: "#64748b" }} /> {item.email}
                            </div>
                          )}
                          {item.phone && (
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
                              <FiPhone size={12} /> {item.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className={styles.roleBadge}>
                          {item.type || item.businessType || "Retail Store"}
                        </span>
                      </td>
                      <td>
                        <span className={item.isVerified !== false ? styles.activeStatus : styles.inactiveStatus}>
                          {item.isVerified !== false ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        <div className={styles.actionWrapper}>
                          <button
                            className={styles.actionButton}
                            onClick={() =>
                              setOpenMenu(openMenu === item.id ? null : item.id)
                            }
                          >
                            <FiMoreVertical size={17} />
                          </button>

                          {openMenu === item.id && (
                            <div className={styles.actionMenu}>
                              <button
                                className={styles.deleteAction}
                                onClick={() => handleDeleteAdminItem(item.id, adminName)}
                              >
                                <FiTrash2 size={14} />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className={styles.empty}>
                    No admin accounts found. Click &quot;Add Admin&quot; to create one.
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

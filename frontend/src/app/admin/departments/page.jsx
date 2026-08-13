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
  FiFilter,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

import styles from "./departments.module.css";
import { useAlert } from "@/context/AlertContext";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const { showSuccess, showWarning, showError, showConfirm } = useAlert();
  const [editingId, setEditingId] = useState(null);

  const [sortOrder, setSortOrder] = useState("default");

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    head: "",
    employees: "",
    status: "ACTIVE",
  });

  /* =========================
     FETCH DEPARTMENTS
  ========================= */
  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/departments");
      if (res.data.success) {
        setDepartments(res.data.data);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch departments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  /* =========================
     SEARCH
  ========================= */

  const filteredDepartments = useMemo(() => {
    let result = departments.filter((item) => {
      const keyword = search.toLowerCase();
      const code = item.code?.toLowerCase() || "";
      const name = item.name?.toLowerCase() || "";
      const head = item.head?.toLowerCase() || "";
      const status = item.status?.toLowerCase() || "";

      return (
        code.includes(keyword) ||
        name.includes(keyword) ||
        head.includes(keyword) ||
        status.includes(keyword)
      );
    });

    if (sortOrder === "asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortOrder === "desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [departments, search, sortOrder]);

  /* =========================
     FORM CHANGE
  ========================= */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================
     ADD/EDIT DEPARTMENT
  ========================= */

  const handleSaveDepartment = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showWarning("Invalid form data", "Please enter department name");
      return;
    }

    if (!formData.code.trim()) {
      showWarning("Invalid form data", "Please enter department code");
      return;
    }

    const payload = {
      name: formData.name,
      code: formData.code,
      head: formData.head,
      employees: Number(formData.employees) || 0,
      status: formData.status,
    };

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/departments/${editingId}`, payload);
        showSuccess("Product updated", "Department updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/departments", payload);
        showSuccess("Product created", "Department created successfully");
      }

      fetchDepartments();

      setFormData({
        name: "",
        code: "",
        head: "",
        employees: "",
        status: "ACTIVE",
      });
      setEditingId(null);
      setShowAdd(false);
    } catch (err) {
      console.error(err);
      showError("Invalid form data", err.response?.data?.message || "Failed to save department");
    }
  };

  /* =========================
     DELETE
  ========================= */

  const handleDelete = (id) => {
    setOpenMenu(null);
    showConfirm({
      title: "Delete Department",
      message: "Are you sure you want to delete this department? Employees assigned to this department may be affected.",
      confirmText: "Delete Department",
      type: "danger",
      onConfirm: async () => {
        try {
          await axios.delete(`http://localhost:5000/api/departments/${id}`);
          showSuccess("Product updated", "Department deleted successfully");
          fetchDepartments();
        } catch (err) {
          console.error(err);
          showError("Product couldn't be deleted", err.response?.data?.message || "Failed to delete department");
        }
      },
    });
  };

  /* =========================
     EDIT
  ========================= */

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      code: item.code,
      head: item.head || "",
      employees: item.employees || 0,
      status: item.status || "ACTIVE",
    });

    setShowAdd(true);
    setOpenMenu(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      name: "",
      code: "",
      head: "",
      employees: "",
      status: "ACTIVE",
    });
    setShowAdd(false);
  };

  /* =========================
     SORT
  ========================= */

  const handleSort = () => {
    if (sortOrder === "default") {
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("default");
    }
  };

  /* =========================
     REFRESH
  ========================= */

  const handleRefresh = () => {
    setSearch("");
    setSortOrder("default");
    setOpenMenu(null);
    fetchDepartments();
  };

  return (
    <main className={styles.page}>
      {/* =========================
          PAGE HEADER
      ========================= */}
      <header className={styles.header}>
        <div>
          <h1>Departments</h1>
        </div>

        <div className={styles.headerActions}>
          <button className={styles.secondaryButton} onClick={() => window.print()}>
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
              if (showAdd) {
                handleCancel();
              } else {
                setShowAdd(true);
              }
            }}
          >
            {showAdd ? <FiX size={17} /> : <FiPlus size={17} />}
            {showAdd ? "Close" : "Add New"}
          </button>
        </div>
      </header>

      {/* =========================
          ADD/EDIT DEPARTMENT FORM
      ========================= */}
      {showAdd && (
        <section className={styles.addCard}>
          <div className={styles.addHeader}>
            <div>
              <h2>{editingId ? "Edit Department" : "Add Department"}</h2>
              <p>
                {editingId
                  ? "Update the details of the department."
                  : "Create a new department and assign the department head."}
              </p>
            </div>

            <button className={styles.closeButton} onClick={handleCancel}>
              <FiX />
            </button>
          </div>

          <form className={styles.form} onSubmit={handleSaveDepartment}>
            <div className={styles.formGroup}>
              <label>
                Department Name <span>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter department name"
              />
            </div>

            <div className={styles.formGroup}>
              <label>
                Department Code <span>*</span>
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="Example: DPT009"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Department Head</label>
              <input
                type="text"
                name="head"
                value={formData.head}
                onChange={handleChange}
                placeholder="Enter department head"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Number of Employees</label>
              <input
                type="number"
                name="employees"
                min="0"
                value={formData.employees}
                onChange={handleChange}
                placeholder="Enter number of employees"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>

            <div className={styles.formActions}>
              <button type="button" className={styles.cancelButton} onClick={handleCancel}>
                <FiX size={16} />
                Cancel
              </button>

              <button type="submit" className={styles.saveButton}>
                <FiSave size={16} />
                {editingId ? "Update Department" : "Save Department"}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* =========================
          TABLE CARD
      ========================= */}
      <section className={styles.tableCard}>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <FiSearch size={18} />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className={styles.toolbarRight}>
            <button className={styles.filterButton}>
              <FiFilter size={16} />
              Filter
              <FiChevronDown size={14} />
            </button>

            <button className={styles.sortButton} onClick={handleSort}>
              <FiArrowDown size={16} />
              Sort By
              <FiChevronDown size={14} />
            </button>

            <button className={styles.iconButton} title="Refresh" onClick={handleRefresh}>
              <FiRefreshCw size={17} />
            </button>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Code</th>
                <th>Department</th>
                <th>Head</th>
                <th>Employees</th>
                <th>Created On</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className={styles.empty}>
                    Loading departments...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="7" className={styles.empty}>
                    {error}
                  </td>
                </tr>
              ) : filteredDepartments.length > 0 ? (
                filteredDepartments.map((item) => (
                  <tr key={item.id}>
                    <td className={styles.code}>{item.code}</td>
                    <td>
                      <strong className={styles.departmentName}>{item.name}</strong>
                    </td>
                    <td>{item.head || "-"}</td>
                    <td>{item.employees}</td>
                    <td>{new Date(item.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td>
                    <td>
                      <span
                        className={
                          item.status === "ACTIVE"
                            ? styles.activeStatus
                            : styles.inactiveStatus
                        }
                      >
                        {item.status === "ACTIVE" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionWrapper}>
                        <button
                          className={styles.actionButton}
                          onClick={() => setOpenMenu(openMenu === item.id ? null : item.id)}
                        >
                          <FiMoreVertical size={17} />
                        </button>

                        {openMenu === item.id && (
                          <div className={styles.actionMenu}>
                            <button onClick={() => handleEdit(item)}>
                              <FiEdit2 size={14} />
                              Edit
                            </button>
                            <button
                              className={styles.deleteAction}
                              onClick={() => handleDelete(item.id)}
                            >
                              <FiTrash2 size={14} />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className={styles.empty}>
                    No departments found.
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
"use client";

import { useMemo, useState } from "react";
import {
  FiPlus,
  FiPrinter,
  FiDownload,
  FiSearch,
  FiChevronDown,
  FiMoreVertical,
  FiRefreshCw,
  FiFilter,
  FiX,
  FiSave,
  FiArrowDown,
} from "react-icons/fi";

import styles from "./designations.module.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DesignationsPage() {
  const [designations, setDesignations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    designation: "",
    department: "",
    status: "ACTIVE",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [designationsRes, departmentsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/designations"),
        axios.get("http://localhost:5000/api/departments"),
      ]);

      const fetchedDesignations = designationsRes.data.data.map((d) => ({
        _id: d.id,
        id: d.code,
        designation: d.name,
        department: d.department?.name || "",
        employees: d.employees || 0,
        createdOn: new Date(d.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        status: d.status,
      }));

      setDesignations(fetchedDesignations);
      setDepartments(departmentsRes.data.data.map((dep) => dep.name));
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  import("react").then((react) => {
    react.useEffect(() => {
      fetchData();
    }, []);
  });

  const filteredDesignations = useMemo(() => {
    let result = designations.filter((item) => {
      const value = search.toLowerCase();

      const matchesSearch =
        item.id.toLowerCase().includes(value) ||
        item.designation.toLowerCase().includes(value) ||
        item.department.toLowerCase().includes(value);

      const matchesStatus =
        filterStatus === "All" || item.status === filterStatus;

      return matchesSearch && matchesStatus;
    });

    result.sort((a, b) => {
      return sortAsc
        ? a.designation.localeCompare(b.designation)
        : b.designation.localeCompare(a.designation);
    });

    return result;
  }, [designations, search, filterStatus, sortAsc]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddDesignation = async (e) => {
    e.preventDefault();

    if (!formData.designation.trim() || !formData.department) {
      toast.warn("Please enter designation and select department.");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/designations/${editingId}`, {
          name: formData.designation.trim(),
          department: formData.department,
          status: formData.status,
        });
        toast.success("Designation updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/designations", {
          name: formData.designation.trim(),
          department: formData.department,
          status: formData.status,
        });
        toast.success("Designation created successfully");
      }

      setFormData({
        designation: "",
        department: "",
        status: "ACTIVE",
      });
      setEditingId(null);
      setShowAddForm(false);
      fetchData();
    } catch (error) {
      console.error("Error saving designation:", error);
      toast.error(
        error.response?.data?.message || "Failed to save designation"
      );
    }
  };

  const handleDelete = async (id, realId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this designation?"
    );

    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/designations/${realId}`);
      toast.success("Designation deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting designation:", error);
      toast.error(
        error.response?.data?.message || "Failed to delete designation"
      );
    }

    setOpenMenu(null);
  };

  const handleEdit = (item) => {
    setFormData({
      designation: item.designation,
      department: item.department,
      status: item.status,
    });

    setEditingId(item._id);
    setShowAddForm(true);
    setOpenMenu(null);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const headers = [
      "ID",
      "Designation",
      "Department",
      "Employees",
      "Created On",
      "Status",
    ];

    const rows = designations.map((item) => [
      item.id,
      item.designation,
      item.department,
      item.employees,
      item.createdOn,
      item.status,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "designations.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleSort = () => {
    setSortAsc((prev) => !prev);
  };

  const handleRefresh = () => {
    setSearch("");
    setFilterStatus("All");
    setSortAsc(true);
  };

  return (
    <div className={styles.page}>
      <ToastContainer position="top-right" autoClose={3000} />
      {/* =========================
          HEADER
      ========================= */}

      <header className={styles.header}>
        <div>
          <h1>Designations</h1>
        </div>

        <div className={styles.headerActions}>
          <button
            className={styles.secondaryButton}
            onClick={handlePrint}
          >
            <FiPrinter size={15} />
            Print
          </button>

          <button
            className={styles.secondaryButton}
            onClick={handleExport}
          >
            <FiDownload size={15} />
            Export
            <FiChevronDown size={14} />
          </button>

          <button
            className={styles.addButton}
            onClick={() => {
              setShowAddForm((prev) => !prev);
              setOpenMenu(null);
            }}
          >
            {showAddForm ? (
              <FiX size={17} />
            ) : (
              <FiPlus size={17} />
            )}

            {showAddForm ? "Close" : "Add New"}
          </button>
        </div>
      </header>

      {/* =========================
          ADD DESIGNATION FORM
      ========================= */}

      {showAddForm && (
        <section className={styles.addCard}>
          <div className={styles.addCardHeader}>
            <div>
              <h2>{editingId ? "Edit Designation" : "Add New Designation"}</h2>
              <p>{editingId ? "Update existing designation details." : "Create a new employee designation."}</p>
            </div>

            <button
              className={styles.closeButton}
              onClick={() => {
                setShowAddForm(false);
                setEditingId(null);
                setFormData({
                  designation: "",
                  department: "",
                  status: "ACTIVE",
                });
              }}
            >
              <FiX size={18} />
            </button>
          </div>

          <form
            className={styles.form}
            onSubmit={handleAddDesignation}
          >
            <div className={styles.formGroup}>
              <label htmlFor="designation">
                Designation <span>*</span>
              </label>

              <input
                id="designation"
                name="designation"
                type="text"
                placeholder="Enter designation"
                value={formData.designation}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="department">
                Department <span>*</span>
              </label>

              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
              >
                <option value="">
                  Select department
                </option>

                {departments.map((department) => (
                  <option
                    key={department}
                    value={department}
                  >
                    {department}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="status">
                Status
              </label>

              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>

            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => {
                  setShowAddForm(false);
                  setEditingId(null);
                  setFormData({
                    designation: "",
                    department: "",
                    status: "ACTIVE",
                  });
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className={styles.saveButton}
              >
                <FiSave size={16} />
                {editingId ? "Update Designation" : "Save Designation"}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* =========================
          TABLE CARD
      ========================= */}

      <section className={styles.tableCard}>
        {/* TOOLBAR */}

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
            {/* FILTER */}

            <div className={styles.filterWrapper}>
              <button
                className={styles.toolbarButton}
                onClick={() =>
                  setFilterStatus(
                    filterStatus === "All"
                      ? "ACTIVE"
                      : filterStatus === "ACTIVE"
                      ? "INACTIVE"
                      : "All"
                  )
                }
              >
                <FiFilter size={16} />
                Filter
                <FiChevronDown size={14} />
              </button>

              {filterStatus !== "All" && (
                <span className={styles.filterBadge}>
                  {filterStatus}
                </span>
              )}
            </div>

            {/* SORT */}

            <button
              className={styles.toolbarButton}
              onClick={handleSort}
            >
              <FiArrowDown
                size={16}
                className={
                  sortAsc
                    ? styles.arrowUp
                    : styles.arrowDown
                }
              />

              Sort By

              <FiChevronDown size={14} />
            </button>

            {/* REFRESH */}

            <button
              className={styles.iconButton}
              onClick={handleRefresh}
              title="Refresh"
            >
              <FiRefreshCw size={17} />
            </button>
          </div>
        </div>

        {/* TABLE */}

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Employees</th>
                <th>Created On</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredDesignations.length > 0 ? (
                filteredDesignations.map((item) => (
                  <tr key={item.id}>
                    <td className={styles.id}>
                      {item.id}
                    </td>

                    <td>
                      <strong>
                        {item.designation}
                      </strong>
                    </td>

                    <td className={styles.text}>
                      {item.department}
                    </td>

                    <td className={styles.text}>
                      {item.employees}
                    </td>

                    <td className={styles.text}>
                      {item.createdOn}
                    </td>

                    <td>
                      <span
                        className={`${styles.status} ${
                          item.status === "ACTIVE"
                            ? styles.active
                            : styles.inactive
                        }`}
                      >
                        {item.status === "ACTIVE" ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td>
                      <div className={styles.actionWrapper}>
                        <button
                          className={styles.actionButton}
                          onClick={() =>
                            setOpenMenu(
                              openMenu === item.id
                                ? null
                                : item.id
                            )
                          }
                        >
                          <FiMoreVertical size={17} />
                        </button>

                        {openMenu === item.id && (
                          <div className={styles.actionMenu}>
                            <button
                              onClick={() =>
                                handleEdit(item)
                              }
                            >
                              Edit
                            </button>

                            <button
                              className={styles.deleteItem}
                              onClick={() =>
                                handleDelete(item.id, item._id)
                              }
                            >
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
                  <td
                    colSpan="7"
                    className={styles.empty}
                  >
                    No designations found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
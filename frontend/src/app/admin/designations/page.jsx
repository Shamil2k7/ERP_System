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

const initialDesignations = [
  {
    id: "#DSG001",
    designation: "Engineering Manager",
    department: "Engineering",
    employees: 8,
    createdOn: "11 Sep 2025",
    status: "Active",
  },
  {
    id: "#DSG002",
    designation: "Senior Developer",
    department: "Engineering",
    employees: 15,
    createdOn: "05 Sep 2025",
    status: "Active",
  },
  {
    id: "#DSG003",
    designation: "UX Designer",
    department: "Design",
    employees: 12,
    createdOn: "27 Aug 2025",
    status: "Active",
  },
  {
    id: "#DSG004",
    designation: "HR Manager",
    department: "HR",
    employees: 3,
    createdOn: "16 Aug 2025",
    status: "Active",
  },
  {
    id: "#DSG005",
    designation: "Accountant",
    department: "Finance",
    employees: 6,
    createdOn: "25 Jul 2025",
    status: "Active",
  },
  {
    id: "#DSG006",
    designation: "Sales Executive",
    department: "Sales",
    employees: 20,
    createdOn: "12 Jul 2025",
    status: "Active",
  },
  {
    id: "#DSG007",
    designation: "Marketing Lead",
    department: "Marketing",
    employees: 5,
    createdOn: "23 Jun 2025",
    status: "Active",
  },
  {
    id: "#DSG008",
    designation: "Support Specialist",
    department: "Support",
    employees: 10,
    createdOn: "18 May 2025",
    status: "Inactive",
  },
];

const departments = [
  "Engineering",
  "Design",
  "HR",
  "Finance",
  "Sales",
  "Marketing",
  "Operations",
  "Support",
];

export default function DesignationsPage() {
  const [designations, setDesignations] = useState(initialDesignations);

  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");

  const [formData, setFormData] = useState({
    designation: "",
    department: "",
    status: "Active",
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

  const handleAddDesignation = (e) => {
    e.preventDefault();

    if (!formData.designation.trim() || !formData.department) {
      alert("Please enter designation and select department.");
      return;
    }

    const newDesignation = {
      id: `#DSG${String(designations.length + 1).padStart(3, "0")}`,
      designation: formData.designation.trim(),
      department: formData.department,
      employees: 0,
      createdOn: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: formData.status,
    };

    setDesignations((prev) => [...prev, newDesignation]);

    setFormData({
      designation: "",
      department: "",
      status: "Active",
    });

    setShowAddForm(false);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this designation?"
    );

    if (!confirmed) return;

    setDesignations((prev) =>
      prev.filter((item) => item.id !== id)
    );

    setOpenMenu(null);
  };

  const handleEdit = (item) => {
    setFormData({
      designation: item.designation,
      department: item.department,
      status: item.status,
    });

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
              <h2>Add New Designation</h2>
              <p>Create a new employee designation.</p>
            </div>

            <button
              className={styles.closeButton}
              onClick={() => setShowAddForm(false)}
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
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className={styles.saveButton}
              >
                <FiSave size={16} />
                Save Designation
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
                      ? "Active"
                      : filterStatus === "Active"
                      ? "Inactive"
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
                          item.status === "Active"
                            ? styles.active
                            : styles.inactive
                        }`}
                      >
                        {item.status}
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
                                handleDelete(item.id)
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
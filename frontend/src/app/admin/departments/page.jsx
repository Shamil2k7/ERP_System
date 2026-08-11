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
  FiArrowDown,
  FiX,
  FiSave,
  FiFilter,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

import styles from "./departments.module.css";

const initialDepartments = [
  {
    id: "#DPT001",
    department: "Engineering",
    head: "Ethan Walker",
    employees: 45,
    createdOn: "11 Sep 2025",
    status: "Active",
  },
  {
    id: "#DPT002",
    department: "Design",
    head: "Madison Clark",
    employees: 18,
    createdOn: "05 Sep 2025",
    status: "Active",
  },
  {
    id: "#DPT003",
    department: "HR",
    head: "Avery Thompson",
    employees: 8,
    createdOn: "27 Aug 2025",
    status: "Active",
  },
  {
    id: "#DPT004",
    department: "Finance",
    head: "Benjamin Wright",
    employees: 12,
    createdOn: "16 Aug 2025",
    status: "Active",
  },
  {
    id: "#DPT005",
    department: "Sales",
    head: "Chloe Mitchell",
    employees: 25,
    createdOn: "25 Jul 2025",
    status: "Active",
  },
  {
    id: "#DPT006",
    department: "Marketing",
    head: "Grace Adams",
    employees: 14,
    createdOn: "12 Jul 2025",
    status: "Active",
  },
  {
    id: "#DPT007",
    department: "Operations",
    head: "Daniel Roberts",
    employees: 20,
    createdOn: "23 Jun 2025",
    status: "Active",
  },
  {
    id: "#DPT008",
    department: "Support",
    head: "Hannah Scott",
    employees: 10,
    createdOn: "18 May 2025",
    status: "Inactive",
  },
];

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState(initialDepartments);

  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const [sortOrder, setSortOrder] = useState("default");

  const [formData, setFormData] = useState({
    department: "",
    code: "",
    head: "",
    employees: "",
    status: "Active",
  });

  /* =========================
     SEARCH
  ========================= */

  const filteredDepartments = useMemo(() => {
    let result = departments.filter((item) => {
      const keyword = search.toLowerCase();

      return (
        item.id.toLowerCase().includes(keyword) ||
        item.department.toLowerCase().includes(keyword) ||
        item.head.toLowerCase().includes(keyword) ||
        item.status.toLowerCase().includes(keyword)
      );
    });

    if (sortOrder === "asc") {
      result.sort((a, b) =>
        a.department.localeCompare(b.department)
      );
    }

    if (sortOrder === "desc") {
      result.sort((a, b) =>
        b.department.localeCompare(a.department)
      );
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
     ADD DEPARTMENT
  ========================= */

  const handleAddDepartment = (e) => {
    e.preventDefault();

    if (!formData.department.trim()) {
      alert("Please enter department name");
      return;
    }

    if (!formData.code.trim()) {
      alert("Please enter department code");
      return;
    }

    if (!formData.head.trim()) {
      alert("Please enter department head");
      return;
    }

    const newDepartment = {
      id: `#DPT${String(departments.length + 1).padStart(3, "0")}`,
      department: formData.department,
      head: formData.head,
      employees: Number(formData.employees) || 0,
      createdOn: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: formData.status,
    };

    setDepartments((prev) => [newDepartment, ...prev]);

    setFormData({
      department: "",
      code: "",
      head: "",
      employees: "",
      status: "Active",
    });

    setShowAdd(false);
  };

  /* =========================
     DELETE
  ========================= */

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this department?"
    );

    if (!confirmed) return;

    setDepartments((prev) =>
      prev.filter((item) => item.id !== id)
    );

    setOpenMenu(null);
  };

  /* =========================
     EDIT
  ========================= */

  const handleEdit = (item) => {
    setFormData({
      department: item.department,
      code: item.id.replace("#", ""),
      head: item.head,
      employees: item.employees,
      status: item.status,
    });

    setShowAdd(true);
    setOpenMenu(null);
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
            onClick={() => setShowAdd((prev) => !prev)}
          >
            {showAdd ? <FiX size={17} /> : <FiPlus size={17} />}

            {showAdd ? "Close" : "Add New"}
          </button>

        </div>
      </header>

      {/* =========================
          ADD DEPARTMENT FORM
      ========================= */}

      {showAdd && (
        <section className={styles.addCard}>

          <div className={styles.addHeader}>
            <div>
              <h2>Add Department</h2>
              <p>
                Create a new department and assign the department head.
              </p>
            </div>

            <button
              className={styles.closeButton}
              onClick={() => setShowAdd(false)}
            >
              <FiX />
            </button>
          </div>

          <form
            className={styles.form}
            onSubmit={handleAddDepartment}
          >

            {/* Department */}

            <div className={styles.formGroup}>
              <label>
                Department Name <span>*</span>
              </label>

              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Enter department name"
              />
            </div>

            {/* Code */}

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

            {/* Head */}

            <div className={styles.formGroup}>
              <label>
                Department Head <span>*</span>
              </label>

              <input
                type="text"
                name="head"
                value={formData.head}
                onChange={handleChange}
                placeholder="Enter department head"
              />
            </div>

            {/* Employees */}

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

            {/* Status */}

            <div className={styles.formGroup}>
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Buttons */}

            <div className={styles.formActions}>

              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => setShowAdd(false)}
              >
                <FiX size={16} />
                Cancel
              </button>

              <button
                type="submit"
                className={styles.saveButton}
              >
                <FiSave size={16} />
                Save Department
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

            <button className={styles.filterButton}>
              <FiFilter size={16} />
              Filter
              <FiChevronDown size={14} />
            </button>

            <button
              className={styles.sortButton}
              onClick={handleSort}
            >
              <FiArrowDown size={16} />

              Sort By

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

        {/* =========================
            TABLE
        ========================= */}

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

              {filteredDepartments.length > 0 ? (
                filteredDepartments.map((item) => (

                  <tr key={item.id}>

                    <td className={styles.code}>
                      {item.id}
                    </td>

                    <td>
                      <strong className={styles.departmentName}>
                        {item.department}
                      </strong>
                    </td>

                    <td>
                      {item.head}
                    </td>

                    <td>
                      {item.employees}
                    </td>

                    <td>
                      {item.createdOn}
                    </td>

                    <td>

                      <span
                        className={
                          item.status === "Active"
                            ? styles.activeStatus
                            : styles.inactiveStatus
                        }
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
                              <FiEdit2 size={14} />
                              Edit
                            </button>

                            <button
                              className={styles.deleteAction}
                              onClick={() =>
                                handleDelete(item.id)
                              }
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
                  <td
                    colSpan="7"
                    className={styles.empty}
                  >
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
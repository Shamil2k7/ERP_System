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
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

import styles from "./viewUnits.module.css";

const initialUnits = [
  {
    id: 1,
    name: "Kilogram",
    shortName: "kg",
    products: 30,
    status: "Active",
  },
  {
    id: 2,
    name: "Liter",
    shortName: "l",
    products: 40,
    status: "Active",
  },
  {
    id: 3,
    name: "Dozen",
    shortName: "dz",
    products: 60,
    status: "Active",
  },
  {
    id: 4,
    name: "Piece",
    shortName: "pcs",
    products: 80,
    status: "Active",
  },
  {
    id: 5,
    name: "Box",
    shortName: "bxs",
    products: 120,
    status: "Active",
  },
  {
    id: 6,
    name: "Pair",
    shortName: "pr",
    products: 25,
    status: "Active",
  },
  {
    id: 7,
    name: "Bundle",
    shortName: "bn",
    products: 13,
    status: "Active",
  },
  {
    id: 8,
    name: "Gram",
    shortName: "g",
    products: 6,
    status: "Active",
  },
  {
    id: 9,
    name: "Meter",
    shortName: "m",
    products: 3,
    status: "Active",
  },
  {
    id: 10,
    name: "Centimeter",
    shortName: "cm",
    products: 10,
    status: "Active",
  },
];

const emptyForm = {
  name: "",
  shortName: "",
  status: "Active",
};

export default function UnitsPage() {
  const [units, setUnits] = useState(initialUnits);

  const [search, setSearch] = useState("");

  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState(emptyForm);

  const [editingId, setEditingId] = useState(null);

  const [openMenu, setOpenMenu] = useState(null);

  const [sortOrder, setSortOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(10);

  // =========================
  // SEARCH
  // =========================

  const filteredUnits = useMemo(() => {
    const result = units.filter((unit) => {
      const searchValue = search.toLowerCase();

      return (
        unit.name.toLowerCase().includes(searchValue) ||
        unit.shortName.toLowerCase().includes(searchValue) ||
        unit.status.toLowerCase().includes(searchValue)
      );
    });

    return [...result].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      }

      return b.name.localeCompare(a.name);
    });
  }, [units, search, sortOrder]);

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(
    filteredUnits.length / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedUnits = filteredUnits.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // =========================
  // FORM CHANGE
  // =========================

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // ADD / EDIT FORM
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.shortName.trim()) {
      return;
    }

    if (editingId) {
      setUnits((prev) =>
        prev.map((unit) =>
          unit.id === editingId
            ? {
                ...unit,
                name: formData.name,
                shortName: formData.shortName,
                status: formData.status,
              }
            : unit
        )
      );
    } else {
      const newUnit = {
        id: Date.now(),
        name: formData.name,
        shortName: formData.shortName,
        products: 0,
        status: formData.status,
      };

      setUnits((prev) => [...prev, newUnit]);
    }

    setFormData(emptyForm);
    setEditingId(null);
    setShowAddForm(false);
  };

  // =========================
  // OPEN ADD FORM
  // =========================

  const handleAddNew = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowAddForm(true);
    setOpenMenu(null);
  };

  // =========================
  // EDIT
  // =========================

  const handleEdit = (unit) => {
    setFormData({
      name: unit.name,
      shortName: unit.shortName,
      status: unit.status,
    });

    setEditingId(unit.id);
    setShowAddForm(true);
    setOpenMenu(null);
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this unit?"
    );

    if (!confirmed) return;

    setUnits((prev) =>
      prev.filter((unit) => unit.id !== id)
    );

    setOpenMenu(null);
  };

  // =========================
  // CANCEL
  // =========================

  const handleCancel = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowAddForm(false);
  };

  // =========================
  // SORT
  // =========================

  const handleSort = () => {
    setSortOrder((prev) =>
      prev === "asc" ? "desc" : "asc"
    );
  };

  // =========================
  // REFRESH
  // =========================

  const handleRefresh = () => {
    setSearch("");
    setCurrentPage(1);
    setSortOrder("asc");
    setOpenMenu(null);
  };

  // =========================
  // PRINT
  // =========================

  const handlePrint = () => {
    window.print();
  };

  // =========================
  // EXPORT CSV
  // =========================

  const handleExport = () => {
    const headers = [
      "Unit",
      "Short Name",
      "No of Products",
      "Status",
    ];

    const rows = units.map((unit) => [
      unit.name,
      unit.shortName,
      unit.products,
      unit.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "units.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // =========================
  // PAGE CHANGE
  // =========================

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
  };

  return (
    <div className={styles.page}>
      {/* =========================
          HEADER
      ========================= */}

      <div className={styles.header}>
        <div>
          <h1>Units</h1>
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={handlePrint}
          >
            <FiPrinter size={15} />
            Print
          </button>

          <button
            type="button"
            className={styles.secondaryButton}
            onClick={handleExport}
          >
            <FiDownload size={15} />
            Export
            <FiChevronDown size={14} />
          </button>

          <button
            type="button"
            className={styles.addButton}
            onClick={handleAddNew}
          >
            <FiPlus size={17} />
            Add New
          </button>
        </div>
      </div>

      {/* =========================
          ADD / EDIT AREA
      ========================= */}

      {showAddForm && (
        <div className={styles.addCard}>
          <div className={styles.addHeader}>
            <div>
              <h2>
                {editingId ? "Edit Unit" : "Add New Unit"}
              </h2>

              <p>
                {editingId
                  ? "Update unit information"
                  : "Create a new unit for your products"}
              </p>
            </div>

            <button
              type="button"
              className={styles.closeButton}
              onClick={handleCancel}
            >
              <FiX size={18} />
            </button>
          </div>

          <form
            className={styles.unitForm}
            onSubmit={handleSubmit}
          >
            <div className={styles.formGroup}>
              <label htmlFor="name">
                Unit Name <span>*</span>
              </label>

              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="Example: Kilogram"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="shortName">
                Short Name <span>*</span>
              </label>

              <input
                id="shortName"
                name="shortName"
                value={formData.shortName}
                onChange={handleFormChange}
                placeholder="Example: kg"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="status">
                Status
              </label>

              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleFormChange}
              >
                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>
            </div>

            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="submit"
                className={styles.saveButton}
              >
                <FiSave size={16} />

                {editingId
                  ? "Update Unit"
                  : "Save Unit"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* =========================
          TABLE CARD
      ========================= */}

      <div className={styles.tableCard}>
        {/* TOOLBAR */}

        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <FiSearch size={18} />

            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className={styles.toolbarRight}>
            <button
              type="button"
              className={styles.sortButton}
              onClick={handleSort}
            >
              <FiArrowDown size={16} />

              Sort By

              <FiChevronDown size={15} />
            </button>

            <button
              type="button"
              className={styles.iconButton}
              title="Refresh"
              onClick={handleRefresh}
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
                <th>Unit</th>
                <th>Short Name</th>
                <th>No of Products</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedUnits.length > 0 ? (
                paginatedUnits.map((unit) => (
                  <tr key={unit.id}>
                    <td>
                      <strong className={styles.unitName}>
                        {unit.name}
                      </strong>
                    </td>

                    <td>
                      <span className={styles.shortName}>
                        {unit.shortName}
                      </span>
                    </td>

                    <td>
                      <span className={styles.products}>
                        {String(unit.products).padStart(
                          2,
                          "0"
                        )}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`${styles.status} ${
                          unit.status === "Active"
                            ? styles.active
                            : styles.inactive
                        }`}
                      >
                        {unit.status}
                      </span>
                    </td>

                    <td>
                      <div className={styles.actionWrapper}>
                        <button
                          type="button"
                          className={styles.actionButton}
                          onClick={() =>
                            setOpenMenu(
                              openMenu === unit.id
                                ? null
                                : unit.id
                            )
                          }
                        >
                          <FiMoreVertical size={17} />
                        </button>

                        {openMenu === unit.id && (
                          <div
                            className={
                              styles.actionMenu
                            }
                          >
                            <button
                              type="button"
                              onClick={() =>
                                handleEdit(unit)
                              }
                            >
                              <FiEdit2 size={14} />
                              Edit
                            </button>

                            <button
                              type="button"
                              className={
                                styles.deleteAction
                              }
                              onClick={() =>
                                handleDelete(unit.id)
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
                    colSpan="5"
                    className={styles.empty}
                  >
                    No units found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* =========================
            PAGINATION
        ========================= */}

        <div className={styles.pagination}>
          <div className={styles.showing}>
            Showing

            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(
                  Number(e.target.value)
                );
                setCurrentPage(1);
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>

            / Pages
          </div>

          <div className={styles.pages}>
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                handlePageChange(currentPage - 1)
              }
            >
              ‹
            </button>

            {Array.from(
              { length: totalPages || 1 },
              (_, index) => index + 1
            )
              .slice(0, 5)
              .map((page) => (
                <button
                  type="button"
                  key={page}
                  className={
                    currentPage === page
                      ? styles.activePage
                      : ""
                  }
                  onClick={() =>
                    handlePageChange(page)
                  }
                >
                  {page}
                </button>
              ))}

            <button
              type="button"
              disabled={
                currentPage === totalPages ||
                totalPages === 0
              }
              onClick={() =>
                handlePageChange(currentPage + 1)
              }
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
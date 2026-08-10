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

import styles from "./viewBrand.module.css";

const initialBrands = [
  {
    id: 1,
    name: "Apple",
    products: 30,
    status: "Active",
  },
  {
    id: 2,
    name: "Dell",
    products: 40,
    status: "Active",
  },
  {
    id: 3,
    name: "Bose",
    products: 60,
    status: "Active",
  },
  {
    id: 4,
    name: "Adidas",
    products: 80,
    status: "Active",
  },
  {
    id: 5,
    name: "Dyson",
    products: 120,
    status: "Active",
  },
  {
    id: 6,
    name: "Samsung",
    products: 25,
    status: "Active",
  },
  {
    id: 7,
    name: "Levi",
    products: 13,
    status: "Active",
  },
  {
    id: 8,
    name: "Giro",
    products: 6,
    status: "Active",
  },
  {
    id: 9,
    name: "Oneplus",
    products: 3,
    status: "Active",
  },
];

const initialForm = {
  name: "",
  status: "Active",
};

export default function BrandsPage() {
  const [brands, setBrands] = useState(initialBrands);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState(initialForm);

  const [editingId, setEditingId] = useState(null);

  const [openMenu, setOpenMenu] = useState(null);

  /* =========================
     FILTER
  ========================= */

  const filteredBrands = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) {
      return brands;
    }

    return brands.filter(
      (brand) =>
        brand.name.toLowerCase().includes(value) ||
        brand.status.toLowerCase().includes(value)
    );
  }, [brands, search]);

  /* =========================
     ADD NEW
  ========================= */

  const handleAddNew = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowForm(true);
    setOpenMenu(null);
  };

  /* =========================
     CANCEL FORM
  ========================= */

  const handleCancel = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowForm(false);
  };

  /* =========================
     FORM CHANGE
  ========================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================
     SAVE BRAND
  ========================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      return;
    }

    if (editingId !== null) {
      setBrands((prev) =>
        prev.map((brand) =>
          brand.id === editingId
            ? {
                ...brand,
                name: form.name.trim(),
                status: form.status,
              }
            : brand
        )
      );
    } else {
      const newBrand = {
        id: Date.now(),
        name: form.name.trim(),
        products: 0,
        status: form.status,
      };

      setBrands((prev) => [...prev, newBrand]);
    }

    handleCancel();
  };

  /* =========================
     EDIT
  ========================= */

  const handleEdit = (brand) => {
    setForm({
      name: brand.name,
      status: brand.status,
    });

    setEditingId(brand.id);
    setShowForm(true);
    setOpenMenu(null);
  };

  /* =========================
     DELETE
  ========================= */

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this brand?"
    );

    if (!confirmed) {
      return;
    }

    setBrands((prev) =>
      prev.filter((brand) => brand.id !== id)
    );

    setOpenMenu(null);
  };

  /* =========================
     REFRESH
  ========================= */

  const handleRefresh = () => {
    setSearch("");
    setOpenMenu(null);
  };

  /* =========================
     PRINT
  ========================= */

  const handlePrint = () => {
    window.print();
  };

  /* =========================
     EXPORT CSV
  ========================= */

  const handleExport = () => {
    const headers = [
      "Brand",
      "No of Products",
      "Status",
    ];

    const rows = brands.map((brand) => [
      brand.name,
      brand.products,
      brand.status,
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
    link.download = "brands.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.page}>
      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Brands</h1>
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
          ADD / EDIT BRAND FORM
      ========================= */}

      {showForm && (
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <div>
              <h2>
                {editingId !== null
                  ? "Edit Brand"
                  : "Add New Brand"}
              </h2>

              <p>
                {editingId !== null
                  ? "Update brand information"
                  : "Create a new product brand"}
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

          <form onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="brandName">
                  Brand Name
                  <span>*</span>
                </label>

                <input
                  id="brandName"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Apple"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="brandStatus">
                  Status
                </label>

                <select
                  id="brandStatus"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>
                </select>
              </div>
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

                {editingId !== null
                  ? "Update Brand"
                  : "Save Brand"}
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
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {search && (
              <button
                type="button"
                className={styles.clearSearch}
                onClick={() => setSearch("")}
              >
                <FiX size={15} />
              </button>
            )}
          </div>

          <div className={styles.toolbarRight}>
            <button
              type="button"
              className={styles.sortButton}
            >
              <FiArrowDown size={16} />
              Sort By
              <FiChevronDown size={14} />
            </button>

            <button
              type="button"
              className={styles.refreshButton}
              onClick={handleRefresh}
              title="Refresh"
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
                <th>Brand</th>
                <th>No of Products</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredBrands.length > 0 ? (
                filteredBrands.map((brand) => (
                  <tr key={brand.id}>
                    <td>
                      <strong>{brand.name}</strong>
                    </td>

                    <td className={styles.productCount}>
                      {String(brand.products).padStart(
                        2,
                        "0"
                      )}
                    </td>

                    <td>
                      <span
                        className={
                          brand.status === "Active"
                            ? styles.activeStatus
                            : styles.inactiveStatus
                        }
                      >
                        {brand.status}
                      </span>
                    </td>

                    <td>
                      <div className={styles.actionWrapper}>
                        <button
                          type="button"
                          className={styles.actionButton}
                          onClick={() =>
                            setOpenMenu(
                              openMenu === brand.id
                                ? null
                                : brand.id
                            )
                          }
                        >
                          <FiMoreVertical size={17} />
                        </button>

                        {openMenu === brand.id && (
                          <div className={styles.actionMenu}>
                            <button
                              type="button"
                              onClick={() =>
                                handleEdit(brand)
                              }
                            >
                              <FiEdit2 size={14} />
                              Edit
                            </button>

                            <button
                              type="button"
                              className={styles.deleteAction}
                              onClick={() =>
                                handleDelete(brand.id)
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
                    colSpan="4"
                    className={styles.empty}
                  >
                    No brands found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* =========================
            FOOTER
        ========================= */}

        <div className={styles.tableFooter}>
          <div className={styles.showing}>
            Showing
            <select defaultValue="10">
              <option value="10">
                10 / Pages
              </option>

              <option value="20">
                20 / Pages
              </option>

              <option value="50">
                50 / Pages
              </option>
            </select>
          </div>

          <div className={styles.pagination}>
            <button
              type="button"
              className={styles.activePage}
            >
              1
            </button>

            <button type="button">2</button>

            <button type="button">3</button>

            <button
              type="button"
              className={styles.nextPage}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
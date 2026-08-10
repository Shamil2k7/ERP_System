"use client";

import { useMemo, useState } from "react";
import {
  FiPlus,
  FiPrinter,
  FiDownload,
  FiSearch,
  FiCalendar,
  FiChevronDown,
  FiMoreVertical,
  FiRefreshCw,
  FiArrowDown,
  FiX,
  FiSave,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

import styles from "./viewCategories.module.css";

const initialCategories = [
  {
    id: 1,
    name: "Smartphones",
    slug: "smartphones",
    products: 30,
    status: "Active",
  },
  {
    id: 2,
    name: "Computers",
    slug: "computers",
    products: 40,
    status: "Active",
  },
  {
    id: 3,
    name: "Headphones",
    slug: "headphones",
    products: 60,
    status: "Active",
  },
  {
    id: 4,
    name: "Footwear",
    slug: "footwear",
    products: 80,
    status: "Active",
  },
  {
    id: 5,
    name: "Appliances",
    slug: "appliances",
    products: 120,
    status: "Active",
  },
  {
    id: 6,
    name: "Beauty",
    slug: "beauty",
    products: 25,
    status: "Active",
  },
  {
    id: 7,
    name: "Apparel",
    slug: "apparel",
    products: 13,
    status: "Active",
  },
  {
    id: 8,
    name: "Accessories",
    slug: "accessories",
    products: 6,
    status: "Active",
  },
  {
    id: 9,
    name: "Stationery",
    slug: "stationery",
    products: 3,
    status: "Active",
  },
  {
    id: 10,
    name: "Furniture",
    slug: "furniture",
    products: 10,
    status: "Active",
  },
];

const initialForm = {
  name: "",
  slug: "",
  status: "Active",
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState(initialForm);

  const [editingId, setEditingId] = useState(null);

  const [openMenu, setOpenMenu] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredCategories = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) {
      return categories;
    }

    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(value) ||
        category.slug.toLowerCase().includes(value) ||
        category.status.toLowerCase().includes(value)
    );
  }, [categories, search]);

  const totalPages = Math.ceil(
    filteredCategories.length / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentCategories = filteredCategories.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  /* =========================
     OPEN ADD FORM
  ========================= */

  const handleAddNew = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowForm(true);
    setOpenMenu(null);
  };

  /* =========================
     CLOSE FORM
  ========================= */

  const handleCancel = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowForm(false);
  };

  /* =========================
     FORM CHANGE
  ========================= */

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================
     AUTO SLUG
  ========================= */

  const handleNameChange = (e) => {
    const name = e.target.value;

    setForm((prev) => ({
      ...prev,
      name,
      slug:
        editingId !== null
          ? prev.slug
          : name
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, ""),
    }));
  };

  /* =========================
     SAVE CATEGORY
  ========================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      return;
    }

    if (editingId !== null) {
      setCategories((prev) =>
        prev.map((category) =>
          category.id === editingId
            ? {
                ...category,
                name: form.name,
                slug: form.slug,
                status: form.status,
              }
            : category
        )
      );
    } else {
      const newCategory = {
        id: Date.now(),
        name: form.name,
        slug: form.slug,
        products: 0,
        status: form.status,
      };

      setCategories((prev) => [...prev, newCategory]);
    }

    handleCancel();
  };

  /* =========================
     EDIT
  ========================= */

  const handleEdit = (category) => {
    setForm({
      name: category.name,
      slug: category.slug,
      status: category.status,
    });

    setEditingId(category.id);
    setShowForm(true);
    setOpenMenu(null);
  };

  /* =========================
     DELETE
  ========================= */

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) {
      return;
    }

    setCategories((prev) =>
      prev.filter((category) => category.id !== id)
    );

    setOpenMenu(null);
  };

  /* =========================
     REFRESH
  ========================= */

  const handleRefresh = () => {
    setSearch("");
    setCurrentPage(1);
    setOpenMenu(null);
  };

  /* =========================
     PRINT
  ========================= */

  const handlePrint = () => {
    window.print();
  };

  /* =========================
     EXPORT
  ========================= */

  const handleExport = () => {
    const headers = [
      "Category",
      "Category Slug",
      "No of Products",
      "Status",
    ];

    const rows = categories.map((category) => [
      category.name,
      category.slug,
      category.products,
      category.status,
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
    link.download = "categories.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* =========================
     PAGE CHANGE
  ========================= */

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  return (
    <div className={styles.page}>
      {/* =========================
          HEADER
      ========================= */}

      <div className={styles.header}>
        <div>
          <h1>Categories</h1>
          <p>Manage your product categories</p>
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
          ADD / EDIT CATEGORY FORM
      ========================= */}

      {showForm && (
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <div>
              <h2>
                {editingId !== null
                  ? "Edit Category"
                  : "Add New Category"}
              </h2>

              <p>
                {editingId !== null
                  ? "Update category information"
                  : "Create a new product category"}
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
                <label htmlFor="categoryName">
                  Category Name
                  <span>*</span>
                </label>

                <input
                  id="categoryName"
                  name="name"
                  value={form.name}
                  onChange={handleNameChange}
                  placeholder="e.g. Smartphones"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="categorySlug">
                  Category Slug
                  <span>*</span>
                </label>

                <input
                  id="categorySlug"
                  name="slug"
                  value={form.slug}
                  onChange={handleFormChange}
                  placeholder="e.g. smartphones"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="categoryStatus">
                  Status
                </label>

                <select
                  id="categoryStatus"
                  name="status"
                  value={form.status}
                  onChange={handleFormChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
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
                  ? "Update Category"
                  : "Save Category"}
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

          <button
            type="button"
            className={styles.dateButton}
          >
            <FiCalendar size={16} />
            01 Jan 26 to 20 Jan 26
          </button>

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
                <th>Category</th>
                <th>Category Slug</th>
                <th>No of Products</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {currentCategories.length > 0 ? (
                currentCategories.map((category) => (
                  <tr key={category.id}>
                    <td>
                      <strong>{category.name}</strong>
                    </td>

                    <td className={styles.slug}>
                      {category.slug}
                    </td>

                    <td>{category.products}</td>

                    <td>
                      <span
                        className={
                          category.status === "Active"
                            ? styles.activeStatus
                            : styles.inactiveStatus
                        }
                      >
                        {category.status}
                      </span>
                    </td>

                    <td>
                      <div className={styles.actionWrapper}>
                        <button
                          type="button"
                          className={styles.actionButton}
                          onClick={() =>
                            setOpenMenu(
                              openMenu === category.id
                                ? null
                                : category.id
                            )
                          }
                        >
                          <FiMoreVertical size={17} />
                        </button>

                        {openMenu === category.id && (
                          <div className={styles.actionMenu}>
                            <button
                              type="button"
                              onClick={() =>
                                handleEdit(category)
                              }
                            >
                              <FiEdit2 size={14} />
                              Edit
                            </button>

                            <button
                              type="button"
                              className={styles.deleteAction}
                              onClick={() =>
                                handleDelete(category.id)
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
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}

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
              <option value={5}>5 / Pages</option>
              <option value={10}>10 / Pages</option>
              <option value={20}>20 / Pages</option>
            </select>
          </div>

          <div className={styles.pageNumbers}>
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                goToPage(currentPage - 1)
              }
            >
              ‹
            </button>

            {Array.from(
              { length: totalPages || 1 },
              (_, index) => index + 1
            ).map((page) => (
              <button
                type="button"
                key={page}
                className={
                  currentPage === page
                    ? styles.activePage
                    : ""
                }
                onClick={() => goToPage(page)}
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
                goToPage(currentPage + 1)
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
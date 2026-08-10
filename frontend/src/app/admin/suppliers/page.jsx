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
  FiPackage,
  FiHeadphones,
  FiShoppingBag,
  FiWatch,
  FiTool,
  FiSmartphone,
  FiBriefcase,
} from "react-icons/fi";

import styles from "./viewSuppliers.module.css";
const initialSuppliers = [
  {
    id: "#SUP0020",
    name: "Apex Computers",
    email: "apexcomputers@example.com",
    phone: "+1 (758) 364-7314",
    country: "Germany",
    status: "Active",
    icon: "computer",
  },
  {
    id: "#SUP0019",
    name: "Beats Headphones",
    email: "beatsheadphone@example.com",
    phone: "+1 (382) 764-2864",
    country: "Japan",
    status: "Active",
    icon: "headphone",
  },
  {
    id: "#SUP0018",
    name: "Dazzle Shoes",
    email: "dazzleshoes@example.com",
    phone: "+1 (648) 375-3145",
    country: "USA",
    status: "Active",
    icon: "shoe",
  },
  {
    id: "#SUP0017",
    name: "Best Accessories",
    email: "bestaccessories@example.com",
    phone: "+1 (325) 874-3284",
    country: "Austria",
    status: "Active",
    icon: "watch",
  },
  {
    id: "#SUP0016",
    name: "A-Z Store",
    email: "a2zstore@example.com",
    phone: "+1 (783) 856-6575",
    country: "Turkey",
    status: "Active",
    icon: "store",
  },
  {
    id: "#SUP0015",
    name: "Hatimi Hardwares",
    email: "hatimihardware@example.com",
    phone: "+1 (853) 475-3248",
    country: "Mexico",
    status: "Active",
    icon: "tool",
  },
  {
    id: "#SUP0014",
    name: "Aesthetic Bags",
    email: "aestheticbags@example.com",
    phone: "+1 (235) 745-7465",
    country: "France",
    status: "Active",
    icon: "bag",
  },
  {
    id: "#SUP0013",
    name: "Alpha Mobiles",
    email: "alphamobiles@example.com",
    phone: "+1 (756) 352-3425",
    country: "Greece",
    status: "Active",
    icon: "mobile",
  },
  {
    id: "#SUP0012",
    name: "Sigma Chairs",
    email: "sigmachair@example.com",
    phone: "+1 (602) 735-7453",
    country: "Italy",
    status: "Active",
    icon: "chair",
  },
  {
    id: "#SUP0011",
    name: "Zenith Bags",
    email: "zenithbags@example.com",
    phone: "+1 (453) 345-2486",
    country: "China",
    status: "Active",
    icon: "bag",
  },
];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  country: "",
  status: "Active",
};

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState(initialSuppliers);

  const [search, setSearch] = useState("");

  const [showAddForm, setShowAddForm] = useState(false);

  const [form, setForm] = useState(emptyForm);

  const [editingId, setEditingId] = useState(null);

  const [openMenu, setOpenMenu] = useState(null);

  const [sortOrder, setSortOrder] = useState("default");

  const [filterStatus, setFilterStatus] = useState("All");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowAddForm(true);
    setOpenMenu(null);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Supplier name is required.");
      return;
    }

    if (editingId) {
      setSuppliers((prev) =>
        prev.map((supplier) =>
          supplier.id === editingId
            ? {
                ...supplier,
                name: form.name,
                email: form.email,
                phone: form.phone,
                country: form.country,
                status: form.status,
              }
            : supplier
        )
      );
    } else {
      const newSupplier = {
        id: `#SUP${String(suppliers.length + 21).padStart(4, "0")}`,
        name: form.name,
        email: form.email,
        phone: form.phone,
        country: form.country,
        status: form.status,
        icon: "store",
      };

      setSuppliers((prev) => [newSupplier, ...prev]);
    }

    handleCancel();
  };

  const handleEdit = (supplier) => {
    setEditingId(supplier.id);

    setForm({
      name: supplier.name,
      email: supplier.email,
      phone: supplier.phone,
      country: supplier.country,
      status: supplier.status,
    });

    setShowAddForm(true);
    setOpenMenu(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this supplier?"
    );

    if (!confirmed) return;

    setSuppliers((prev) =>
      prev.filter((supplier) => supplier.id !== id)
    );

    setOpenMenu(null);
  };

  const handleSort = () => {
    setSortOrder((prev) =>
      prev === "default" ? "az" : prev === "az" ? "za" : "default"
    );
  };

  const handleRefresh = () => {
    setSearch("");
    setFilterStatus("All");
    setSortOrder("default");
    setOpenMenu(null);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const headers = [
      "ID",
      "Supplier",
      "Email",
      "Phone",
      "Country",
      "Status",
    ];

    const rows = suppliers.map((supplier) => [
      supplier.id,
      supplier.name,
      supplier.email,
      supplier.phone,
      supplier.country,
      supplier.status,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "suppliers.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const filteredSuppliers = useMemo(() => {
    let data = [...suppliers];

    if (search.trim()) {
      const query = search.toLowerCase();

      data = data.filter(
        (supplier) =>
          supplier.name.toLowerCase().includes(query) ||
          supplier.email.toLowerCase().includes(query) ||
          supplier.phone.toLowerCase().includes(query) ||
          supplier.country.toLowerCase().includes(query) ||
          supplier.id.toLowerCase().includes(query)
      );
    }

    if (filterStatus !== "All") {
      data = data.filter(
        (supplier) => supplier.status === filterStatus
      );
    }

    if (sortOrder === "az") {
      data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    if (sortOrder === "za") {
      data.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }

    return data;
  }, [suppliers, search, filterStatus, sortOrder]);

  const getSupplierIcon = (type) => {
    switch (type) {
      case "computer":
        return <FiPackage />;

      case "headphone":
        return <FiHeadphones />;

      case "shoe":
        return <FiShoppingBag />;

      case "watch":
        return <FiWatch />;

      case "tool":
        return <FiTool />;

      case "mobile":
        return <FiSmartphone />;

      case "chair":
        return <FiBriefcase />;

      case "bag":
        return <FiShoppingBag />;

      default:
        return <FiPackage />;
    }
  };

  const getIconClass = (type) => {
    switch (type) {
      case "computer":
        return styles.computer;

      case "headphone":
        return styles.headphone;

      case "shoe":
        return styles.shoe;

      case "watch":
        return styles.watch;

      case "tool":
        return styles.tool;

      case "mobile":
        return styles.mobile;

      case "chair":
        return styles.chair;

      case "bag":
        return styles.bag;

      default:
        return styles.store;
    }
  };

  return (
    <div className={styles.page}>

      {/* ================= HEADER ================= */}

      <div className={styles.header}>

        <h1>Suppliers</h1>

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

      {/* ================= ADD SUPPLIER FORM ================= */}

      {showAddForm && (
        <div className={styles.addCard}>

          <div className={styles.addHeader}>

            <div>
              <h2>
                {editingId
                  ? "Edit Supplier"
                  : "Add Supplier"}
              </h2>

              <p>
                {editingId
                  ? "Update supplier information"
                  : "Create a new supplier"}
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
            className={styles.supplierForm}
            onSubmit={handleSubmit}
          >

            <div className={styles.formGroup}>

              <label htmlFor="name">
                Supplier Name
              </label>

              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter supplier name"
                required
              />

            </div>

            <div className={styles.formGroup}>

              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="supplier@example.com"
              />

            </div>

            <div className={styles.formGroup}>

              <label htmlFor="phone">
                Phone
              </label>

              <input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 (000) 000-0000"
              />

            </div>

            <div className={styles.formGroup}>

              <label htmlFor="country">
                Country
              </label>

              <select
                id="country"
                name="country"
                value={form.country}
                onChange={handleChange}
              >
                <option value="">
                  Select Country
                </option>

                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="Germany">Germany</option>
                <option value="Japan">Japan</option>
                <option value="France">France</option>
                <option value="Italy">Italy</option>
                <option value="China">China</option>
                <option value="Australia">Australia</option>
                <option value="Canada">Canada</option>
                <option value="UAE">UAE</option>
              </select>

            </div>

            <div className={styles.formGroup}>

              <label htmlFor="status">
                Status
              </label>

              <select
                id="status"
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
                  ? "Update Supplier"
                  : "Save Supplier"}
              </button>

            </div>

          </form>

        </div>
      )}

      {/* ================= TABLE CARD ================= */}

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

          </div>

          <div className={styles.toolbarRight}>

            {/* FILTER */}

            <div className={styles.dropdownWrapper}>

              <button
                type="button"
                className={styles.toolbarButton}
                onClick={() =>
                  setFilterStatus((prev) =>
                    prev === "All"
                      ? "Active"
                      : prev === "Active"
                      ? "Inactive"
                      : "All"
                  )
                }
              >
                <FiFilter size={16} />

                Filter

                <FiChevronDown size={14} />

              </button>

            </div>

            {/* SORT */}

            <button
              type="button"
              className={styles.toolbarButton}
              onClick={handleSort}
            >
              <FiArrowDown size={15} />

              Sort By

              <FiChevronDown size={14} />

            </button>

            {/* COLUMN BUTTON */}

            <button
              type="button"
              className={styles.iconButton}
              title="Columns"
            >
              <span className={styles.columnIcon}>
                <span></span>
                <span></span>
              </span>
            </button>

            {/* REFRESH */}

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

        {/* ================= TABLE ================= */}

        <div className={styles.tableWrapper}>

          <table className={styles.table}>

            <thead>

              <tr>

                <th>ID</th>

                <th>Supplier</th>

                <th>Email</th>

                <th>Phone</th>

                <th>Country</th>

                <th>Status</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {filteredSuppliers.length > 0 ? (
                filteredSuppliers.map((supplier) => (

                  <tr key={supplier.id}>

                    <td className={styles.id}>
                      {supplier.id}
                    </td>

                    <td>

                      <div className={styles.supplierCell}>

                        <div
                          className={`${styles.supplierIcon} ${getIconClass(
                            supplier.icon
                          )}`}
                        >
                          {getSupplierIcon(
                            supplier.icon
                          )}
                        </div>

                        <strong>
                          {supplier.name}
                        </strong>

                      </div>

                    </td>

                    <td>
                      {supplier.email}
                    </td>

                    <td>
                      {supplier.phone}
                    </td>

                    <td>
                      {supplier.country}
                    </td>

                    <td>

                      <span
                        className={
                          supplier.status ===
                          "Active"
                            ? styles.active
                            : styles.inactive
                        }
                      >
                        {supplier.status}
                      </span>

                    </td>

                    <td>

                      <div
                        className={
                          styles.actionWrapper
                        }
                      >

                        <button
                          type="button"
                          className={
                            styles.actionButton
                          }
                          onClick={() =>
                            setOpenMenu(
                              openMenu ===
                                supplier.id
                                ? null
                                : supplier.id
                            )
                          }
                        >
                          <FiMoreVertical
                            size={17}
                          />
                        </button>

                        {openMenu ===
                          supplier.id && (

                          <div
                            className={
                              styles.actionMenu
                            }
                          >

                            <button
                              type="button"
                              onClick={() =>
                                handleEdit(
                                  supplier
                                )
                              }
                            >
                              <FiEdit2
                                size={14}
                              />

                              Edit
                            </button>

                            <button
                              type="button"
                              className={
                                styles.deleteItem
                              }
                              onClick={() =>
                                handleDelete(
                                  supplier.id
                                )
                              }
                            >
                              <FiTrash2
                                size={14}
                              />

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
                    No suppliers found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}
"use client";

import { useMemo, useState, useEffect } from "react";
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
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

import styles from "./viewUnits.module.css";

const emptyForm = {
  name: "",
  code: "",
  status: "ACTIVE",
};

export default function UnitsPage() {
  const [units, setUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/units");
      setUnits(response.data.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch units");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUnits = useMemo(() => {
    const result = units.filter((unit) => {
      const searchValue = search.toLowerCase();
      return (
        unit.name?.toLowerCase().includes(searchValue) ||
        unit.code?.toLowerCase().includes(searchValue) ||
        unit.status?.toLowerCase().includes(searchValue)
      );
    });

    return [...result].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      }
      return b.name.localeCompare(a.name);
    });
  }, [units, search, sortOrder]);

  const totalPages = Math.ceil(filteredUnits.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUnits = filteredUnits.slice(startIndex, startIndex + itemsPerPage);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.code.trim()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name.trim(),
        code: formData.code.trim(),
        status: formData.status.toUpperCase(),
      };

      if (editingId) {
        await axios.put(`http://localhost:5000/api/units/${editingId}`, payload);
        toast.success("Unit updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/units", payload);
        toast.success("Unit created successfully");
      }
      fetchUnits();
      handleCancel();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save unit");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddNew = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowAddForm(true);
    setOpenMenu(null);
  };

  const handleEdit = (unit) => {
    setFormData({
      name: unit.name,
      code: unit.code,
      status: unit.status,
    });
    setEditingId(unit.id);
    setShowAddForm(true);
    setOpenMenu(null);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this unit?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/units/${id}`);
      toast.success("Unit deleted successfully");
      fetchUnits();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete unit");
    }
    setOpenMenu(null);
  };

  const handleCancel = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleRefresh = () => {
    setSearch("");
    setCurrentPage(1);
    setSortOrder("asc");
    setOpenMenu(null);
    fetchUnits();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const headers = ["Unit", "Short Name", "No of Products", "Status"];
    const rows = units.map((unit) => [
      unit.name,
      unit.code,
      unit.products?.length || 0,
      unit.status,
    ]);
    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "units.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Units</h1>
        </div>
        <div className={styles.headerActions}>
          <button type="button" className={styles.secondaryButton} onClick={handlePrint}>
            <FiPrinter size={15} /> Print
          </button>
          <button type="button" className={styles.secondaryButton} onClick={handleExport}>
            <FiDownload size={15} /> Export
            <FiChevronDown size={14} />
          </button>
          <button type="button" className={styles.addButton} onClick={handleAddNew}>
            <FiPlus size={17} /> Add New
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className={styles.addCard}>
          <div className={styles.addHeader}>
            <div>
              <h2>{editingId ? "Edit Unit" : "Add New Unit"}</h2>
              <p>{editingId ? "Update unit information" : "Create a new unit for your products"}</p>
            </div>
            <button type="button" className={styles.closeButton} onClick={handleCancel}>
              <FiX size={18} />
            </button>
          </div>
          <form className={styles.unitForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Unit Name <span>*</span></label>
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
              <label htmlFor="shortName">Short Name <span>*</span></label>
              <input
                id="code"
                name="code"
                value={formData.code}
                onChange={handleFormChange}
                placeholder="Example: kg"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="status">Status</label>
              <select id="status" name="status" value={formData.status} onChange={handleFormChange}>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
            <div className={styles.formActions}>
              <button type="button" className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
              <button type="submit" className={styles.saveButton} disabled={isSubmitting}>
                {isSubmitting ? <Loader2 size={16} className={styles.spinner} /> : <FiSave size={16} />}
                {editingId ? "Update Unit" : "Save Unit"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.tableCard}>
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
            <button type="button" className={styles.sortButton} onClick={handleSort}>
              <FiArrowDown size={16} /> Sort By <FiChevronDown size={15} />
            </button>
            <button type="button" className={styles.iconButton} title="Refresh" onClick={handleRefresh}>
              <FiRefreshCw size={17} />
            </button>
          </div>
        </div>

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
              {isLoading ? (
                <tr>
                  <td colSpan="5" className={styles.empty}>
                    <Loader2 size={24} className={styles.spinner} />
                  </td>
                </tr>
              ) : paginatedUnits.length > 0 ? (
                paginatedUnits.map((unit) => (
                  <tr key={unit.id}>
                    <td><strong className={styles.unitName}>{unit.name}</strong></td>
                    <td><span className={styles.shortName}>{unit.code}</span></td>
                    <td><span className={styles.products}>{String(unit.products?.length || 0).padStart(2, "0")}</span></td>
                    <td>
                      <span className={`${styles.status} ${unit.status === "ACTIVE" ? styles.active : styles.inactive}`}>
                        {unit.status}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionWrapper}>
                        <button
                          type="button"
                          className={styles.actionButton}
                          onClick={() => setOpenMenu(openMenu === unit.id ? null : unit.id)}
                        >
                          <FiMoreVertical size={17} />
                        </button>
                        {openMenu === unit.id && (
                          <div className={styles.actionMenu}>
                            <button type="button" onClick={() => handleEdit(unit)}>
                              <FiEdit2 size={14} /> Edit
                            </button>
                            <button type="button" className={styles.deleteAction} onClick={() => handleDelete(unit.id)}>
                              <FiTrash2 size={14} /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className={styles.empty}>No units found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <div className={styles.showing}>
            Showing
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
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
            <button type="button" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>‹</button>
            {Array.from({ length: totalPages || 1 }, (_, index) => index + 1)
              .slice(0, 5)
              .map((page) => (
                <button
                  type="button"
                  key={page}
                  className={currentPage === page ? styles.activePage : ""}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
            <button type="button" disabled={currentPage === totalPages || totalPages === 0} onClick={() => handlePageChange(currentPage + 1)}>›</button>
          </div>
        </div>
      </div>
    </div>
  );
}
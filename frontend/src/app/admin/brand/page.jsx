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
  FiX,
  FiSave,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

import styles from "./viewBrand.module.css";

const initialForm = {
  name: "",
  status: "ACTIVE",
};

export default function BrandsPage() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/brands");
      setBrands(response.data.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch brands");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBrands = useMemo(() => {
    const value = search.toLowerCase().trim();
    if (!value) {
      return brands;
    }
    return brands.filter(
      (brand) =>
        brand.name?.toLowerCase().includes(value) ||
        brand.status?.toLowerCase().includes(value)
    );
  }, [brands, search]);

  const handleAddNew = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowForm(true);
    setOpenMenu(null);
  };

  const handleCancel = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        name: form.name.trim(),
        status: form.status.toUpperCase(),
      };

      if (editingId !== null) {
        await axios.put(`http://localhost:5000/api/brands/${editingId}`, payload);
        toast.success("Brand updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/brands", payload);
        toast.success("Brand created successfully");
      }
      fetchBrands();
      handleCancel();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save brand");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (brand) => {
    setForm({
      name: brand.name,
      status: brand.status,
    });
    setEditingId(brand.id);
    setShowForm(true);
    setOpenMenu(null);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this brand?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/brands/${id}`);
      toast.success("Brand deleted successfully");
      fetchBrands();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete brand");
    }
    setOpenMenu(null);
  };

  const handleRefresh = () => {
    setSearch("");
    setOpenMenu(null);
    fetchBrands();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const headers = ["Brand", "No of Products", "Status"];
    const rows = brands.map((brand) => [
      brand.name,
      brand.products?.length || 0,
      brand.status,
    ]);
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
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
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Brands</h1>
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

      {showForm && (
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <div>
              <h2>{editingId !== null ? "Edit Brand" : "Add New Brand"}</h2>
              <p>{editingId !== null ? "Update brand information" : "Create a new product brand"}</p>
            </div>
            <button type="button" className={styles.closeButton} onClick={handleCancel}>
              <FiX size={18} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="brandName">Brand Name<span>*</span></label>
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
                <label htmlFor="brandStatus">Status</label>
                <select id="brandStatus" name="status" value={form.status} onChange={handleChange}>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
            </div>
            <div className={styles.formActions}>
              <button type="button" className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
              <button type="submit" className={styles.saveButton} disabled={isSubmitting}>
                {isSubmitting ? <Loader2 size={16} className={styles.spinner} /> : <FiSave size={16} />}
                {editingId !== null ? "Update Brand" : "Save Brand"}
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
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button type="button" className={styles.clearSearch} onClick={() => setSearch("")}>
                <FiX size={15} />
              </button>
            )}
          </div>
          <div className={styles.toolbarRight}>
            <button type="button" className={styles.refreshButton} onClick={handleRefresh} title="Refresh">
              <FiRefreshCw size={17} />
            </button>
          </div>
        </div>

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
              {isLoading ? (
                <tr>
                  <td colSpan="4" className={styles.empty}>
                    <Loader2 size={24} className={styles.spinner} />
                  </td>
                </tr>
              ) : filteredBrands.length > 0 ? (
                filteredBrands.map((brand) => (
                  <tr key={brand.id}>
                    <td><strong>{brand.name}</strong></td>
                    <td className={styles.productCount}>
                      {String(brand.products?.length || 0).padStart(2, "0")}
                    </td>
                    <td>
                      <span className={brand.status === "ACTIVE" ? styles.activeStatus : styles.inactiveStatus}>
                        {brand.status}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionWrapper}>
                        <button
                          type="button"
                          className={styles.actionButton}
                          onClick={() => setOpenMenu(openMenu === brand.id ? null : brand.id)}
                        >
                          <FiMoreVertical size={17} />
                        </button>
                        {openMenu === brand.id && (
                          <div className={styles.actionMenu}>
                            <button type="button" onClick={() => handleEdit(brand)}>
                              <FiEdit2 size={14} /> Edit
                            </button>
                            <button type="button" className={styles.deleteAction} onClick={() => handleDelete(brand.id)}>
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
                  <td colSpan="4" className={styles.empty}>No brands found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
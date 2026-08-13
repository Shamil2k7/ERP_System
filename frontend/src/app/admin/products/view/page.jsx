"use client";

import { useMemo, useState, useEffect } from "react";
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import {
  FiSearch,
  FiCalendar,
  FiFilter,
  FiChevronDown,
  FiArrowUpDown,
  FiRefreshCw,
  FiMoreVertical,
  FiPrinter,
  FiDownload,
  FiPlus,
  FiBox,
  FiCheckCircle,
  FiAlertTriangle,
  FiXCircle,
} from "react-icons/fi";

import styles from "./products.module.css";
import { useAlert } from "@/context/AlertContext";

export default function ProductsPage() {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");
  const [openMenu, setOpenMenu] = useState(null);
  const { showSuccess, showError, showConfirm } = useAlert();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/products');
      if (res.data && res.data.data) {
        setProductsData(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setOpenMenu(null);
    showConfirm({
      title: "Delete Product",
      message: "Are you sure you want to delete this product from stock inventory? This action cannot be undone.",
      confirmText: "Delete Product",
      type: "danger",
      onConfirm: async () => {
        try {
          await axios.delete(`http://localhost:5000/api/products/${id}`);
          showSuccess("Product updated", "Product deleted successfully");
          fetchProducts();
        } catch (error) {
          showError("Product couldn't be deleted", "Failed to delete product. Active dependency exists.");
          console.error(error);
        }
      },
    });
  };

  const filteredProducts = useMemo(() => {
    let result = [...productsData];

    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter(
        (product) =>
          product.name?.toLowerCase().includes(keyword) ||
          product.code?.toLowerCase().includes(keyword) ||
          product.sku?.toLowerCase().includes(keyword) ||
          product.category?.name?.toLowerCase().includes(keyword) ||
          product.brand?.name?.toLowerCase().includes(keyword)
      );
    }

    if (statusFilter !== "All") {
      result = result.filter(
        (product) => {
          if (statusFilter === 'In Stock') return (product.inventories?.[0]?.quantity || 0) > (product.inventories?.[0]?.lowStock || 0);
          if (statusFilter === 'Low Stock') return (product.inventories?.[0]?.quantity || 0) > 0 && (product.inventories?.[0]?.quantity || 0) <= (product.inventories?.[0]?.lowStock || 10);
          if (statusFilter === 'No Stock') return (product.inventories?.[0]?.quantity || 0) === 0;
          return true;
        }
      );
    }

    if (sortBy === "Name") {
      result.sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
    }

    if (sortBy === "Price Low") {
      result.sort(
        (a, b) => parseFloat(a.sellingPrice || 0) - parseFloat(b.sellingPrice || 0)
      );
    }

    if (sortBy === "Price High") {
      result.sort(
        (a, b) => parseFloat(b.sellingPrice || 0) - parseFloat(a.sellingPrice || 0)
      );
    }

    if (sortBy === "Quantity") {
      result.sort(
        (a, b) => (b.inventories?.[0]?.quantity || 0) - (a.inventories?.[0]?.quantity || 0)
      );
    }

    return result;
  }, [search, statusFilter, sortBy, productsData]);

  const totalProducts = productsData.length;
  
  const inStock = productsData.filter(
    (product) => (product.inventories?.[0]?.quantity || 0) > 0
  ).length;

  const lowStock = productsData.filter(
    (product) => (product.inventories?.[0]?.quantity || 0) > 0 && (product.inventories?.[0]?.quantity || 0) <= (product.inventories?.[0]?.minimumStock || 10)
  ).length;

  const noStock = productsData.filter(
    (product) => (product.inventories?.[0]?.quantity || 0) === 0
  ).length;

  const getProductStatus = (product) => {
    const qty = product.inventories?.[0]?.quantity || 0;
    const minStock = product.inventories?.[0]?.minimumStock || 10;
    if (qty === 0) return "No Stock";
    if (qty <= minStock) return "Low Stock";
    return "In Stock";
  };

  const getStatusClass = (status) => {
    if (status === "In Stock") {
      return styles.inStock;
    }

    if (status === "Low Stock") {
      return styles.lowStock;
    }

    return styles.noStock;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const headers = [
      "Code",
      "Product",
      "SKU",
      "Category",
      "Brand",
      "Unit",
      "Quantity",
      "Status",
      "Selling Price",
      "Purchase Price",
    ];

    const rows = filteredProducts.map((product) => [
      product.code || 'N/A',
      product.name || 'N/A',
      product.sku || 'N/A',
      product.category?.name || 'N/A',
      product.brand?.name || 'N/A',
      product.baseUnit || 'N/A',
      product.inventories?.[0]?.quantity || 0,
      getProductStatus(product),
      product.sellingPrice || 0,
      product.costPrice || 0,
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
    link.download = "products.csv";

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <main className={styles.page}>
      <Toaster position="top-right" />
      {/* =========================
          HEADER
      ========================= */}

      <div className={styles.header}>

        <div>
          <h1>Products</h1>
        </div>

        <div className={styles.headerActions}>

          <button
            className={styles.secondaryButton}
            onClick={handlePrint}
          >
            <FiPrinter />
            Print
          </button>

          <button
            className={styles.secondaryButton}
            onClick={handleExport}
          >
            <FiDownload />
            Export
            <FiChevronDown />
          </button>

          <button
            className={styles.addButton}
            onClick={() => {
              window.location.href =
                "/admin/products/add";
            }}
          >
            <FiPlus />
            Add New
          </button>

        </div>
      </div>

      {/* =========================
          STAT CARDS
      ========================= */}

      <div className={styles.statsGrid}>

        {/* Total */}

        <div className={styles.statCard}>

          <div>
            <p>Total Products</p>

            <h2>{totalProducts}</h2>

            <span className={styles.growth}>
              ↗ 5.62
            </span>
          </div>

          <div
            className={`${styles.statIcon} ${styles.greenIcon}`}
          >
            <FiBox />
          </div>

        </div>

        {/* In Stock */}

        <div className={styles.statCard}>

          <div>
            <p>In Stock</p>

            <h2>{inStock}</h2>

            <span className={styles.growth}>
              ↗ 2.25
            </span>
          </div>

          <div
            className={`${styles.statIcon} ${styles.blueIcon}`}
          >
            <FiCheckCircle />
          </div>

        </div>

        {/* Low Stock */}

        <div className={styles.statCard}>

          <div>
            <p>Low Stock</p>

            <h2>{lowStock}</h2>

            <span className={styles.alertText}>
              Alerts Active
            </span>
          </div>

          <div
            className={`${styles.statIcon} ${styles.orangeIcon}`}
          >
            <FiAlertTriangle />
          </div>

        </div>

        {/* No Stock */}

        <div className={styles.statCard}>

          <div>
            <p>No Stock</p>

            <h2>{noStock}</h2>

            <span className={styles.alertText}>
              Needs reorder
            </span>
          </div>

          <div
            className={`${styles.statIcon} ${styles.redIcon}`}
          >
            <FiXCircle />
          </div>

        </div>

      </div>

      {/* =========================
          PRODUCT TABLE CARD
      ========================= */}

      <section className={styles.tableCard}>

        {/* Toolbar */}

        <div className={styles.toolbar}>

          {/* Search */}

          <div className={styles.searchBox}>

            <FiSearch />

            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          {/* Date */}

          <button className={styles.dateButton}>
            <FiCalendar />

            <span>
              Today
            </span>
          </button>

          <div className={styles.toolbarRight}>

            {/* Filter */}

            <select
              className={styles.filterButton}
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="All">
                Filter
              </option>

              <option value="In Stock">
                In Stock
              </option>

              <option value="Low Stock">
                Low Stock
              </option>

              <option value="No Stock">
                No Stock
              </option>
            </select>

            {/* Sort */}

            <select
              className={styles.sortButton}
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
            >
              <option value="Latest">
                Sort By
              </option>

              <option value="Name">
                Name
              </option>

              <option value="Price Low">
                Price Low
              </option>

              <option value="Price High">
                Price High
              </option>

              <option value="Quantity">
                Quantity
              </option>
            </select>

            {/* Column button */}

            <button
              className={styles.iconButton}
              title="Columns"
            >
              <span>Ⅱ</span>
            </button>

            {/* Refresh */}

            <button
              className={styles.iconButton}
              title="Refresh"
              onClick={fetchProducts}
            >
              <FiRefreshCw />
            </button>

          </div>

        </div>

        {/* =========================
            TABLE
        ========================= */}

        <div className={styles.tableWrapper}>

          {loading ? (
             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
                <Loader2 className={styles.spinner} style={{ animation: 'spin 1s linear infinite' }} size={40} />
             </div>
          ) : (
          <table className={styles.table}>

            <thead>
              <tr>
                <th>Code</th>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Unit</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Selling Price</th>
                <th>Purchase Price</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const status = getProductStatus(product);
                  return (
                  <tr 
                    key={product.id}
                    onClick={() => window.location.href = `/admin/products/details/${product.id}`}
                    style={{ cursor: 'pointer' }}
                  >

                    <td className={styles.code}>
                      {product.code || `#${product.id?.substring(0,6)}`}
                    </td>

                    {/* Product */}

                    <td>

                      <div className={styles.productCell}>

                        <div
                          className={`${styles.productIcon} ${styles[product.iconType || 'default']}`}
                        >
                          {product.image ? (
                             <img src={product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image.startsWith('/') ? '' : '/'}${product.image}`} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                          ) : product.icon || <FiBox />}
                        </div>

                        <strong>
                          {product.name}
                        </strong>

                      </div>

                    </td>

                    <td>{product.sku}</td>

                    <td>
                      {product.category?.name || 'N/A'}
                    </td>

                    <td>
                      {product.brand?.name || 'N/A'}
                    </td>

                    <td>
                      {product.baseUnit || 'PCS'}
                    </td>

                    <td>
                      {String(product.inventories?.[0]?.quantity || 0).padStart(
                        2,
                        "0"
                      )}
                    </td>

                    {/* Status */}

                    <td>

                      <span
                        className={`${styles.status} ${getStatusClass(status)}`}
                      >
                        {status}
                      </span>

                    </td>

                    {/* Selling Price */}

                    <td className={styles.price}>
                      ${product.sellingPrice}
                    </td>

                    {/* Purchase Price */}

                    <td className={styles.price}>
                      ${product.costPrice}
                    </td>

                    {/* Action */}

                    <td>

                      <div className={styles.actionWrapper}>

                        <button
                          className={styles.actionButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenu(
                              openMenu === product.id
                                ? null
                                : product.id
                            );
                          }}
                        >
                          <FiMoreVertical />
                        </button>

                        {openMenu === product.id && (

                          <div
                            className={
                              styles.actionMenu
                            }
                          >
                            <button onClick={(e) => { e.stopPropagation(); window.location.href = `/admin/products/details/${product.id}`; }}>
                              View
                            </button>

                            <button onClick={(e) => { e.stopPropagation(); window.location.href = `/admin/products/edit/${product.id}`; }}>
                              Edit
                            </button>

                            <button onClick={(e) => { e.stopPropagation(); handleDelete(product.id); }} style={{ color: 'red' }}>
                              Delete
                            </button>
                          </div>

                        )}

                      </div>

                    </td>

                  </tr>

                )})
              ) : (

                <tr>
                  <td
                    colSpan="11"
                    className={styles.empty}
                  >
                    No products found
                  </td>
                </tr>

              )}

            </tbody>

          </table>
          )}
        </div>

      </section>

    </main>
  );
}
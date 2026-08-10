"use client";

import { useMemo, useState } from "react";
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

const productsData = [
  {
    id: 20,
    code: "#PRD0020",
    name: "Apple iPhone 15",
    sku: "APP-PH-15",
    category: "Smartphones",
    brand: "Apple",
    unit: "Piece",
    quantity: 2,
    status: "Low Stock",
    sellingPrice: 250,
    purchasePrice: 230,
    icon: "",
    iconType: "apple",
  },
  {
    id: 19,
    code: "#PRD0019",
    name: "Dell XPS 13 9310",
    sku: "DEL-LAP-9310",
    category: "Computers",
    brand: "Dell",
    unit: "Piece",
    quantity: 12,
    status: "In Stock",
    sellingPrice: 300,
    purchasePrice: 280,
    icon: "▱",
    iconType: "laptop",
  },
  {
    id: 18,
    code: "#PRD0018",
    name: "Bose QuietComfort 45",
    sku: "BOS-HD-45",
    category: "Headphones",
    brand: "Bose",
    unit: "Piece",
    quantity: 15,
    status: "In Stock",
    sellingPrice: 100,
    purchasePrice: 80,
    icon: "♬",
    iconType: "headphone",
  },
  {
    id: 17,
    code: "#PRD0017",
    name: "Adidas Running Shoe",
    sku: "ADI-SHO-RUN",
    category: "Footwear",
    brand: "Adidas",
    unit: "Pack",
    quantity: 20,
    status: "In Stock",
    sellingPrice: 400,
    purchasePrice: 380,
    icon: "⌁",
    iconType: "shoe",
  },
  {
    id: 16,
    code: "#PRD0016",
    name: "Dyson Vacuum Cleaner",
    sku: "DYS-VC-100",
    category: "Appliances",
    brand: "Dyson",
    unit: "Piece",
    quantity: 8,
    status: "In Stock",
    sellingPrice: 750,
    purchasePrice: 730,
    icon: "♧",
    iconType: "vacuum",
  },
  {
    id: 15,
    code: "#PRD0015",
    name: "Apple AirPods Pro",
    sku: "APP-EAR-PRO",
    category: "Headphones",
    brand: "Apple",
    unit: "Piece",
    quantity: 25,
    status: "In Stock",
    sellingPrice: 120,
    purchasePrice: 100,
    icon: "♧",
    iconType: "airpods",
  },
  {
    id: 14,
    code: "#PRD0014",
    name: "Levi's Original Fit Jeans",
    sku: "LEV-JEA-001",
    category: "Apparel",
    brand: "Levi",
    unit: "Piece",
    quantity: 13,
    status: "In Stock",
    sellingPrice: 500,
    purchasePrice: 480,
    icon: "♧",
    iconType: "shirt",
  },
  {
    id: 13,
    code: "#PRD0013",
    name: "Giro Syntax Helmet",
    sku: "GIR-HEL-01",
    category: "Accessories",
    brand: "Giro",
    unit: "Piece",
    quantity: 6,
    status: "In Stock",
    sellingPrice: 250,
    purchasePrice: 220,
    icon: "♧",
    iconType: "helmet",
  },
  {
    id: 12,
    code: "#PRD0012",
    name: "Samsung Galaxy S24",
    sku: "SAM-GAL-S24",
    category: "Smartphones",
    brand: "Samsung",
    unit: "Piece",
    quantity: 0,
    status: "No Stock",
    sellingPrice: 800,
    purchasePrice: 750,
    icon: "S",
    iconType: "samsung",
  },
];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");
  const [openMenu, setOpenMenu] = useState(null);

  const filteredProducts = useMemo(() => {
    let result = [...productsData];

    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(keyword) ||
          product.code.toLowerCase().includes(keyword) ||
          product.sku.toLowerCase().includes(keyword) ||
          product.category.toLowerCase().includes(keyword) ||
          product.brand.toLowerCase().includes(keyword)
      );
    }

    if (statusFilter !== "All") {
      result = result.filter(
        (product) => product.status === statusFilter
      );
    }

    if (sortBy === "Name") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    if (sortBy === "Price Low") {
      result.sort(
        (a, b) => a.sellingPrice - b.sellingPrice
      );
    }

    if (sortBy === "Price High") {
      result.sort(
        (a, b) => b.sellingPrice - a.sellingPrice
      );
    }

    if (sortBy === "Quantity") {
      result.sort(
        (a, b) => b.quantity - a.quantity
      );
    }

    return result;
  }, [search, statusFilter, sortBy]);

  const totalProducts = productsData.length;
  const inStock = productsData.filter(
    (product) => product.quantity > 0
  ).length;

  const lowStock = productsData.filter(
    (product) => product.status === "Low Stock"
  ).length;

  const noStock = productsData.filter(
    (product) => product.quantity === 0
  ).length;

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
      product.code,
      product.name,
      product.sku,
      product.category,
      product.brand,
      product.unit,
      product.quantity,
      product.status,
      product.sellingPrice,
      product.purchasePrice,
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
              3 new alerts
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
              01 Jan 26 to 20 Jan 26
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
              onClick={() => window.location.reload()}
            >
              <FiRefreshCw />
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
                filteredProducts.map((product) => (

                  <tr key={product.id}>

                    <td className={styles.code}>
                      {product.code}
                    </td>

                    {/* Product */}

                    <td>

                      <div className={styles.productCell}>

                        <div
                          className={`${styles.productIcon} ${styles[product.iconType]}`}
                        >
                          {product.icon}
                        </div>

                        <strong>
                          {product.name}
                        </strong>

                      </div>

                    </td>

                    <td>{product.sku}</td>

                    <td>
                      {product.category}
                    </td>

                    <td>
                      {product.brand}
                    </td>

                    <td>
                      {product.unit}
                    </td>

                    <td>
                      {String(product.quantity).padStart(
                        2,
                        "0"
                      )}
                    </td>

                    {/* Status */}

                    <td>

                      <span
                        className={`${styles.status} ${getStatusClass(
                          product.status
                        )}`}
                      >
                        {product.status}
                      </span>

                    </td>

                    {/* Selling Price */}

                    <td className={styles.price}>
                      ${product.sellingPrice}
                    </td>

                    {/* Purchase Price */}

                    <td className={styles.price}>
                      ${product.purchasePrice}
                    </td>

                    {/* Action */}

                    <td>

                      <div className={styles.actionWrapper}>

                        <button
                          className={styles.actionButton}
                          onClick={() =>
                            setOpenMenu(
                              openMenu === product.id
                                ? null
                                : product.id
                            )
                          }
                        >
                          <FiMoreVertical />
                        </button>

                        {openMenu === product.id && (

                          <div
                            className={
                              styles.actionMenu
                            }
                          >
                            <button>
                              View
                            </button>

                            <button>
                              Edit
                            </button>

                            <button>
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
                    colSpan="11"
                    className={styles.empty}
                  >
                    No products found
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
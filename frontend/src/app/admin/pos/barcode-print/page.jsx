"use client";

import React, { useState, useMemo, useEffect } from "react";
import Barcode from "react-barcode";
import { toast, Toaster } from "react-hot-toast";
import { useSettings } from "@/context/SettingsContext";
import {
  FiPrinter,
  FiSearch,
  FiCheckSquare,
  FiSquare,
  FiSliders,
  FiGrid,
  FiPlus,
  FiMinus,
  FiRefreshCw,
  FiTag,
  FiCopy,
  FiEye,
  FiCheck,
} from "react-icons/fi";

import styles from "./barcodePrint.module.css";

// Sample initial products for interactive barcode generator UI
const initialProductsList = [
  {
    id: "1",
    name: "Wireless Ergonomic Mouse",
    sku: "WEM-001",
    code: "8901234567891",
    category: "Accessories",
    price: 29.99,
    qty: 5,
    selected: true,
  },
  {
    id: "2",
    name: "Mechanical Gaming Keyboard RGB",
    sku: "MGK-002",
    code: "8901234567892",
    category: "Accessories",
    price: 89.99,
    qty: 3,
    selected: true,
  },
  {
    id: "3",
    name: '27" 4K UHD Monitor HDR',
    sku: "MON-003",
    code: "8901234567893",
    category: "Monitors",
    price: 349.99,
    qty: 1,
    selected: false,
  },
  {
    id: "4",
    name: "USB-C Multiport Adapter Hub",
    sku: "HUB-004",
    code: "8901234567894",
    category: "Accessories",
    price: 45.0,
    qty: 10,
    selected: true,
  },
  {
    id: "5",
    name: "Noise Cancelling Headphones",
    sku: "NCH-005",
    code: "8901234567895",
    category: "Electronics",
    price: 129.99,
    qty: 2,
    selected: false,
  },
];

export default function BarcodePrintPage() {
  const { settings } = useSettings();
  const [products, setProducts] = useState(initialProductsList);
  const [activeTab, setActiveTab] = useState("products"); // "products" | "preview"
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Customization Settings
  const [storeName, setStoreName] = useState(settings?.companyName || "ERP Enterprise Store");

  useEffect(() => {
    if (settings?.companyName) {
      setStoreName(settings.companyName);
    }
  }, [settings?.companyName]);

  const [paperFormat, setPaperFormat] = useState("grid40"); // grid40 | grid30 | grid24 | gridSingle | gridRoll
  const [barcodeFormat, setBarcodeFormat] = useState("CODE128");
  const [barcodeHeight, setBarcodeHeight] = useState(38);
  const [barcodeWidth, setBarcodeWidth] = useState(1.2);
  const [fontSize, setFontSize] = useState(11);


  // Toggles
  const [showStoreName, setShowStoreName] = useState(true);
  const [showProductName, setShowProductName] = useState(true);
  const [showSKU, setShowSKU] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const [showBarcodeText, setShowBarcodeText] = useState(true);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(initialProductsList.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, []);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const q = search.toLowerCase();
      const matchesSearch =
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q);
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  // Selected products for labels sheet
  const selectedProducts = useMemo(() => {
    return products.filter((p) => p.selected && p.qty > 0);
  }, [products]);

  // Total Labels count
  const totalLabelsCount = useMemo(() => {
    return selectedProducts.reduce((acc, curr) => acc + (curr.qty || 0), 0);
  }, [selectedProducts]);

  // Expand selected items by quantity into individual label cards
  const labelItemsList = useMemo(() => {
    const items = [];
    selectedProducts.forEach((p) => {
      for (let i = 0; i < p.qty; i++) {
        items.push({ ...p, labelIndex: i + 1 });
      }
    });
    return items;
  }, [selectedProducts]);

  // Handlers
  const handleToggleSelect = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleToggleSelectAll = () => {
    const allSelected = filteredProducts.every((p) => p.selected);
    setProducts((prev) =>
      prev.map((p) => {
        if (filteredProducts.some((fp) => fp.id === p.id)) {
          return { ...p, selected: !allSelected };
        }
        return p;
      })
    );
  };

  const handleQtyChange = (id, delta) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newQty = Math.max(1, (p.qty || 1) + delta);
          return { ...p, qty: newQty, selected: true };
        }
        return p;
      })
    );
  };

  const handleDirectQtyInput = (id, val) => {
    const parsed = parseInt(val, 10);
    const newQty = isNaN(parsed) || parsed < 0 ? 0 : parsed;
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, qty: newQty, selected: newQty > 0 } : p
      )
    );
  };

  const handleBatchSetQty = (qty) => {
    setProducts((prev) =>
      prev.map((p) => (p.selected ? { ...p, qty } : p))
    );
    toast.success(`Set print quantity to ${qty} for selected items`);
  };

  const handlePrint = () => {
    if (labelItemsList.length === 0) {
      toast.error("Please select at least one product with quantity > 0 to print.");
      return;
    }
    window.print();
  };

  return (
    <div className={styles.pageContainer}>
      <Toaster position="top-right" />

      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h1>
            <FiTag className={styles.titleIcon} />
            Barcode Generator & Label Printer
          </h1>
          <p>
            Generate, customize, and print high-density barcodes & price tags for
            inventory.
          </p>
        </div>

        <div className={styles.headerActions}>
          <button
            className={styles.secondaryButton}
            onClick={() => setActiveTab(activeTab === "products" ? "preview" : "products")}
          >
            <FiEye size={16} />
            {activeTab === "products" ? "View Print Sheet" : "Edit Selection"}
          </button>

          <button className={styles.primaryButton} onClick={handlePrint}>
            <FiPrinter size={17} />
            Print Barcodes ({totalLabelsCount})
          </button>
        </div>
      </header>

      {/* MAIN GRID */}
      <div className={styles.mainGrid}>
        {/* LEFT COLUMN: CUSTOMIZATION SETTINGS */}
        <aside className={styles.settingsCard}>
          <div className={styles.cardHeader}>
            <h3>
              <FiSliders size={18} /> Label & Print Settings
            </h3>
          </div>

          <div className={styles.formGroup}>
            <label>Paper Layout / Preset</label>
            <select
              className={styles.selectInput}
              value={paperFormat}
              onChange={(e) => setPaperFormat(e.target.value)}
            >
              <option value="grid40">40 Labels Per Sheet (A4 - 52.5mm x 29.7mm)</option>
              <option value="grid30">30 Labels Per Sheet (A4 - 70mm x 37.1mm)</option>
              <option value="grid24">24 Labels Per Sheet (A4 - 70mm x 42.3mm)</option>
              <option value="gridSingle">Single Sticker (50mm x 25mm Thermal)</option>
              <option value="gridRoll">Continuous Thermal Roll (80mm POS)</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Store / Header Name</label>
            <input
              type="text"
              className={styles.textInput}
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="e.g. ERP Store"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Barcode Symbology</label>
            <select
              className={styles.selectInput}
              value={barcodeFormat}
              onChange={(e) => setBarcodeFormat(e.target.value)}
            >
              <option value="CODE128">CODE128 (Standard)</option>
              <option value="EAN13">EAN-13</option>
              <option value="CODE39">CODE39</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Barcode Height</label>
            <div className={styles.sliderRow}>
              <input
                type="range"
                min="25"
                max="80"
                className={styles.rangeInput}
                value={barcodeHeight}
                onChange={(e) => setBarcodeHeight(Number(e.target.value))}
              />
              <span className={styles.sliderValue}>{barcodeHeight}px</span>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Barcode Bar Width</label>
            <div className={styles.sliderRow}>
              <input
                type="range"
                min="1"
                max="2.5"
                step="0.1"
                className={styles.rangeInput}
                value={barcodeWidth}
                onChange={(e) => setBarcodeWidth(Number(e.target.value))}
              />
              <span className={styles.sliderValue}>{barcodeWidth}x</span>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Display Fields</label>
            <div className={styles.checkboxGrid}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={showStoreName}
                  onChange={(e) => setShowStoreName(e.target.checked)}
                />
                Store Header
              </label>

              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={showProductName}
                  onChange={(e) => setShowProductName(e.target.checked)}
                />
                Product Name
              </label>

              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={showSKU}
                  onChange={(e) => setShowSKU(e.target.checked)}
                />
                SKU / Code
              </label>

              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={showPrice}
                  onChange={(e) => setShowPrice(e.target.checked)}
                />
                Price Tag
              </label>

              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={showBarcodeText}
                  onChange={(e) => setShowBarcodeText(e.target.checked)}
                />
                Barcode Text
              </label>
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: PRODUCTS & PREVIEW */}
        <section className={styles.contentCard}>
          {/* TABS */}
          <div className={styles.tabsHeader}>
            <div className={styles.tabsGroup}>
              <button
                className={`${styles.tabBtn} ${
                  activeTab === "products" ? styles.activeTab : ""
                }`}
                onClick={() => setActiveTab("products")}
              >
                <FiGrid size={16} /> Select Products ({selectedProducts.length})
              </button>

              <button
                className={`${styles.tabBtn} ${
                  activeTab === "preview" ? styles.activeTab : ""
                }`}
                onClick={() => setActiveTab("preview")}
              >
                <FiEye size={16} /> Live Print Sheet ({totalLabelsCount} Labels)
              </button>
            </div>

            {activeTab === "products" && (
              <div className={styles.batchActions}>
                <span style={{ fontSize: 13, color: "#64748b" }}>Preset Qty:</span>
                <button
                  className={styles.secondaryButton}
                  style={{ height: 32, padding: "0 10px", fontSize: 12 }}
                  onClick={() => handleBatchSetQty(1)}
                >
                  1
                </button>
                <button
                  className={styles.secondaryButton}
                  style={{ height: 32, padding: "0 10px", fontSize: 12 }}
                  onClick={() => handleBatchSetQty(5)}
                >
                  5
                </button>
                <button
                  className={styles.secondaryButton}
                  style={{ height: 32, padding: "0 10px", fontSize: 12 }}
                  onClick={() => handleBatchSetQty(10)}
                >
                  10
                </button>
              </div>
            )}
          </div>

          {/* TAB 1: PRODUCT SELECTION TABLE */}
          {activeTab === "products" ? (
            <div>
              <div className={styles.searchToolbar}>
                <div className={styles.searchBox}>
                  <FiSearch size={16} />
                  <input
                    type="text"
                    placeholder="Search by name, SKU or barcode code..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <select
                  className={styles.filterSelect}
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      Category: {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.tableWrapper}>
                <table className={styles.productsTable}>
                  <thead>
                    <tr>
                      <th style={{ width: 40 }}>
                        <button
                          style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                          }}
                          onClick={handleToggleSelectAll}
                        >
                          {filteredProducts.every((p) => p.selected) ? (
                            <FiCheckSquare size={18} color="#2563eb" />
                          ) : (
                            <FiSquare size={18} color="#94a3b8" />
                          )}
                        </button>
                      </th>
                      <th>Product Info</th>
                      <th>SKU / Code</th>
                      <th>Price</th>
                      <th>Print Qty</th>
                      <th>Live Barcode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((p) => (
                        <tr key={p.id}>
                          <td>
                            <button
                              style={{
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                padding: 0,
                              }}
                              onClick={() => handleToggleSelect(p.id)}
                            >
                              {p.selected ? (
                                <FiCheckSquare size={18} color="#2563eb" />
                              ) : (
                                <FiSquare size={18} color="#94a3b8" />
                              )}
                            </button>
                          </td>
                          <td>
                            <div className={styles.productNameCol}>
                              <div className={styles.productThumb}>
                                {p.name.substring(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <strong style={{ color: "#0f172a" }}>
                                  {p.name}
                                </strong>
                                <div style={{ fontSize: 12, color: "#64748b" }}>
                                  {p.category}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className={styles.skuBadge}>{p.sku}</span>
                            <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>
                              {p.code}
                            </div>
                          </td>
                          <td style={{ fontWeight: 700, color: "#0f172a" }}>
                            ${p.price.toFixed(2)}
                          </td>
                          <td>
                            <div className={styles.qtyControl}>
                              <button
                                className={styles.qtyBtn}
                                onClick={() => handleQtyChange(p.id, -1)}
                              >
                                <FiMinus size={12} />
                              </button>
                              <input
                                type="number"
                                className={styles.qtyInput}
                                value={p.qty}
                                onChange={(e) =>
                                  handleDirectQtyInput(p.id, e.target.value)
                                }
                              />
                              <button
                                className={styles.qtyBtn}
                                onClick={() => handleQtyChange(p.id, 1)}
                              >
                                <FiPlus size={12} />
                              </button>
                            </div>
                          </td>
                          <td>
                            <div style={{ transform: "scale(0.85)", transformOrigin: "left center" }}>
                              <Barcode
                                value={p.code || "1234567890"}
                                format={barcodeFormat}
                                height={28}
                                width={1}
                                fontSize={10}
                                displayValue={false}
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" style={{ textAlign: "center", padding: 30, color: "#94a3b8" }}>
                          No products found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* TAB 2: LIVE PRINT SHEET PREVIEW */
            <div className={styles.previewArea}>
              <div className={`${styles.printSheet} ${styles[paperFormat]}`}>
                {labelItemsList.length > 0 ? (
                  labelItemsList.map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className={styles.barcodeLabelCard}>
                      {showStoreName && (
                        <div className={styles.storeHeader}>{storeName}</div>
                      )}

                      {showProductName && (
                        <div className={styles.labelProdTitle} title={item.name}>
                          {item.name}
                        </div>
                      )}

                      {showSKU && (
                        <div className={styles.labelSku}>{item.sku}</div>
                      )}

                      <div className={styles.barcodeSvgWrapper}>
                        <Barcode
                          value={item.code || "1234567890"}
                          format={barcodeFormat}
                          height={barcodeHeight}
                          width={barcodeWidth}
                          fontSize={fontSize}
                          displayValue={showBarcodeText}
                          margin={0}
                        />
                      </div>

                      {showPrice && (
                        <div className={styles.labelPrice}>
                          ${item.price.toFixed(2)}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className={styles.emptyState}>
                    <FiTag size={40} />
                    <p>No labels selected to print.</p>
                    <button
                      className={styles.primaryButton}
                      style={{ margin: "0 auto" }}
                      onClick={() => setActiveTab("products")}
                    >
                      Select Products
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

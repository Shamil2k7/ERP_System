"use client";

import { IconSearch, IconBarcode, IconChevronDown, IconGrid } from "./icons";

export default function PosToolbar({
  query,
  onQueryChange,
  onScan,
  selectedCategory,
  onCategoryChange,
  selectedBrand,
  onBrandChange,
  categories = [],
  brands = [],
  activeTab = "Products",
  onTabChange,
}) {
  return (
    <div className="pos-left-header">
      {/* Top Navigation Tabs */}
      <div className="pos-nav-tabs">
        {["Products", "Recent", "Favourites"].map((tab) => (
          <button
            key={tab}
            className={`pos-nav-tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => onTabChange?.(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search and Barcode Row */}
      <div className="pos-search-bar-row">
        <div className="pos-search-input-wrapper">
          <IconSearch className="pos-search-icon" />
          <input
            type="text"
            className="pos-search-input"
            placeholder="Search product by name, SKU or scan barcode"
            value={query}
            onChange={(e) => onQueryChange?.(e.target.value)}
          />
          <button
            className="pos-barcode-btn"
            title="Scan Barcode"
            onClick={() => {
              const code = prompt("Scan or enter barcode / SKU:");
              if (code) onScan?.(code);
            }}
          >
            <IconBarcode />
          </button>
        </div>
      </div>

      {/* Filters Row: Categories, Brands, View Mode */}
      <div className="pos-filters-row">
        <div className="pos-select-wrapper">
          <select
            className="pos-filter-select"
            value={selectedCategory}
            onChange={(e) => onCategoryChange?.(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories
              .filter((cat) => cat !== "All")
              .map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
          </select>
          <IconChevronDown className="pos-select-arrow" />
        </div>

        <div className="pos-select-wrapper">
          <select
            className="pos-filter-select"
            value={selectedBrand}
            onChange={(e) => onBrandChange?.(e.target.value)}
          >
            <option value="All">All Brands</option>
            {brands
              .filter((b) => b !== "All")
              .map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
          </select>
          <IconChevronDown className="pos-select-arrow" />
        </div>

        <div className="pos-view-mode-btn">
          <IconGrid width={16} height={16} />
          <span>Grid</span>
          <IconChevronDown width={14} height={14} />
        </div>
      </div>
    </div>
  );
}

"use client";
import pos from "../pos.css";

export default function CategoryTabs({ categories, active, onSelect }) {
  return (
    <div className="pos-categories-scroll">
      {categories.map((cat) => {
        const isActive = cat.label === active;
        return (
          <button
            key={cat.label}
            onClick={() => onSelect(cat.label)}
            className={`pos-category-card ${isActive ? "active" : ""}`}
          >
            <div className="pos-category-label">{cat.label}</div>
            <div className="pos-category-count">{cat.count.toLocaleString()}</div>
          </button>
        );
      })}
    </div>
  );
}

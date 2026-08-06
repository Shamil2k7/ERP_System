"use client";
import pos from "../pos.css";

import { IconSparkle } from "./icons";

export default function ProductGrid({ products, addToCart }) {
  if (products.length === 0) {
    return (
      <div
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "40px",
          textAlign: "center",
          color: "#8e8e93",
          fontSize: "14px",
        }}
      >
        No products found in this category.
      </div>
    );
  }

  return (
    <div className="pos-products-grid">
      {products.map((product) => {
        const Glyph = product.icon;
        return (
          <div key={product.id} className="pos-product-card">
            {/* Image box */}
            <div
              className="pos-product-img-wrapper"
              style={{ backgroundColor: product.bg || "#f4f4f5" }}
            >
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    // Fallback to SVG graphic if image fails to load
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) {
                      e.target.nextSibling.style.display = 'block';
                    }
                  }}
                />
              ) : null}
              <div style={{ display: product.imageUrl ? 'none' : 'block' }}>
                {Glyph && <Glyph className={product.iconDark ? "text-black/60" : "text-white/85"} />}
              </div>
            </div>

            {/* Product details */}
            <h3 className="pos-product-name" title={product.name}>
              {product.name}
            </h3>
            <div className="pos-product-meta">Code: {product.code}</div>
            <div className="pos-product-meta">Available: {product.available}</div>

            {/* Bottom price and add action */}
            <div className="pos-product-bottom">
              <span className="pos-product-price">${product.price}</span>
              <button
                onClick={() => addToCart(product)}
                aria-label={`Add ${product.name} to order`}
                className="pos-product-add-btn"
                title="Add item"
              >
                <IconSparkle />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

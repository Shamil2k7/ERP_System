"use client";

export default function StockTable({ stock = [] }) {
  return (
    <div className="warehouse-table-container">
      <table className="warehouse-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>PRODUCT</th>
            <th>CATEGORY</th>
            <th>WAREHOUSE</th>
            <th style={{ textAlign: "center" }}>QUANTITY</th>
            <th style={{ textAlign: "center" }}>REORDER LEVEL</th>
            <th style={{ textAlign: "center" }}>STATUS</th>
            <th style={{ width: "50px" }}></th>
          </tr>
        </thead>

        <tbody>
          {stock.length === 0 && (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", padding: "40px 0", color: "#71717a" }}>
                No stock records found matching criteria.
              </td>
            </tr>
          )}

          {stock.map((item) => {
            const status =
              item.quantity === 0
                ? "Out of Stock"
                : item.quantity <= item.reorder
                ? "Low Stock"
                : "In Stock";

            const statusClass =
              status === "In Stock"
                ? "instock"
                : status === "Low Stock"
                ? "lowstock"
                : "outofstock";

            return (
              <tr key={item.id}>
                <td className="sku-cell">{item.sku}</td>

                <td className="product-name-cell">{item.product}</td>

                <td>{item.category}</td>

                <td>{item.warehouse}</td>

                <td style={{ textAlign: "center" }}>
                  <span className="quantity-badge">{item.quantity}</span>
                </td>

                <td style={{ textAlign: "center", color: "#71717a", fontWeight: 600 }}>
                  {item.reorder}
                </td>

                <td style={{ textAlign: "center" }}>
                  <span className={`badge-status ${statusClass}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    {status}
                  </span>
                </td>

                <td style={{ textAlign: "center" }}>
                  <button className="action-dots-btn" title="Options">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                    </svg>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
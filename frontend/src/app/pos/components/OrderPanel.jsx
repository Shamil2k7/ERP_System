"use client";
import pos from "../pos.css";

import { useState } from "react";
import { 
  IconTrash, 
  IconClose, 
  IconQuantity, 
  IconTax, 
  IconDiscount, 
  IconCoupon 
} from "./icons";

const TABS = [
  { key: "quantity", label: "Quantity", icon: IconQuantity },
  { key: "tax", label: "Tax", icon: IconTax },
  { key: "discount", label: "Discount", icon: IconDiscount },
  { key: "coupon", label: "Coupon", icon: IconCoupon },
];

const PAD_KEYS = ["7", "8", "9", "C", "4", "5", "6", "+", "1", "2", "3", "-", ".", "0"];

export default function OrderPanel({
  cart,
  removeItem,
  clearCart,
  updateQuantity,
  selectedId,
  onSelect,
  orderNo = "125125",
  subtotal = 85.25,
  discountRate = 5,
  setDiscountRate,
  taxRate = 2,
  setTaxRate,
  couponCode,
  setCouponCode,
  discountAmount = 20,
  taxAmount = 10.25,
  total = 77.00,
  onPayment,
}) {
  const [activeTab, setActiveTab] = useState("quantity");
  const [buffer, setBuffer] = useState("");
  const [status, setStatus] = useState(null);

  const flash = (msg) => {
    setStatus(msg);
    setTimeout(() => setStatus(null), 2500);
  };

  const commit = () => {
    const value = Number(buffer);
    if (Number.isNaN(value)) return;

    if (activeTab === "quantity") {
      if (selectedId != null && value >= 0) updateQuantity?.(selectedId, value);
    } else if (activeTab === "tax") {
      setTaxRate?.(Math.max(0, value));
    } else if (activeTab === "discount") {
      setDiscountRate?.(Math.max(0, value));
    }
    setBuffer("");
  };

  const pressKey = (key) => {
    if (key === "C") {
      setBuffer("");
      return;
    }
    if (key === "+") {
      if (activeTab === "coupon") {
        if (buffer) setCouponCode?.(buffer);
        setBuffer("");
      } else {
        commit();
      }
      return;
    }
    if (key === "-") {
      setBuffer((b) => b.slice(0, -1));
      return;
    }
    if (key === ".") {
      setBuffer((b) => (b.includes(".") ? b : b + "."));
      return;
    }
    setBuffer((b) => (b + key).slice(0, 8));
  };

  const handlePayment = () => {
    if (cart.length === 0) return;
    flash(`Payment of $${total.toFixed(2)} completed`);
    onPayment?.();
  };

  const handleRefund = () => {
    if (cart.length === 0) return;
    flash(`Refund of $${total.toFixed(2)} requested`);
  };

  const handleEndSession = () => {
    clearCart?.();
    setCouponCode?.("");
    flash("Session ended");
  };

  return (
    <div className="pos-order-panel">
      {/* Header */}
      <div className="pos-order-header">
        <h2 className="pos-order-title">Order No: {orderNo}</h2>
        <button
          onClick={clearCart}
          aria-label="Clear order"
          className="pos-order-trash"
          title="Clear Cart"
        >
          <IconTrash />
        </button>
      </div>

      {/* Cart Item List */}
      <div className="pos-cart-list">
        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "30px 0", color: "#a1a1aa", fontSize: "13px" }}>
            No products added to order yet
          </div>
        ) : (
          cart.map((item) => {
            const Glyph = item.icon;
            const isSelected = item.cartId === selectedId;
            return (
              <div
                key={item.cartId}
                onClick={() => onSelect?.(item.cartId)}
                className={`pos-cart-item ${isSelected ? "selected" : ""}`}
              >
                {/* Product thumbnail */}
                <div
                  className="pos-cart-thumb"
                  style={{ backgroundColor: item.bg || "#f4f4f5" }}
                >
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : Glyph ? (
                    <Glyph width={24} height={24} className={item.iconDark ? "text-black/60" : "text-white/85"} />
                  ) : null}
                </div>

                {/* Details */}
                <div className="pos-cart-info">
                  <div className="pos-cart-name">{item.name}</div>
                  <div className="pos-cart-sub">
                    Code: {item.code || "1254654"} &nbsp; Size: {item.size || "M"} &nbsp; Quantity: {item.qty}
                  </div>
                </div>

                {/* Price */}
                <div className="pos-cart-price">
                  ${(item.price * item.qty).toFixed(0)}
                </div>

                {/* Remove button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem?.(item.cartId);
                  }}
                  className="pos-cart-remove-icon"
                  title="Remove item"
                >
                  <IconClose />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Lavender Summary Box */}
      <div className="pos-billing-box">
        <div className="pos-billing-row">
          <span>Subtotal</span>
          <span className="pos-billing-value">${subtotal.toFixed(2)}</span>
        </div>
        <div className="pos-billing-row">
          <span>Discount ({discountRate}%)</span>
          <span className="pos-billing-value">${discountAmount.toFixed(2)}</span>
        </div>
        <div className="pos-billing-row">
          <span>Tax ({taxRate}%)</span>
          <span className="pos-billing-value">${taxAmount.toFixed(2)}</span>
        </div>
        <div className="pos-billing-row total">
          <span>Total Amount</span>
          <span className="pos-billing-total-val">${total.toFixed(2)}</span>
        </div>
      </div>

      {status && (
        <div style={{
          borderRadius: "12px",
          background: "#dcfce7",
          color: "#15803d",
          fontSize: "12px",
          fontWeight: "600",
          padding: "8px 12px",
          textAlign: "center",
        }}>
          {status}
        </div>
      )}

      {/* Tab Selectors */}
      <div className="pos-keypad-tabs">
        {TABS.map((tab) => {
          const IconComp = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setBuffer("");
              }}
              className={`pos-tab-btn ${activeTab === tab.key ? "active" : ""}`}
            >
              <IconComp />
              {tab.label}
            </button>
          );
        })}
      </div>

      {buffer !== "" && (
        <div style={{ textAlign: "right", fontSize: "14px", fontWeight: "700", color: "#27272a" }}>
          Input: {buffer}
        </div>
      )}

      {/* Keypad Grid */}
      <div className="pos-keypad-grid">
        {PAD_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => pressKey(key)}
            className={`pos-keypad-btn ${key === "C" ? "clear" : ""}`}
          >
            {key}
          </button>
        ))}
        <button onClick={handlePayment} className="pos-payment-btn">
          Payment
        </button>
      </div>

      {/* Bottom Actions */}
      <div className="pos-bottom-actions">
        <button onClick={handleRefund} className="pos-bottom-btn">
          Refund
        </button>
        <button onClick={handleEndSession} className="pos-bottom-btn">
          End Session
        </button>
      </div>
    </div>
  );
}

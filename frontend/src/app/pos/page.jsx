"use client";

import { useMemo, useState, useEffect } from "react";
import "./pos.css";

import PosToolbar from "./components/PosToolbar";
import CategoryTabs from "./components/CategoryTabs";
import ProductGrid from "./components/ProductGrid";
import OrderPanel from "./components/OrderPanel";
import API_URL from "@/config/api";
import Swal from "sweetalert2";
import axios from "axios";

export default function POSPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [discounts, setDiscounts] = useState([]);


  const [activeTab, setActiveTab] = useState("Products");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [query, setQuery] = useState("");

  const [customer, setCustomer] = useState("");
  const [discountValue, setDiscountValue] = useState(0);
  const [amountReceived, setAmountReceived] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState("Cash");
  const [cart, setCart] = useState([]);
  const [localHeldDrafts, setLocalHeldDrafts] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const items = JSON.parse(localStorage.getItem("pos_held_drafts") || "[]");
      setLocalHeldDrafts(items);
    }
  }, [activeTab]);

  // Fetch all POS dependencies from the database
  useEffect(() => {
    async function loadData() {
      try {
        const [prodRes, catRes, brandRes, custRes, taxRes, discRes] = await Promise.all([
          axios.get(`${API_URL}/products`).then((r) => r.data),
          axios.get(`${API_URL}/categories`).then((r) => r.data),
          axios.get(`${API_URL}/brands`).then((r) => r.data),
          axios.get(`${API_URL}/customers`).then((r) => r.data),
          axios.get(`${API_URL}/taxes`).then((r) => r.data),
          axios.get(`${API_URL}/discounts`).then((r) => r.data),
        ]);

        if (prodRes.success) {
          const mapped = prodRes.data.map((p) => ({
            id: p.id,
            name: p.name,
            sku: p.sku || p.id,
            code: p.sku || p.id,
            price: Number(p.sellingPrice) || 0,
            stock: p.inventories?.reduce((sum, inv) => sum + (inv.quantity || 0), 0) ?? 0,
            category: p.category?.name || "Others",
            brand: p.brand?.name || "Generic",
            imageUrl: p.image
              ? p.image.startsWith("http")
                ? p.image
                : `http://localhost:5000${p.image}`
              : "",
          }));
          setProducts(mapped);
        }

        if (catRes.success) {
          setCategories(catRes.data);
        }

        if (brandRes.success) {
          setBrands(brandRes.data);
        }

        if (custRes.success) {
          setCustomers(custRes.data);
        }

        if (taxRes.success) {
          setTaxes(taxRes.data);
        }

        if (discRes.success) {
          setDiscounts(discRes.data);
        }
      } catch (err) {
        console.error("Error loading POS dynamic data:", err);
      }
    }
    loadData();
  }, []);

  const categoryNames = useMemo(() => {
    return ["All", ...categories.map((c) => c.name)];
  }, [categories]);

  const brandNames = useMemo(() => {
    return ["All", ...brands.map((b) => b.name)];
  }, [brands]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        activeCategory === "All" || p.category === activeCategory;
      const matchesBrand =
        selectedBrand === "All" || p.brand === selectedBrand;
      const q = query.toLowerCase().trim();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q);
      return matchesCategory && matchesBrand && matchesQuery;
    });
  }, [products, activeCategory, selectedBrand, query]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        return prev.map((item, idx) =>
          idx === existingIndex ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        {
          cartId: Date.now(),
          id: product.id,
          name: product.name,
          sku: product.sku,
          price: product.price,
          qty: 1,
          imageUrl: product.imageUrl,
        },
      ];
    });
  };

  const addScannedBarcode = async (code) => {
    try {
      // 1. Try to find the product dynamically via the barcode scan API
      const res = await axios.get(`${API_URL}/barcodes/scan/${code}`).then((r) => r.data);
      
      if (res.success && res.data) {
        const p = res.data;
        const mapped = {
          id: p.id,
          name: p.name,
          sku: p.sku || p.id,
          code: p.sku || p.id,
          price: Number(p.sellingPrice) || 0,
          stock: p.inventories?.reduce((sum, inv) => sum + (inv.quantity || 0), 0) ?? 0,
          category: p.category?.name || "Others",
          brand: p.brand?.name || "Generic",
          imageUrl: p.image
            ? p.image.startsWith("http")
              ? p.image
              : `http://localhost:5000${p.image}`
            : "",
        };
        addToCart(mapped);
        return;
      }
    } catch (err) {
      console.warn("Barcode not found in database barcodes table, checking product SKU locally/dynamically...", err.message);
    }

    // 2. Fallback: Search the local product list by SKU or code
    const found = products.find(
      (p) =>
        p.sku.toLowerCase() === code.toLowerCase() ||
        p.code.toLowerCase() === code.toLowerCase()
    );

    if (found) {
      addToCart(found);
      return;
    }

    // 3. Fallback 2: Check backend dynamically by product SKU
    try {
      const res = await axios.get(`${API_URL}/products`).then((r) => r.data);
      if (res.success && res.data) {
        const foundDb = res.data.find(
          (p) =>
            p.sku?.toLowerCase() === code.toLowerCase() ||
            p.id?.toLowerCase() === code.toLowerCase()
        );
        if (foundDb) {
          const p = foundDb;
          const mapped = {
            id: p.id,
            name: p.name,
            sku: p.sku || p.id,
            code: p.sku || p.id,
            price: Number(p.sellingPrice) || 0,
            stock: p.inventories?.reduce((sum, inv) => sum + (inv.quantity || 0), 0) ?? 0,
            category: p.category?.name || "Others",
            brand: p.brand?.name || "Generic",
            imageUrl: p.image
              ? p.image.startsWith("http")
                ? p.image
                : `http://localhost:5000${p.image}`
              : "",
          };
          addToCart(mapped);
          return;
        }
      }
    } catch (err) {
      console.error("Dynamic product lookup error:", err);
    }

    // 4. Default: If not found anywhere, add a placeholder scanned item
    addToCart({
      id: `scanned-${Date.now()}`,
      name: `Scanned Item (${code})`,
      sku: code,
      price: 50.0,
      imageUrl: "",
    });
  };

  const removeItem = (cartId) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, nextQty) => {
    if (nextQty <= 0) {
      removeItem(cartId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, qty: nextQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleAddCustomer = async ({ name, phone, email }) => {
    try {
      const res = await axios.post(`${API_URL}/customers`, {
        name,
        phone,
        email,
        branchId: "00000000-0000-0000-0000-000000000000",
      }).then((r) => r.data);

      if (res.success) {
        setCustomers((prev) => [...prev, res.data]);
        setCustomer(res.data.id);
        Swal.fire({
          title: "Customer Added!",
          text: `Customer ${name} added successfully.`,
          icon: "success",
          confirmButtonColor: "#2563eb",
        });
      } else {
        Swal.fire({
          title: "Failed to Add",
          text: res.message || "Failed to add customer",
          icon: "error",
          confirmButtonColor: "#2563eb",
        });
      }
    } catch (err) {
      console.error("Error adding customer:", err);
      Swal.fire({
        title: "Error!",
        text: "Error adding customer: " + err.message,
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  const handleCompleteSale = async () => {
    if (cart.length === 0) {
      Swal.fire({
        title: "Cart Empty!",
        text: "Add products to the cart before completing the sale.",
        icon: "warning",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const taxRate = taxes[0]?.rate ? Number(taxes[0].rate) : 10;
    const taxAmount = (subtotal - Number(discountValue)) * (taxRate / 100);
    const totalAmount = subtotal;
    const netAmount = subtotal + taxAmount - Number(discountValue);

    const salePayload = {
      branchId: "00000000-0000-0000-0000-000000000000",
      customerId: customer || null,
      orderNumber: `SO-${Date.now()}`,
      status: "CONFIRMED",
      orderDate: new Date().toISOString(),
      totalAmount,
      taxAmount,
      discountAmount: Number(discountValue),
      netAmount,
    };

    try {
      const res = await axios.post(`${API_URL}/sales`, salePayload).then((r) => r.data);

      if (res.success) {
        Swal.fire({
          title: "Sale Completed!",
          text: "Sale completed and saved successfully.",
          icon: "success",
          confirmButtonColor: "#2563eb",
        });
        clearCart();
        setDiscountValue(0);
        setAmountReceived(0);
        setCustomer("");
      } else {
        Swal.fire({
          title: "Failed to Complete",
          text: res.message || "Failed to save sale",
          icon: "error",
          confirmButtonColor: "#2563eb",
        });
      }
    } catch (err) {
      console.error("Error completing sale:", err);
      Swal.fire({
        title: "Error!",
        text: "Error completing sale: " + err.message,
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  const saveCartLocally = (type) => {
    if (cart.length === 0) {
      Swal.fire({
        title: "Cart Empty!",
        text: `Cannot ${type.toLowerCase()} an empty cart.`,
        icon: "warning",
        confirmButtonColor: "#2563eb",
      });
      return false;
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const taxAmount = (subtotal - Number(discountValue)) * (activeTaxRate / 100);
    const totalAmount = subtotal;
    const netAmount = subtotal + taxAmount - Number(discountValue);

    const selectedCustObj = customers.find((c) => c.id === customer);
    const customerName = selectedCustObj ? selectedCustObj.name : "Walk-in Customer";

    const newEntry = {
      id: `${type.toLowerCase()}-${Date.now()}`,
      type,
      orderNumber: `SO-${Date.now()}`,
      customer,
      customerName,
      cart,
      discountValue,
      amountReceived,
      selectedPayment,
      totalAmount,
      taxAmount,
      netAmount,
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("pos_held_drafts") || "[]");
    localStorage.setItem("pos_held_drafts", JSON.stringify([newEntry, ...existing]));
    setLocalHeldDrafts([newEntry, ...existing]);
    return true;
  };

  const handleHoldSale = async () => {
    const success = saveCartLocally("Hold");
    if (!success) return;

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const taxAmount = (subtotal - Number(discountValue)) * (activeTaxRate / 100);
    const totalAmount = subtotal;
    const netAmount = subtotal + taxAmount - Number(discountValue);

    const salePayload = {
      branchId: "00000000-0000-0000-0000-000000000000",
      customerId: customer || null,
      orderNumber: `SO-${Date.now()}`,
      status: "DRAFT",
      orderDate: new Date().toISOString(),
      totalAmount,
      taxAmount,
      discountAmount: Number(discountValue),
      netAmount,
    };

    try {
      await axios.post(`${API_URL}/sales`, salePayload);
    } catch (err) {
      console.error("Backend draft sync error:", err);
    }

    Swal.fire({
      title: "Sale Held!",
      text: "The current sale has been held successfully.",
      icon: "success",
      confirmButtonColor: "#2563eb",
    });
    clearCart();
    setDiscountValue(0);
    setAmountReceived(0);
    setCustomer("");
  };

  const handleSaveDraft = async () => {
    const success = saveCartLocally("Draft");
    if (!success) return;

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const taxAmount = (subtotal - Number(discountValue)) * (activeTaxRate / 100);
    const totalAmount = subtotal;
    const netAmount = subtotal + taxAmount - Number(discountValue);

    const salePayload = {
      branchId: "00000000-0000-0000-0000-000000000000",
      customerId: customer || null,
      orderNumber: `SO-${Date.now()}`,
      status: "DRAFT",
      orderDate: new Date().toISOString(),
      totalAmount,
      taxAmount,
      discountAmount: Number(discountValue),
      netAmount,
    };

    try {
      await axios.post(`${API_URL}/sales`, salePayload);
    } catch (err) {
      console.error("Backend draft sync error:", err);
    }

    Swal.fire({
      title: "Draft Saved!",
      text: "Cart contents saved as draft.",
      icon: "success",
      confirmButtonColor: "#2563eb",
    });
    clearCart();
    setDiscountValue(0);
    setAmountReceived(0);
    setCustomer("");
  };

  const loadHeldDraft = (entry) => {
    setCart(entry.cart);
    setCustomer(entry.customer || "");
    setDiscountValue(entry.discountValue || 0);
    setAmountReceived(entry.amountReceived || 0);
    setSelectedPayment(entry.selectedPayment || "Cash");
    removeHeldDraft(entry.id);
    setActiveTab("Products");
    Swal.fire({
      title: "Draft Recovered!",
      text: `${entry.type} has been successfully restored to the cart.`,
      icon: "info",
      confirmButtonColor: "#2563eb",
    });
  };

  const removeHeldDraft = (id) => {
    const existing = JSON.parse(localStorage.getItem("pos_held_drafts") || "[]");
    const updated = existing.filter((e) => e.id !== id);
    localStorage.setItem("pos_held_drafts", JSON.stringify(updated));
    setLocalHeldDrafts(updated);
  };

  const handlePrintReceipt = () => {
    if (cart.length === 0) {
      Swal.fire({
        title: "Cart Empty!",
        text: "Please add items to the cart before printing a receipt.",
        icon: "warning",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const taxRate = activeTaxRate;
    const taxAmount = (subtotal - Number(discountValue)) * (taxRate / 100);
    const grandTotal = Math.max(0, subtotal - Number(discountValue) + taxAmount);

    const selectedCustObj = customers.find((c) => c.id === customer);
    const customerName = selectedCustObj ? selectedCustObj.name : "Walk-in Customer";
    const customerPhone = selectedCustObj?.phone ? selectedCustObj.phone : "";

    const receiptWindow = window.open("", "_blank", "width=600,height=600");
    if (!receiptWindow) {
      Swal.fire({
        title: "Popup Blocked",
        text: "Please allow popups to print the receipt.",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    const receiptHtml = `
      <html>
        <head>
          <title>Print Receipt</title>
          <style>
            @media print {
              body { margin: 0; padding: 10px; font-family: monospace; font-size: 12px; color: #000; width: 80mm; }
              .receipt-container { width: 100%; max-width: 80mm; }
            }
            body { font-family: monospace; font-size: 14px; padding: 20px; width: 80mm; margin: 0 auto; background: #fff; color: #000; }
            .receipt-container { width: 100%; }
            .text-center { text-align: center; }
            .text-right { text-align: right; }
            .bold { font-weight: bold; }
            .header { margin-bottom: 15px; }
            .header h2 { margin: 0 0 5px 0; font-size: 18px; }
            .header p { margin: 2px 0; font-size: 11px; }
            .divider { border-top: 1px dashed #000; margin: 8px 0; }
            .details-table { width: 100%; border-collapse: collapse; margin: 10px 0; }
            .details-table th, .details-table td { padding: 4px 0; font-size: 12px; vertical-align: top; }
            .summary-table { width: 100%; margin-top: 10px; }
            .summary-table td { padding: 2px 0; font-size: 12px; }
            .footer { margin-top: 20px; font-size: 11px; }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            <div class="header text-center">
              <h2>ERP SYSTEM STORE</h2>
              <p>123 Business Road, Suite 100</p>
              <p>Tel: +1 (234) 567-890</p>
              <p class="bold">RETAIL BILL / RECEIPT</p>
            </div>
            
            <div class="divider"></div>
            
            <div>
              <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>Bill No:</strong> SO-${Date.now()}</p>
              <p><strong>Customer:</strong> ${customerName} ${customerPhone ? `(${customerPhone})` : ""}</p>
              <p><strong>Cashier:</strong> POS Terminal 1</p>
            </div>
            
            <div class="divider"></div>
            
            <table class="details-table">
              <thead>
                <tr>
                  <th style="text-align: left; width: 50%;">Item Description</th>
                  <th style="text-align: center; width: 15%;">Qty</th>
                  <th style="text-align: right; width: 15%;">Price</th>
                  <th style="text-align: right; width: 20%;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${cart.map(item => `
                  <tr>
                    <td style="text-align: left;">${item.name}</td>
                    <td style="text-align: center;">${item.qty}</td>
                    <td style="text-align: right;">$${Number(item.price).toFixed(2)}</td>
                    <td style="text-align: right;">$${(item.price * item.qty).toFixed(2)}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
            
            <div class="divider"></div>
            
            <table class="summary-table">
              <tr>
                <td>Subtotal:</td>
                <td class="text-right">$${subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Discount:</td>
                <td class="text-right">-$${Number(discountValue).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Tax (VAT ${taxRate}%):</td>
                <td class="text-right">$${taxAmount.toFixed(2)}</td>
              </tr>
              <tr class="bold" style="font-size: 14px;">
                <td>Grand Total:</td>
                <td class="text-right">$${grandTotal.toFixed(2)}</td>
              </tr>
            </table>
            
            <div class="divider"></div>
            
            <div class="footer text-center">
              <p class="bold">THANK YOU FOR YOUR VISIT!</p>
              <p>Please keep this receipt for returns/exchanges.</p>
              <p>Powered by ERP System</p>
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `;

    receiptWindow.document.write(receiptHtml);
    receiptWindow.document.close();
  };

  const activeTaxRate = taxes[0]?.rate ? Number(taxes[0].rate) : 10;

  return (
    <div className="pos-page-wrapper">
      <div className="pos-app-container">
        {/* Left Column: Products Section */}
        <div className="pos-left-column">
          {/* Header Toolbar */}
          <PosToolbar
            query={query}
            onQueryChange={setQuery}
            onScan={addScannedBarcode}
            selectedCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            selectedBrand={selectedBrand}
            onBrandChange={setSelectedBrand}
            categories={categoryNames}
            brands={brandNames}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Main Left Content: Category Sidebar + Product Grid OR Drafts/Holds List */}
          <div className="pos-left-body">
            {activeTab === "Drafts & Holds" ? (
              <div className="pos-drafts-holds-container" style={{ width: "100%" }}>
                <h3 className="pos-section-title">Drafts & Held Bills</h3>
                {localHeldDrafts.length === 0 ? (
                  <div className="pos-products-empty">
                    No drafts or held bills found.
                  </div>
                ) : (
                  <div className="pos-drafts-list-wrapper" style={{ overflowX: "auto", background: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "16px" }}>
                    <table className="pos-cart-table" style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Ref Number</th>
                          <th>Date</th>
                          <th>Customer</th>
                          <th style={{ textAlign: "center" }}>Items</th>
                          <th style={{ textAlign: "right" }}>Total</th>
                          <th style={{ textAlign: "center" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {localHeldDrafts.map((entry) => (
                          <tr key={entry.id}>
                            <td>
                              <span className={`pos-status-badge ${entry.type.toLowerCase()}`} style={{
                                padding: "4px 8px",
                                borderRadius: "6px",
                                fontSize: "11px",
                                fontWeight: "600",
                                display: "inline-block",
                                backgroundColor: entry.type === "Hold" ? "#fef3c7" : "#e0f2fe",
                                color: entry.type === "Hold" ? "#d97706" : "#0284c7"
                              }}>
                                {entry.type}
                              </span>
                            </td>
                            <td><strong>{entry.orderNumber}</strong></td>
                            <td>{new Date(entry.createdAt).toLocaleString()}</td>
                            <td>{entry.customerName}</td>
                            <td style={{ textAlign: "center" }}>
                              {entry.cart.reduce((sum, item) => sum + item.qty, 0)}
                            </td>
                            <td style={{ textAlign: "right", fontWeight: "600" }}>
                              ${entry.netAmount.toFixed(2)}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                                <button
                                  type="button"
                                  className="pos-add-to-cart-btn"
                                  title="Load into Cart"
                                  style={{ padding: "4px 8px", width: "auto", height: "auto", fontSize: "12px" }}
                                  onClick={() => loadHeldDraft(entry)}
                                >
                                  Load
                                </button>
                                <button
                                  type="button"
                                  className="pos-cart-delete-btn"
                                  title="Delete Draft"
                                  onClick={() => removeHeldDraft(entry.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : (
              <>
                <CategoryTabs
                  active={activeCategory}
                  onSelect={setActiveCategory}
                  categories={categoryNames}
                />
                <ProductGrid products={filteredProducts} addToCart={addToCart} />
              </>
            )}
          </div>
        </div>

        {/* Right Column: Customer & Order Panel */}
        <div className="pos-right-column">
          <OrderPanel
            cart={cart}
            removeItem={removeItem}
            clearCart={clearCart}
            updateQuantity={updateQuantity}
            customer={customer}
            onCustomerChange={setCustomer}
            customers={customers}
            onAddCustomer={handleAddCustomer}
            discountValue={discountValue}
            onDiscountChange={setDiscountValue}
            taxRate={activeTaxRate}
            shipping={0}
            otherCharges={0}
            amountReceived={amountReceived}
            onAmountReceivedChange={setAmountReceived}
            selectedPayment={selectedPayment}
            onSelectPayment={setSelectedPayment}
            onCompleteSale={handleCompleteSale}
            onHoldSale={handleHoldSale}
            onSaveDraft={() => handleSaveDraft()}
            onPrintReceipt={handlePrintReceipt}
          />
        </div>
      </div>
    </div>
  );
}

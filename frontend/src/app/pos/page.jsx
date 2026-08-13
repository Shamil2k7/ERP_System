"use client";

import { useMemo, useState, useEffect } from "react";
import "./pos.css";

import PosToolbar from "./components/PosToolbar";
import CategoryTabs from "./components/CategoryTabs";
import ProductGrid from "./components/ProductGrid";
import OrderPanel from "./components/OrderPanel";
import API_URL from "@/config/api";
import { useAlert } from "@/context/AlertContext";

export default function POSPage() {
  const { showSuccess, showWarning, showError } = useAlert();
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

  // Fetch all POS dependencies from the backend
  useEffect(() => {
    async function loadData() {
      try {
        const [prodRes, catRes, brandRes, custRes, taxRes, discRes] = await Promise.all([
          fetch(`${API_URL}/products`).then((r) => r.json()),
          fetch(`${API_URL}/categories`).then((r) => r.json()),
          fetch(`${API_URL}/brands`).then((r) => r.json()),
          fetch(`${API_URL}/customers`).then((r) => r.json()),
          fetch(`${API_URL}/taxes`).then((r) => r.json()),
          fetch(`${API_URL}/discounts`).then((r) => r.json()),
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

  const addScannedBarcode = (code) => {
    const found = products.find(
      (p) =>
        p.sku.toLowerCase() === code.toLowerCase() ||
        p.code.toLowerCase() === code.toLowerCase()
    );
    if (found) {
      addToCart(found);
    } else {
      addToCart({
        id: `scanned-${Date.now()}`,
        name: `Scanned Item (${code})`,
        sku: code,
        price: 50.0,
        imageUrl: "",
      });
    }
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
      const res = await fetch(`${API_URL}/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, email, branchId: "00000000-0000-0000-0000-000000000000" }),
      }).then((r) => r.json());

      if (res.success) {
        setCustomers((prev) => [...prev, res.data]);
        setCustomer(res.data.id);
        showSuccess("Employee added", `Customer ${name} added successfully.`);
      } else {
        showError("Invalid form data", res.message || "Failed to add customer");
      }
    } catch (err) {
      console.error("Error adding customer:", err);
      showError("API/server failure", "Error adding customer: " + err.message);
    }
  };

  const handleCompleteSale = async () => {
    if (cart.length === 0) {
      showWarning("Low stock", "Cart is currently empty. Please add items to proceed.");
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
      const res = await fetch(`${API_URL}/sales`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(salePayload),
      }).then((r) => r.json());

      if (res.success) {
        showSuccess("Payment recorded", "Sale Completed and Payment Recorded Successfully.");
        clearCart();
        setDiscountValue(0);
        setAmountReceived(0);
        setCustomer("");
      } else {
        showError("Payment failed", res.message || "Failed to save sale transaction.");
      }
    } catch (err) {
      console.error("Error completing sale:", err);
      showError("API/server failure", "Error completing sale: " + err.message);
    }
  };

  const handleHoldSale = async () => {
    await handleSaveDraft("Sale held on draft order!");
  };

  const handleSaveDraft = async (customMessage) => {
    if (cart.length === 0) {
      showWarning("Low stock", "Cart is empty!");
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
      status: "DRAFT",
      orderDate: new Date().toISOString(),
      totalAmount,
      taxAmount,
      discountAmount: Number(discountValue),
      netAmount,
    };

    try {
      const res = await fetch(`${API_URL}/sales`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(salePayload),
      }).then((r) => r.json());

      if (res.success) {
        showSuccess("Invoice generated", customMessage || "Draft sale order saved!");
        clearCart();
        setDiscountValue(0);
        setAmountReceived(0);
        setCustomer("");
      } else {
        showError("Database error", res.message || "Failed to save draft order");
      }
    } catch (err) {
      console.error("Error saving draft:", err);
      showError("API/server failure", "Error saving draft: " + err.message);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
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

          {/* Main Left Content: Category Sidebar + Product Grid */}
          <div className="pos-left-body">
            <CategoryTabs
              active={activeCategory}
              onSelect={setActiveCategory}
              categories={categoryNames}
            />
            <ProductGrid products={filteredProducts} addToCart={addToCart} />
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

"use client";

import { useMemo, useState } from "react";
import "./pos.css";

import PosToolbar from "./components/PosToolbar";
import CategoryTabs from "./components/CategoryTabs";
import ProductGrid from "./components/ProductGrid";
import OrderPanel from "./components/OrderPanel";

const PRODUCTS = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    sku: "IP15PRO",
    code: "IP15PRO",
    price: 999.00,
    stock: 32,
    category: "Mobile Phones",
    brand: "Apple",
    imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Sony WH-1000XM5",
    sku: "SONY1000XM5",
    code: "SONY1000XM5",
    price: 349.00,
    stock: 15,
    category: "Accessories",
    brand: "Sony",
    imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Apple Watch Series 9",
    sku: "AW-S9",
    code: "AW-S9",
    price: 399.00,
    stock: 18,
    category: "Electronics",
    brand: "Apple",
    imageUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Dell Inspiron 15",
    sku: "DELL15",
    code: "DELL15",
    price: 650.00,
    stock: 8,
    category: "Computers",
    brand: "Dell",
    imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Logitech Keyboard",
    sku: "LOGI-KB",
    code: "LOGI-KB",
    price: 45.00,
    stock: 50,
    category: "Accessories",
    brand: "Logitech",
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    name: "Logitech Mouse",
    sku: "LOGI-MS",
    code: "LOGI-MS",
    price: 45.00,
    stock: 60,
    category: "Accessories",
    brand: "Logitech",
    imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: 7,
    name: "HP LaserJet Pro",
    sku: "HP-LJ",
    code: "HP-LJ",
    price: 230.00,
    stock: 7,
    category: "Electronics",
    brand: "HP",
    imageUrl: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: 8,
    name: "JBL Flip 6",
    sku: "JBLFLIP6",
    code: "JBLFLIP6",
    price: 129.00,
    stock: 22,
    category: "Accessories",
    brand: "JBL",
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: 9,
    name: "Canon EOS 200D",
    sku: "CANON200D",
    code: "CANON200D",
    price: 450.00,
    stock: 5,
    category: "Electronics",
    brand: "Canon",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop&q=80",
  },
];

const BRANDS = ["All", "Apple", "Sony", "Dell", "Logitech", "HP", "JBL", "Canon"];
const CATEGORY_NAMES = [
  "All",
  "Electronics",
  "Mobile Phones",
  "Computers",
  "Accessories",
  "Home Appliances",
  "Clothing",
  "Footwear",
  "Beauty",
  "Toys",
  "Others",
];

export default function POSPage() {
  const [activeTab, setActiveTab] = useState("Products");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [query, setQuery] = useState("");

  const [customer, setCustomer] = useState("Walk-in Customer");
  const [discountValue, setDiscountValue] = useState(50);
  const [amountReceived, setAmountReceived] = useState(1500);
  const [selectedPayment, setSelectedPayment] = useState("Cash");

  // Initial cart items matching screenshot
  const [cart, setCart] = useState([
    {
      cartId: 1,
      id: 1,
      name: "iPhone 15 Pro",
      sku: "IP15PRO",
      price: 999.00,
      qty: 1,
      imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&auto=format&fit=crop&q=80",
    },
    {
      cartId: 2,
      id: 2,
      name: "Sony WH-1000XM5",
      sku: "SONY1000XM5",
      price: 349.00,
      qty: 1,
      imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&auto=format&fit=crop&q=80",
    },
    {
      cartId: 3,
      id: 6,
      name: "Logitech Mouse",
      sku: "LOGI-MS",
      price: 25.00,
      qty: 2,
      imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&auto=format&fit=crop&q=80",
    },
  ]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
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
  }, [activeCategory, selectedBrand, query]);

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
    const found = PRODUCTS.find(
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

  const handleCompleteSale = () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }
    alert("Sale Completed Successfully!");
    clearCart();
  };

  const handleHoldSale = () => {
    alert("Sale held on order draft!");
  };

  const handleSaveDraft = () => {
    alert("Draft saved!");
  };

  const handlePrintReceipt = () => {
    window.print();
  };

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
            categories={CATEGORY_NAMES}
            brands={BRANDS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Main Left Content: Category Sidebar + Product Grid */}
          <div className="pos-left-body">
            <CategoryTabs active={activeCategory} onSelect={setActiveCategory} />
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
            discountValue={discountValue}
            onDiscountChange={setDiscountValue}
            taxRate={10}
            shipping={0}
            otherCharges={0}
            amountReceived={amountReceived}
            onAmountReceivedChange={setAmountReceived}
            selectedPayment={selectedPayment}
            onSelectPayment={setSelectedPayment}
            onCompleteSale={handleCompleteSale}
            onHoldSale={handleHoldSale}
            onSaveDraft={handleSaveDraft}
            onPrintReceipt={handlePrintReceipt}
          />
        </div>
      </div>
    </div>
  );
}

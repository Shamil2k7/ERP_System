"use client";

import { useMemo, useState } from "react";
import "./pos.css";

import PosToolbar from "./components/PosToolbar";
import CategoryTabs from "./components/CategoryTabs";
import ProductGrid from "./components/ProductGrid";
import OrderPanel from "./components/OrderPanel";
import { GlyphTee, GlyphJeans, GlyphShirt, GlyphJacket, GlyphBag } from "./components/icons";

const PRODUCTS = [
  {
    id: 1,
    name: "Product full name goes here",
    code: "1254654",
    available: 200,
    price: 120,
    category: "T-shirt",
    bg: "#f4a15b",
    icon: GlyphTee,
    imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Product full name goes here",
    code: "1254654",
    available: 200,
    price: 120,
    category: "T-shirt",
    bg: "#e4a93b",
    icon: GlyphTee,
    imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Product full name goes here",
    code: "1254654",
    available: 200,
    price: 120,
    category: "T-shirt",
    bg: "#d9cff0",
    icon: GlyphTee,
    iconDark: true,
    imageUrl: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    name: "Product full name goes here",
    code: "1254654",
    available: 200,
    price: 120,
    category: "T-shirt",
    bg: "#c9484f",
    icon: GlyphTee,
    imageUrl: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    name: "Product full name goes here",
    code: "1254654",
    available: 200,
    price: 120,
    category: "T-shirt",
    bg: "#bfc3c7",
    icon: GlyphTee,
    iconDark: true,
    imageUrl: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: 6,
    name: "Product full name goes here",
    code: "1254654",
    available: 200,
    price: 120,
    category: "Shirt",
    bg: "#7fa0c4",
    icon: GlyphShirt,
    imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: 7,
    name: "Product full name goes here",
    code: "1254654",
    available: 200,
    price: 120,
    category: "Shirt",
    bg: "#3e5b4b",
    icon: GlyphShirt,
    imageUrl: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: 8,
    name: "Product full name goes here",
    code: "1254654",
    available: 200,
    price: 120,
    category: "Shirt",
    bg: "#2b2b2e",
    icon: GlyphJacket,
    imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: 9,
    name: "Product full name goes here",
    code: "1254654",
    available: 200,
    price: 120,
    category: "Koti",
    bg: "#d8a468",
    icon: GlyphBag,
    imageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: 10,
    name: "Product full name goes here",
    code: "1254654",
    available: 200,
    price: 120,
    category: "Jeans pant",
    bg: "#a9c0d6",
    icon: GlyphJeans,
    imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: 11,
    name: "Product full name goes here",
    code: "1254654",
    available: 200,
    price: 120,
    category: "Jeans pant",
    bg: "#6e92b8",
    icon: GlyphJeans,
    imageUrl: "https://images.unsplash.com/photo-1542272604-780c36856842?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: 12,
    name: "Product full name goes here",
    code: "1254654",
    available: 200,
    price: 120,
    category: "Jeans pant",
    bg: "#4e6e8f",
    icon: GlyphJeans,
    imageUrl: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=400&auto=format&fit=crop&q=80"
  },
];

const CATEGORIES = [
  { label: "All", count: 23145 },
  { label: "T-shirt", count: 224 },
  { label: "Jeans pant", count: 125 },
  { label: "Shirt", count: 509 },
  { label: "Trouser", count: 100 },
  { label: "Koti", count: 225 },
  { label: "Money bag", count: 425 },
];

export default function POSPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const [cart, setCart] = useState(() =>
    PRODUCTS.slice(0, 3).map((p) => ({ ...p, cartId: p.id, qty: 2, size: "M" }))
  );
  const [selectedId, setSelectedId] = useState(PRODUCTS[0]?.id ?? null);

  const [discountRate, setDiscountRate] = useState(5);
  const [taxRate, setTaxRate] = useState(2);
  const [couponCode, setCouponCode] = useState("");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.cartId === product.id);
      if (exists) {
        return prev.map((item) =>
          item.cartId === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, cartId: product.id, qty: 1, size: "M" }];
    });
    setSelectedId(product.id);
  };

  const addScannedProduct = (code) => {
    const match = PRODUCTS.find((p) => p.code === code);
    if (match) {
      addToCart(match);
      return;
    }
    const scanned = {
      id: `scan-${Date.now()}`,
      name: `Scanned Item ${code}`,
      code,
      available: 100,
      price: 99,
      bg: "#9ca3af",
      icon: GlyphBag,
    };
    setCart((prev) => [...prev, { ...scanned, cartId: scanned.id, qty: 1, size: "M" }]);
    setSelectedId(scanned.id);
  };

  const removeItem = (cartId) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, next) => {
    setCart((prev) =>
      prev
        .map((item) => (item.cartId === cartId ? { ...item, qty: Math.max(0, next) } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
    setSelectedId(null);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discountAmount = subtotal * (discountRate / 100);
  const taxAmount = subtotal * (taxRate / 100);
  const total = Math.max(0, subtotal - discountAmount + taxAmount);

  return (
    <div className="pos-wrapper">
      <div style={{ maxWidth: "1500px", margin: "0 auto" }}>
        {/* Top Header Toolbar */}
        <PosToolbar
          query={query}
          onQueryChange={setQuery}
          onScan={addScannedProduct}
        />

        {/* Category Cards Row */}
        <CategoryTabs
          categories={CATEGORIES}
          active={activeCategory}
          onSelect={setActiveCategory}
        />

        {/* Main Content: Choose Products Grid & Order Panel */}
        <div className="pos-main-grid">
          <div>
            <h2 className="pos-products-header">Choose Products</h2>
            <ProductGrid products={filteredProducts} addToCart={addToCart} />
          </div>

          <OrderPanel
            cart={cart}
            removeItem={removeItem}
            clearCart={clearCart}
            updateQuantity={updateQuantity}
            selectedId={selectedId}
            onSelect={setSelectedId}
            orderNo="125125"
            subtotal={subtotal > 0 ? subtotal : 85.25}
            discountRate={discountRate}
            setDiscountRate={setDiscountRate}
            taxRate={taxRate}
            setTaxRate={setTaxRate}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountAmount={subtotal > 0 ? discountAmount : 20}
            taxAmount={subtotal > 0 ? taxAmount : 10.25}
            total={subtotal > 0 ? total : 77.00}
            onPayment={clearCart}
          />
        </div>
      </div>
    </div>
  );
}

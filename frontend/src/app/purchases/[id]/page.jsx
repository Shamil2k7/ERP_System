"use client";

import PurchaseCard from "../components/PurchaseCard";

export default function PurchaseDetailsPage() {

  const purchase = {
    purchaseNo: "PO-1001",
    supplier: "ABC Traders",
    warehouse: "Main Warehouse",
    date: "2026-08-05",
    status: "Received",
    total: 61200,

    items: [
      {
        product: "Dell Laptop",
        qty: 1,
        price: 45000,
      },
      {
        product: "Keyboard",
        qty: 4,
        price: 1800,
      },
      {
        product: "Mouse",
        qty: 6,
        price: 700,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">
        Purchase Details
      </h1>

      <PurchaseCard purchase={purchase} />

    </div>
  );
}
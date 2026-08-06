"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PurchaseTable from "./components/PurchaseTable";

const purchaseData = [
  {
    id: 1,
    purchaseNo: "PO-1001",
    supplier: "ABC Traders",
    warehouse: "Main Warehouse",
    date: "2026-08-05",
    total: 45200,
    paymentStatus: "Paid",
    status: "Received",
  },
  {
    id: 2,
    purchaseNo: "PO-1002",
    supplier: "Tech Distributors",
    warehouse: "Branch Warehouse",
    date: "2026-08-04",
    total: 18500,
    paymentStatus: "Pending",
    status: "Pending",
  },
  {
    id: 3,
    purchaseNo: "PO-1003",
    supplier: "Global Suppliers",
    warehouse: "Main Warehouse",
    date: "2026-08-02",
    total: 74250,
    paymentStatus: "Paid",
    status: "Received",
  },
  {
    id: 4,
    purchaseNo: "PO-1004",
    supplier: "Smart Electronics",
    warehouse: "Backup Warehouse",
    date: "2026-08-01",
    total: 9600,
    paymentStatus: "Partial",
    status: "In Transit",
  },
];

export default function PurchasesPage() {
  const [search, setSearch] = useState("");

  const filteredPurchases = useMemo(() => {
    return purchaseData.filter((purchase) =>
      purchase.purchaseNo.toLowerCase().includes(search.toLowerCase()) ||
      purchase.supplier.toLowerCase().includes(search.toLowerCase()) ||
      purchase.warehouse.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            Purchase Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage supplier purchases and inventory receipts.
          </p>
        </div>

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Search Purchase..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-3 w-72"
          />

          <Link
            href="/purchases/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
          >
            + New Purchase
          </Link>

        </div>

      </div>

      <PurchaseTable purchases={filteredPurchases} />

    </div>
  );
}
"use client";

import { useMemo, useState } from "react";
import StockTable from "../components/StockTable";

const stockData = [
  {
    id: 1,
    sku: "PRD001",
    product: "Dell Inspiron 15",
    category: "Laptop",
    warehouse: "Main Warehouse",
    quantity: 40,
    reorder: 10,
  },
  {
    id: 2,
    sku: "PRD002",
    product: "HP Laser Printer",
    category: "Printer",
    warehouse: "Main Warehouse",
    quantity: 6,
    reorder: 8,
  },
  {
    id: 3,
    sku: "PRD003",
    product: "Logitech Mouse",
    category: "Accessories",
    warehouse: "Branch Warehouse",
    quantity: 120,
    reorder: 20,
  },
  {
    id: 4,
    sku: "PRD004",
    product: "Mechanical Keyboard",
    category: "Accessories",
    warehouse: "Backup Warehouse",
    quantity: 15,
    reorder: 15,
  },
  {
    id: 5,
    sku: "PRD005",
    product: "Samsung Monitor",
    category: "Monitor",
    warehouse: "Branch Warehouse",
    quantity: 4,
    reorder: 8,
  },
];

export default function WarehouseStockPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return stockData.filter((item) =>
      item.product.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase()) ||
      item.warehouse.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            Warehouse Stock
          </h1>

          <p className="text-gray-500">
            View available inventory across warehouses.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 border rounded-lg px-4 py-3"
        />

      </div>

      <StockTable stock={filtered} />

    </div>
  );
}
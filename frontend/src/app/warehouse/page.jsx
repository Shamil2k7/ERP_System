"use client";

import WarehouseCard from "./components/WarehouseCard";
import Link from "next/link";

const warehouses = [
  {
    id: 1,
    name: "Main Warehouse",
    location: "Head Office",
    products: 1450,
    stock: 8540,
    status: "Active",
  },
  {
    id: 2,
    name: "Branch Warehouse",
    location: "Kozhikode",
    products: 980,
    stock: 5240,
    status: "Active",
  },
  {
    id: 3,
    name: "Backup Warehouse",
    location: "Palakkad",
    products: 610,
    stock: 3180,
    status: "Maintenance",
  },
];

export default function WarehousePage() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Warehouse Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Manage warehouses and inventory.
          </p>
        </div>

        <div className="flex gap-3">

          <Link
            href="/warehouse/stock"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
          >
            View Stock
          </Link>

          <Link
            href="/warehouse/transfer"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
          >
            Stock Transfer
          </Link>

        </div>

      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">

        {warehouses.map((warehouse) => (
          <WarehouseCard
            key={warehouse.id}
            warehouse={warehouse}
          />
        ))}

      </div>

    </div>
  );
}
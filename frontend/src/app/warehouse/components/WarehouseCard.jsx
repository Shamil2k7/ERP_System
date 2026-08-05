"use client";

import Link from "next/link";

export default function WarehouseCard({ warehouse }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 border">

      <div className="p-6">

        <div className="flex justify-between items-center">

          <h2 className="text-xl font-bold">
            {warehouse.name}
          </h2>

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              warehouse.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {warehouse.status}
          </span>

        </div>

        <p className="text-gray-500 mt-2">
          📍 {warehouse.location}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4">

          <div className="bg-gray-100 rounded-lg p-4">

            <p className="text-gray-500 text-sm">
              Products
            </p>

            <h3 className="text-2xl font-bold">
              {warehouse.products}
            </h3>

          </div>

          <div className="bg-gray-100 rounded-lg p-4">

            <p className="text-gray-500 text-sm">
              Total Stock
            </p>

            <h3 className="text-2xl font-bold">
              {warehouse.stock}
            </h3>

          </div>

        </div>

        <div className="mt-6 flex gap-3">

          <Link
            href="/warehouse/stock"
            className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700"
          >
            Stock
          </Link>

          <Link
            href="/warehouse/transfer"
            className="flex-1 bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700"
          >
            Transfer
          </Link>

        </div>

      </div>
    </div>
  );
}
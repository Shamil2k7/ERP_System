"use client";

import Link from "next/link";

export default function SalesTable({ sales }) {
  return (
    <div className="overflow-x-auto border rounded-lg">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>
            <th className="p-3 text-left">Invoice</th>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Payment</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Action</th>
          </tr>

        </thead>

        <tbody>

          {sales.map((sale) => (
            <tr
              key={sale.id}
              className="border-t"
            >
              <td className="p-3">{sale.id}</td>
              <td className="p-3">{sale.customer}</td>
              <td className="p-3">₹{sale.amount}</td>
              <td className="p-3">{sale.payment}</td>
              <td className="p-3">{sale.status}</td>
              <td className="p-3">{sale.date}</td>
              <td className="p-3">
                <Link
                  href={`/sales/${sale.id}`}
                  className="text-blue-600"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}
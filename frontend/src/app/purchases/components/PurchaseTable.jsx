"use client";

import Link from "next/link";

export default function PurchaseTable({ purchases = [] }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-4 py-3 text-left">
              Purchase No
            </th>

            <th className="px-4 py-3 text-left">
              Supplier
            </th>

            <th className="px-4 py-3 text-left">
              Warehouse
            </th>

            <th className="px-4 py-3 text-left">
              Date
            </th>

            <th className="px-4 py-3 text-right">
              Total
            </th>

            <th className="px-4 py-3 text-center">
              Payment
            </th>

            <th className="px-4 py-3 text-center">
              Status
            </th>

            <th className="px-4 py-3 text-center">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {purchases.length === 0 && (
            <tr>
              <td
                colSpan={8}
                className="text-center py-8 text-gray-500"
              >
                No Purchase Records Found
              </td>
            </tr>
          )}

          {purchases.map((purchase) => {

            const paymentColor =
              purchase.paymentStatus === "Paid"
                ? "bg-green-100 text-green-700"
                : purchase.paymentStatus === "Pending"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700";

            const statusColor =
              purchase.status === "Received"
                ? "bg-green-100 text-green-700"
                : purchase.status === "Pending"
                ? "bg-orange-100 text-orange-700"
                : "bg-blue-100 text-blue-700";

            return (
              <tr
                key={purchase.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="px-4 py-4 font-semibold">
                  {purchase.purchaseNo}
                </td>

                <td className="px-4 py-4">
                  {purchase.supplier}
                </td>

                <td className="px-4 py-4">
                  {purchase.warehouse}
                </td>

                <td className="px-4 py-4">
                  {purchase.date}
                </td>

                <td className="px-4 py-4 text-right font-bold">
                  ₹{purchase.total.toLocaleString()}
                </td>

                <td className="px-4 py-4 text-center">

                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${paymentColor}`}>
                    {purchase.paymentStatus}
                  </span>

                </td>

                <td className="px-4 py-4 text-center">

                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor}`}>
                    {purchase.status}
                  </span>

                </td>

                <td className="px-4 py-4">

                  <div className="flex justify-center gap-2">

                    <Link
                      href={`/purchases/${purchase.id}`}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      View
                    </Link>

                    <Link
                      href={`/purchases/edit/${purchase.id}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </Link>

                  </div>

                </td>

              </tr>
            );
          })}

        </tbody>

      </table>

    </div>
  );
}
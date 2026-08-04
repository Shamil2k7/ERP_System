"use client";

import Link from "next/link";

export default function CustomerTable({ customers = [] }) {
  if (!customers.length) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
        No customers found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">

      <table className="min-w-full">

        <thead className="bg-gray-100 border-b">

          <tr>

            <th className="px-4 py-3 text-left">#</th>

            <th className="px-4 py-3 text-left">
              Customer Name
            </th>

            <th className="px-4 py-3 text-left">
              Phone
            </th>

            <th className="px-4 py-3 text-left">
              Email
            </th>

            <th className="px-4 py-3 text-left">
              Loyalty ID
            </th>

            <th className="px-4 py-3 text-right">
              Credit Limit
            </th>

            <th className="px-4 py-3 text-right">
              Current Balance
            </th>

            <th className="px-4 py-3 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {customers.map((customer, index) => (

            <tr
              key={customer.id}
              className="border-b hover:bg-gray-50"
            >

              <td className="px-4 py-3">
                {index + 1}
              </td>

              <td className="px-4 py-3 font-medium">
                {customer.name}
              </td>

              <td className="px-4 py-3">
                {customer.phone}
              </td>

              <td className="px-4 py-3">
                {customer.email || "-"}
              </td>

              <td className="px-4 py-3">
                {customer.loyaltyId || "-"}
              </td>

              <td className="px-4 py-3 text-right">
                ₹{Number(customer.creditLimit || 0).toFixed(2)}
              </td>

              <td className="px-4 py-3 text-right">
                ₹{Number(customer.currentBalance || 0).toFixed(2)}
              </td>

              <td className="px-4 py-3">

                <div className="flex justify-center gap-2">

                  <Link
                    href={`/customers/${customer.id}`}
                    className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    View
                  </Link>

                  <Link
                    href={`/customers/edit/${customer.id}`}
                    className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      alert(
                        `Delete customer: ${customer.name}`
                      )
                    }
                    className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}
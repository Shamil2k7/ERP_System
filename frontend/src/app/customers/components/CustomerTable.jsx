"use client";

import Link from "next/link";

export default function CustomerTable({ customers }) {

  return (
    <div className="overflow-x-auto border rounded-lg shadow">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="text-left p-4">ID</th>
            <th className="text-left p-4">Name</th>
            <th className="text-left p-4">Email</th>
            <th className="text-left p-4">Phone</th>
            <th className="text-left p-4">City</th>
            <th className="text-left p-4">Status</th>
            <th className="text-left p-4">Actions</th>

          </tr>

        </thead>

        <tbody>

          {customers.length === 0 ? (

            <tr>
              <td
                colSpan={7}
                className="text-center p-6 text-gray-500"
              >
                No customers found.
              </td>
            </tr>

          ) : (

            customers.map((customer) => (

              <tr
                key={customer.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4">{customer.id}</td>

                <td className="p-4 font-medium">
                  {customer.name}
                </td>

                <td className="p-4">
                  {customer.email}
                </td>

                <td className="p-4">
                  {customer.phone}
                </td>

                <td className="p-4">
                  {customer.city}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      customer.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {customer.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex gap-3">

                    <Link
                      href={`/customers/${customer.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>

                    <Link
                      href={`/customers/edit/${customer.id}`}
                      className="text-green-600 hover:underline"
                    >
                      Edit
                    </Link>

                    <button
                      className="text-red-600 hover:underline"
                      onClick={() =>
                        alert(
                          "Delete functionality will be connected to the backend."
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}
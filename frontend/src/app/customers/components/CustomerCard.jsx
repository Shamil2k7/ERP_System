"use client";

export default function CustomerCard({ customer }) {
  return (
    <div className="space-y-6">

      <div className="border rounded-xl shadow bg-white p-6">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-3xl font-bold">
              {customer.firstName} {customer.lastName}
            </h1>

            <p className="text-gray-500">
              Customer ID : {customer.id}
            </p>

          </div>

          <span
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              customer.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {customer.status}
          </span>

        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-5">

        <div className="border rounded-lg p-5">
          <h3 className="text-gray-500">
            Total Orders
          </h3>

          <h2 className="text-3xl font-bold mt-2">
            {customer.totalOrders}
          </h2>
        </div>

        <div className="border rounded-lg p-5">
          <h3 className="text-gray-500">
            Total Purchase
          </h3>

          <h2 className="text-3xl font-bold mt-2">
            ₹{customer.totalSpent}
          </h2>
        </div>

        <div className="border rounded-lg p-5">
          <h3 className="text-gray-500">
            Customer Type
          </h3>

          <h2 className="text-2xl font-bold mt-2">
            {customer.customerType}
          </h2>
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="border rounded-lg p-6">

          <h2 className="text-xl font-bold mb-5">
            Customer Information
          </h2>

          <div className="space-y-3">

            <p><strong>Email:</strong> {customer.email}</p>

            <p><strong>Phone:</strong> {customer.phone}</p>

            <p><strong>Gender:</strong> {customer.gender}</p>

            <p>
              <strong>Location:</strong>{" "}
              {customer.city}, {customer.state}
            </p>

            <p><strong>Country:</strong> {customer.country}</p>

            <p><strong>Address:</strong> {customer.address}</p>

            <p><strong>Joined:</strong> {customer.joinedDate}</p>

          </div>

        </div>

        <div className="border rounded-lg p-6">

          <h2 className="text-xl font-bold mb-5">
            Recent Invoices
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-2">
                  Invoice
                </th>

                <th className="text-left py-2">
                  Date
                </th>

                <th className="text-left py-2">
                  Amount
                </th>

                <th className="text-left py-2">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {customer.invoices.map((invoice) => (

                <tr
                  key={invoice.id}
                  className="border-b"
                >

                  <td className="py-3">
                    {invoice.id}
                  </td>

                  <td>
                    {invoice.date}
                  </td>

                  <td>
                    ₹{invoice.amount}
                  </td>

                  <td>

                    <span className="text-green-600 font-semibold">
                      {invoice.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}
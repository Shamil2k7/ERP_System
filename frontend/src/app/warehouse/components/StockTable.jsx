"use client";

export default function StockTable({ stock = [] }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-4 py-3 text-left">SKU</th>

            <th className="px-4 py-3 text-left">Product</th>

            <th className="px-4 py-3 text-left">Category</th>

            <th className="px-4 py-3 text-left">Warehouse</th>

            <th className="px-4 py-3 text-center">Quantity</th>

            <th className="px-4 py-3 text-center">Reorder Level</th>

            <th className="px-4 py-3 text-center">Status</th>

          </tr>

        </thead>

        <tbody>

          {stock.length === 0 && (

            <tr>

              <td
                colSpan="7"
                className="text-center py-8 text-gray-500"
              >
                No stock found.
              </td>

            </tr>

          )}

          {stock.map((item) => {

            const status =
              item.quantity === 0
                ? "Out of Stock"
                : item.quantity <= item.reorder
                ? "Low Stock"
                : "In Stock";

            const color =
              status === "In Stock"
                ? "bg-green-100 text-green-700"
                : status === "Low Stock"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700";

            return (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-4 py-4 font-medium">
                  {item.sku}
                </td>

                <td className="px-4 py-4">
                  {item.product}
                </td>

                <td className="px-4 py-4">
                  {item.category}
                </td>

                <td className="px-4 py-4">
                  {item.warehouse}
                </td>

                <td className="px-4 py-4 text-center font-semibold">
                  {item.quantity}
                </td>

                <td className="px-4 py-4 text-center">
                  {item.reorder}
                </td>

                <td className="px-4 py-4 text-center">

                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${color}`}>
                    {status}
                  </span>

                </td>

              </tr>
            );
          })}

        </tbody>

      </table>

    </div>
  );
}
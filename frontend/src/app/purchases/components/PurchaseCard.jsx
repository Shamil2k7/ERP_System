"use client";

export default function PurchaseCard({ purchase }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-2xl font-bold">
            {purchase.purchaseNo}
          </h2>

          <p className="text-gray-500">
            {purchase.date}
          </p>

        </div>

        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
          {purchase.status}
        </span>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div>

          <h3 className="font-semibold mb-2">
            Supplier
          </h3>

          <p>{purchase.supplier}</p>

        </div>

        <div>

          <h3 className="font-semibold mb-2">
            Warehouse
          </h3>

          <p>{purchase.warehouse}</p>

        </div>

      </div>

      <hr className="my-6" />

      <table className="min-w-full">

        <thead>

          <tr className="bg-gray-100">

            <th className="p-3 text-left">
              Product
            </th>

            <th className="p-3 text-center">
              Qty
            </th>

            <th className="p-3 text-right">
              Price
            </th>

            <th className="p-3 text-right">
              Total
            </th>

          </tr>

        </thead>

        <tbody>

          {purchase.items.map((item, index) => (

            <tr key={index} className="border-b">

              <td className="p-3">
                {item.product}
              </td>

              <td className="p-3 text-center">
                {item.qty}
              </td>

              <td className="p-3 text-right">
                ₹{item.price}
              </td>

              <td className="p-3 text-right font-semibold">
                ₹{item.qty * item.price}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <div className="flex justify-end mt-8">

        <div className="bg-gray-100 rounded-lg p-5 w-72">

          <div className="flex justify-between">

            <span>Grand Total</span>

            <span className="font-bold text-xl">
              ₹{purchase.total.toLocaleString()}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}
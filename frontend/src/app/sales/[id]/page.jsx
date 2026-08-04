"use client";

import { useParams } from "next/navigation";

export default function SaleDetailsPage() {
  const { id } = useParams();

  const sale = {
    id,
    customer: "Rahul",
    phone: "9876543210",
    payment: "Cash",
    status: "Completed",
    amount: 3200,
    tax: 200,
    discount: 100,
    date: "2026-08-01",
    items: [
      {
        name: "Nivia Football",
        qty: 2,
        price: 1200,
      },
      {
        name: "Football Pump",
        qty: 1,
        price: 800,
      },
    ],
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Sales Details
      </h1>

      <div className="border rounded-lg p-5 space-y-2">

        <p><strong>Invoice:</strong> {sale.id}</p>
        <p><strong>Customer:</strong> {sale.customer}</p>
        <p><strong>Phone:</strong> {sale.phone}</p>
        <p><strong>Date:</strong> {sale.date}</p>
        <p><strong>Payment:</strong> {sale.payment}</p>
        <p><strong>Status:</strong> {sale.status}</p>

      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Products
      </h2>

      <table className="w-full border">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Product</th>
            <th className="p-3 text-left">Qty</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Total</th>
          </tr>
        </thead>

        <tbody>

          {sale.items.map((item, index) => (
            <tr
              key={index}
              className="border-t"
            >
              <td className="p-3">{item.name}</td>
              <td className="p-3">{item.qty}</td>
              <td className="p-3">₹{item.price}</td>
              <td className="p-3">
                ₹{item.qty * item.price}
              </td>
            </tr>
          ))}

        </tbody>

      </table>

      <div className="mt-6 text-right space-y-2">

        <p><strong>Discount:</strong> ₹{sale.discount}</p>
        <p><strong>Tax:</strong> ₹{sale.tax}</p>

        <h2 className="text-2xl font-bold">
          Grand Total: ₹{sale.amount}
        </h2>

      </div>

    </div>
  );
}
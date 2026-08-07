"use client";

import SalesCard from "../components/SalesCard";

export default function SaleDetailsPage() {

  const sale = {
    invoiceNo: "INV-1001",
    customer: "John Doe",
    cashier: "Admin",
    paymentMethod: "Cash",
    paymentStatus: "Paid",
    date: "2026-08-06",

    discount: 500,
    tax: 1000,
    subTotal: 45000,
    total: 45500,

    items: [
      {
        product: "Dell Laptop",
        qty: 1,
        price: 45000,
      },
    ],
  };

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">
        Sale Details
      </h1>

      <SalesCard sale={sale} />

    </div>

  );

}
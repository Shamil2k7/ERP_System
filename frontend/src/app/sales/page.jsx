"use client";

import { useMemo, useState } from "react";

import SalesTable from "./components/SalesTable";
import SalesFilter from "./components/SalesFilter";
import SalesSummary from "./components/SalesSummary";

export default function SalesPage() {
  const [search, setSearch] = useState("");

  const sales = [
    {
      id: "INV1001",
      customer: "Rahul",
      amount: 3200,
      payment: "Cash",
      status: "Completed",
      date: "2026-08-01",
    },
    {
      id: "INV1002",
      customer: "Anil",
      amount: 5700,
      payment: "UPI",
      status: "Completed",
      date: "2026-08-01",
    },
    {
      id: "INV1003",
      customer: "Niyas",
      amount: 1400,
      payment: "Card",
      status: "Pending",
      date: "2026-07-31",
    },
  ];

  const filteredSales = useMemo(() => {
    return sales.filter(
      (sale) =>
        sale.customer.toLowerCase().includes(search.toLowerCase()) ||
        sale.id.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-3xl font-bold">
        Sales Management
      </h1>

      <SalesSummary sales={filteredSales} />

      <SalesFilter
        search={search}
        setSearch={setSearch}
      />

      <SalesTable sales={filteredSales} />

    </div>
  );
}
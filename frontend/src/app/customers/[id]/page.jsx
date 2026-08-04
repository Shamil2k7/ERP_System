"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CustomerCard from "../components/CustomerCard";

export default function CustomerDetailsPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    // Replace with API call
    // GET /api/customers/:id

    const data = {
      id,
      firstName: "Rahul",
      lastName: "Kumar",
      email: "rahul@gmail.com",
      phone: "9876543210",
      gender: "Male",
      city: "Kochi",
      state: "Kerala",
      country: "India",
      address: "MG Road",
      customerType: "Regular",
      status: "Active",
      totalOrders: 18,
      totalSpent: 54800,
      joinedDate: "12 Jan 2025",
      invoices: [
        {
          id: "INV1001",
          date: "01 Aug 2026",
          amount: 3200,
          status: "Paid",
        },
        {
          id: "INV1002",
          date: "25 Jul 2026",
          amount: 1850,
          status: "Paid",
        },
        {
          id: "INV1003",
          date: "20 Jul 2026",
          amount: 7400,
          status: "Paid",
        },
      ],
    };

    setCustomer(data);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="p-8">
        Loading customer...
      </div>
    );
  }

  return (
    <div className="p-6">
      <CustomerCard customer={customer} />
    </div>
  );
}
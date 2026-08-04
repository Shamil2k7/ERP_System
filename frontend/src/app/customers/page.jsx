"use client";

import { useMemo, useState } from "react";
import CustomerTable from "./components/CustomerTable";
import CustomerFilter from "./components/CustomerFilter";

export default function CustomersPage() {
  const [search, setSearch] = useState("");

  const [customers] = useState([
    {
      id: 1,
      name: "Rahul Kumar",
      email: "rahul@gmail.com",
      phone: "9876543210",
      city: "Kochi",
      status: "Active",
    },
    {
      id: 2,
      name: "Anil Das",
      email: "anil@gmail.com",
      phone: "9876543211",
      city: "Calicut",
      status: "Active",
    },
    {
      id: 3,
      name: "Salman",
      email: "salman@gmail.com",
      phone: "9999999999",
      city: "Malappuram",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Niyas",
      email: "niyas@gmail.com",
      phone: "8888888888",
      city: "Thrissur",
      status: "Active",
    },
  ]);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.includes(search)
    );
  }, [customers, search]);

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Customers
        </h1>

        <a
          href="/customers/add"
          className="bg-blue-600 text-white px-5 py-3 rounded"
        >
          + Add Customer
        </a>

      </div>

      <CustomerFilter
        search={search}
        setSearch={setSearch}
      />

      <CustomerTable
        customers={filteredCustomers}
      />

    </div>
  );
}
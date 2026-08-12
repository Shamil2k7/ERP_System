"use client";

import { useEffect, useMemo, useState } from "react";
import CustomerTable from "../components/CustomerTable";
import CustomerFilter from "../components/CustomerFilter";


export default function CustomersPage() {
  const [search, setSearch] = useState("");

  const [customers, setCustomers] = useState([]);

useEffect(() => {

    fetch("http://localhost:5000/api/customers")
        .then((res) => res.json())
        .then((data) => {

            setCustomers(data.data);

        });

}, []);

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
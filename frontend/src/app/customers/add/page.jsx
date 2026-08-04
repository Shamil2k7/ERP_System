"use client";

import CustomerForm from "../components/CustomerForm";

export default function AddCustomerPage() {

  const handleSave = (customer) => {

    console.log("Customer Data:", customer);

    // TODO:
    // POST http://localhost:5000/api/customers

    alert("Customer Added Successfully!");

  };

  return (

    <div className="p-6 max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Add Customer
      </h1>

      <CustomerForm
        onSubmit={handleSave}
      />

    </div>

  );

}
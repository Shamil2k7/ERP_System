"use client";

import PurchaseForm from "../components/PurchaseForm";

export default function AddPurchasePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Create Purchase
        </h1>

        <p className="text-gray-500 mt-2">
          Create a new purchase order.
        </p>

      </div>

      <PurchaseForm />

    </div>
  );
}
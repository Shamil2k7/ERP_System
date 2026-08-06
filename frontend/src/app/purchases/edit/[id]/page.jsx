"use client";

import PurchaseForm from "../../components/PurchaseForm";

export default function EditPurchasePage() {

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">
        Edit Purchase
      </h1>

      <PurchaseForm />

    </div>
  );
}
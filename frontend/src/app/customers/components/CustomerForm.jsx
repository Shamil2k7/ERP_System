"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CustomerForm({
  initialData = {},
  onSubmit,
}) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: initialData.name || "",
    phone: initialData.phone || "",
    email: initialData.email || "",
    address: initialData.address || "",
    loyaltyId: initialData.loyaltyId || "",
    creditLimit: initialData.creditLimit || 0,
    currentBalance: initialData.currentBalance || 0,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "creditLimit" || name === "currentBalance"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Customer name is required.");
      return;
    }

    if (!form.phone.trim()) {
      alert("Phone number is required.");
      return;
    }

    try {
      setLoading(true);
      await onSubmit(form);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow p-6 space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div>
          <label className="block mb-2 font-medium">
            Customer Name *
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter customer name"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Phone *
          </label>

          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Loyalty ID
          </label>

          <input
            type="text"
            name="loyaltyId"
            value={form.loyaltyId}
            onChange={handleChange}
            placeholder="Optional loyalty ID"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>

      <div>
        <label className="block mb-2 font-medium">
          Address
        </label>

        <textarea
          name="address"
          rows={4}
          value={form.address}
          onChange={handleChange}
          placeholder="Enter customer address"
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div>
          <label className="block mb-2 font-medium">
            Credit Limit
          </label>

          <input
            type="number"
            step="0.01"
            min="0"
            name="creditLimit"
            value={form.creditLimit}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Current Balance
          </label>

          <input
            type="number"
            step="0.01"
            min="0"
            name="currentBalance"
            value={form.currentBalance}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>

      <div className="flex gap-3 pt-4">

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Customer"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/customers")}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
        >
          Cancel
        </button>

      </div>
    </form>
  );
}
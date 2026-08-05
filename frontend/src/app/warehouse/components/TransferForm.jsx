"use client";

import { useState } from "react";

const warehouseList = [
  "Main Warehouse",
  "Branch Warehouse",
  "Backup Warehouse",
];

const productList = [
  "Dell Inspiron 15",
  "HP Laser Printer",
  "Samsung Monitor",
  "Mechanical Keyboard",
  "Logitech Mouse",
];

export default function TransferForm() {

  const [form, setForm] = useState({
    fromWarehouse: "",
    toWarehouse: "",
    product: "",
    quantity: "",
    remarks: "",
  });

  const [history, setHistory] = useState([]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      !form.fromWarehouse ||
      !form.toWarehouse ||
      !form.product ||
      !form.quantity
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (form.fromWarehouse === form.toWarehouse) {
      alert("From and To warehouse cannot be the same.");
      return;
    }

    const newTransfer = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      ...form,
    };

    setHistory((prev) => [newTransfer, ...prev]);

    alert("Stock transferred successfully.");

    setForm({
      fromWarehouse: "",
      toWarehouse: "",
      product: "",
      quantity: "",
      remarks: "",
    });
  };

  return (
    <div className="space-y-8">

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6"
      >

        <h2 className="text-2xl font-bold mb-6">
          Transfer Details
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="font-medium">
              From Warehouse
            </label>

            <select
              name="fromWarehouse"
              value={form.fromWarehouse}
              onChange={handleChange}
              className="mt-2 w-full border rounded-lg p-3"
            >
              <option value="">Select Warehouse</option>

              {warehouseList.map((warehouse) => (
                <option key={warehouse}>
                  {warehouse}
                </option>
              ))}

            </select>

          </div>

          <div>

            <label className="font-medium">
              To Warehouse
            </label>

            <select
              name="toWarehouse"
              value={form.toWarehouse}
              onChange={handleChange}
              className="mt-2 w-full border rounded-lg p-3"
            >
              <option value="">Select Warehouse</option>

              {warehouseList.map((warehouse) => (
                <option key={warehouse}>
                  {warehouse}
                </option>
              ))}

            </select>

          </div>

          <div>

            <label className="font-medium">
              Product
            </label>

            <select
              name="product"
              value={form.product}
              onChange={handleChange}
              className="mt-2 w-full border rounded-lg p-3"
            >
              <option value="">Select Product</option>

              {productList.map((product) => (
                <option key={product}>
                  {product}
                </option>
              ))}

            </select>

          </div>

          <div>

            <label className="font-medium">
              Quantity
            </label>

            <input
              type="number"
              min="1"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              placeholder="Enter Quantity"
              className="mt-2 w-full border rounded-lg p-3"
            />

          </div>

        </div>

        <div className="mt-6">

          <label className="font-medium">
            Remarks
          </label>

          <textarea
            rows={4}
            name="remarks"
            value={form.remarks}
            onChange={handleChange}
            placeholder="Remarks..."
            className="mt-2 w-full border rounded-lg p-3"
          />

        </div>

        <div className="mt-6">

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
          >
            Transfer Stock
          </button>

        </div>

      </form>

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-5">
          Recent Transfers
        </h2>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="px-4 py-3 text-left">Date</th>

                <th className="px-4 py-3 text-left">Product</th>

                <th className="px-4 py-3 text-left">From</th>

                <th className="px-4 py-3 text-left">To</th>

                <th className="px-4 py-3 text-center">Qty</th>

              </tr>

            </thead>

            <tbody>

              {history.length === 0 && (

                <tr>

                  <td
                    colSpan={5}
                    className="text-center py-8 text-gray-500"
                  >
                    No transfer history.
                  </td>

                </tr>

              )}

              {history.map((item) => (

                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="px-4 py-3">
                    {item.date}
                  </td>

                  <td className="px-4 py-3">
                    {item.product}
                  </td>

                  <td className="px-4 py-3">
                    {item.fromWarehouse}
                  </td>

                  <td className="px-4 py-3">
                    {item.toWarehouse}
                  </td>

                  <td className="px-4 py-3 text-center font-semibold">
                    {item.quantity}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}
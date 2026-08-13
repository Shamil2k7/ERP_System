"use client";

import { useState } from "react";
import SupplierSelect from "./SupplierSelect";
import { useAlert } from "@/context/AlertContext";

const warehouses = [
  "Main Warehouse",
  "Branch Warehouse",
  "Backup Warehouse",
];

const products = [
  {
    id: 1,
    name: "Dell Laptop",
    price: 45000,
  },
  {
    id: 2,
    name: "HP Printer",
    price: 12000,
  },
  {
    id: 3,
    name: "Keyboard",
    price: 1800,
  },
  {
    id: 4,
    name: "Mouse",
    price: 700,
  },
];

export default function PurchaseForm() {
  const { showSuccess } = useAlert();
  const [supplier, setSupplier] = useState("");
  const [warehouse, setWarehouse] = useState("");

  const [items, setItems] = useState([
    {
      product: "",
      qty: 1,
      price: 0,
    },
  ]);

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        product: "",
        qty: 1,
        price: 0,
      },
    ]);
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;

    if (field === "product") {
      const selectedProd = products.find((p) => p.name === value);
      updated[index].price = selectedProd ? selectedProd.price : 0;
    }

    setItems(updated);
  };

  const grandTotal = items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    showSuccess("Purchase completed", "Purchase order saved and recorded successfully.");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="font-semibold">Supplier</label>
          <SupplierSelect
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
          />
        </div>

        <div>
          <label className="font-semibold">Warehouse</label>
          <select
            value={warehouse}
            onChange={(e) => setWarehouse(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Warehouse</option>
            {warehouses.map((w) => (
              <option key={w}>{w}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Products</h2>

        {items.map((item, index) => (
          <div
            key={index}
            className="grid md:grid-cols-4 gap-4 mb-4"
          >
            <select
              value={item.product}
              onChange={(e) =>
                updateItem(index, "product", e.target.value)
              }
              className="border rounded-lg p-3"
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.name}>
                  {product.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              min="1"
              value={item.qty}
              onChange={(e) =>
                updateItem(index, "qty", Number(e.target.value))
              }
              className="border rounded-lg p-3"
            />

            <input
              readOnly
              value={item.price}
              className="border rounded-lg p-3 bg-gray-100"
            />

            <div className="flex items-center font-bold text-lg">
              ₹{item.qty * item.price}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="mt-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          + Add Product
        </button>
      </div>

      <div className="mt-8 flex justify-end">
        <div className="w-72 bg-gray-100 rounded-lg p-6">
          <div className="flex justify-between">
            <span>Grand Total</span>
            <span className="font-bold text-xl">
              ₹{grandTotal.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Save Purchase
        </button>
      </div>
    </form>
  );
}
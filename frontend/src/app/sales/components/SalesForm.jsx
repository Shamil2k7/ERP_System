"use client";

import { useState } from "react";
import CustomerSelect from "./CustomerSelect";

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

import { useEffect } from "react";

export default function SalesForm({ saleId }) {
  const [customer, setCustomer] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState([
    {
      product: "",
      qty: 1,
      price: 0,
    },
  ]);

  useEffect(() => {
    if (saleId) {
      async function loadSaleData() {
        try {
          setLoading(true);
          const saleRes = await fetch(`http://localhost:5000/api/sales/${saleId}`).then((r) => r.json());
          if (saleRes && saleRes.success && saleRes.data) {
            const data = saleRes.data;
            setPaymentMethod(data.paymentMethod || "Cash");
            setDiscount(Number(data.discountAmount) || 0);
            setTax(Number(data.taxAmount) || 0);

            // Fetch customer name
            if (data.customerId) {
              try {
                const custRes = await fetch(`http://localhost:5000/api/customers/${data.customerId}`).then((r) => r.json());
                if (custRes?.success && custRes?.data?.name) {
                  setCustomer(custRes.data.name);
                } else if (custRes?.data?.name) {
                  setCustomer(custRes.data.name);
                }
              } catch (e) {
                console.error("Failed to fetch customer", e);
              }
            }

            // Fallback item using totalAmount/netAmount
            if (data.items && data.items.length > 0) {
              setItems(data.items.map((item) => ({
                product: item.product || item.productName || "Dell Laptop",
                qty: Number(item.quantity || item.qty) || 1,
                price: Number(item.unitPrice || item.price) || 0
              })));
            } else {
              setItems([
                {
                  product: "Dell Laptop",
                  qty: 1,
                  price: Number(data.totalAmount) || Number(data.netAmount) || 0
                }
              ]);
            }
          }
        } catch (e) {
          console.error("Error loading sale edit data:", e);
        } finally {
          setLoading(false);
        }
      }
      loadSaleData();
    }
  }, [saleId]);

  const addItem = () => {
    setItems([
      ...items,
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
      const selected = products.find((p) => p.name === value);
      updated[index].price = selected ? selected.price : 0;
    }

    setItems(updated);
  };

  const subTotal = items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  const grandTotal =
    subTotal + Number(tax) - Number(discount);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let customerId = null;
      try {
        const custRes = await fetch("http://localhost:5000/api/customers").then((r) => r.json());
        const match = (custRes.data || []).find((c) => c.name === customer);
        if (match) customerId = match.id;
      } catch (err) {
        console.error(err);
      }

      const body = {
        branchId: "00000000-0000-0000-0000-000000000000",
        customerId: customerId,
        orderNumber: `SO-${Date.now()}`,
        status: "CONFIRMED",
        totalAmount: subTotal,
        taxAmount: Number(tax),
        discountAmount: Number(discount)
      };

      if (saleId) {
        const res = await fetch(`http://localhost:5000/api/sales/${saleId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        }).then((r) => r.json());

        if (res.success) {
          alert("Sale Updated Successfully");
          window.location.href = "/sales";
        } else {
          alert(`Failed to update: ${res.message}`);
        }
      } else {
        const res = await fetch(`http://localhost:5000/api/sales`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        }).then((r) => r.json());

        if (res.success) {
          alert("Sale Created Successfully");
          window.location.href = "/sales";
        } else {
          alert(`Failed to create: ${res.message}`);
        }
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during submission");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-6"
    >

      <div className="grid md:grid-cols-2 gap-6">

        <div>

          <label className="font-semibold">
            Customer
          </label>

          <CustomerSelect
            value={customer}
            onChange={(e) =>
              setCustomer(e.target.value)
            }
          />

        </div>

        <div>

          <label className="font-semibold">
            Payment Method
          </label>

          <select
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          >

            <option>Cash</option>

            <option>Card</option>

            <option>UPI</option>

            <option>Bank Transfer</option>

          </select>

        </div>

      </div>

      <div className="mt-8">

        <h2 className="text-xl font-bold mb-4">
          Products
        </h2>

        {items.map((item, index) => (

          <div
            key={index}
            className="grid md:grid-cols-4 gap-4 mb-4"
          >

            <select
              value={item.product}
              onChange={(e) =>
                updateItem(
                  index,
                  "product",
                  e.target.value
                )
              }
              className="border rounded-lg p-3"
            >

              <option value="">
                Select Product
              </option>

              {products.map((product) => (

                <option
                  key={product.id}
                  value={product.name}
                >
                  {product.name}
                </option>

              ))}

            </select>

            <input
              type="number"
              min="1"
              value={item.qty}
              onChange={(e) =>
                updateItem(
                  index,
                  "qty",
                  Number(e.target.value)
                )
              }
              className="border rounded-lg p-3"
            />

            <input
              readOnly
              value={item.price}
              className="border rounded-lg p-3 bg-gray-100"
            />

            <div className="flex items-center font-bold">
              ₹{item.qty * item.price}
            </div>

          </div>

        ))}

        <button
          type="button"
          onClick={addItem}
          className="mt-3 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Product
        </button>

      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <div>

          <label className="font-semibold">
            Discount
          </label>

          <input
            type="number"
            value={discount}
            onChange={(e) =>
              setDiscount(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

        </div>

        <div>

          <label className="font-semibold">
            Tax
          </label>

          <input
            type="number"
            value={tax}
            onChange={(e) =>
              setTax(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

        </div>

      </div>

      <div className="flex justify-end mt-8">

        <div className="bg-gray-100 rounded-xl p-5 w-80">

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{subTotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Discount</span>
            <span>- ₹{discount}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Tax</span>
            <span>₹{tax}</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between text-xl font-bold">
            <span>Grand Total</span>
            <span>₹{grandTotal.toLocaleString()}</span>
          </div>

        </div>

      </div>

      <div className="mt-8">

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
        >
          Save Sale
        </button>

      </div>

    </form>
  );
}
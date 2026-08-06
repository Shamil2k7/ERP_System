"use client";

const suppliers = [
  {
    id: 1,
    name: "ABC Traders",
  },
  {
    id: 2,
    name: "Global Suppliers",
  },
  {
    id: 3,
    name: "Tech Distributors",
  },
  {
    id: 4,
    name: "Smart Electronics",
  },
];

export default function SupplierSelect({
  value,
  onChange,
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full border rounded-lg p-3"
    >
      <option value="">
        Select Supplier
      </option>

      {suppliers.map((supplier) => (
        <option
          key={supplier.id}
          value={supplier.name}
        >
          {supplier.name}
        </option>
      ))}
    </select>
  );
}
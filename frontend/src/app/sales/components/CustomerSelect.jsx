"use client";

const customers = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "Ameen",
  },
  {
    id: 3,
    name: "Rahul",
  },
  {
    id: 4,
    name: "Faris",
  },
];

export default function CustomerSelect({
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
        Select Customer
      </option>

      {customers.map((customer) => (
        <option
          key={customer.id}
          value={customer.name}
        >
          {customer.name}
        </option>
      ))}
    </select>
  );
}
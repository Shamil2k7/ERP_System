"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CustomerForm({

  initialData = {},

  onSubmit

}) {

  const router = useRouter();

  const [form, setForm] = useState({

    firstName: initialData.firstName || "",

    lastName: initialData.lastName || "",

    email: initialData.email || "",

    phone: initialData.phone || "",

    gender: initialData.gender || "Male",

    dob: initialData.dob || "",

    city: initialData.city || "",

    state: initialData.state || "",

    country: initialData.country || "India",

    address: initialData.address || "",

    zipCode: initialData.zipCode || "",

    customerType: initialData.customerType || "Regular",

    gstNumber: initialData.gstNumber || "",

    status: initialData.status || "Active"

  });

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      !form.firstName ||
      !form.email ||
      !form.phone
    ) {

      alert("Please fill all required fields.");

      return;

    }

    onSubmit(form);

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      <div className="grid md:grid-cols-2 gap-5">

        <div>

          <label>First Name *</label>

          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="border rounded p-3 w-full"
          />

        </div>

        <div>

          <label>Last Name</label>

          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="border rounded p-3 w-full"
          />

        </div>

        <div>

          <label>Email *</label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border rounded p-3 w-full"
          />

        </div>

        <div>

          <label>Phone *</label>

          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="border rounded p-3 w-full"
          />

        </div>

        <div>

          <label>Gender</label>

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="border rounded p-3 w-full"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

        </div>

        <div>

          <label>Date of Birth</label>

          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="border rounded p-3 w-full"
          />

        </div>

        <div>

          <label>City</label>

          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            className="border rounded p-3 w-full"
          />

        </div>

        <div>

          <label>State</label>

          <input
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
            className="border rounded p-3 w-full"
          />

        </div>

        <div>

          <label>Country</label>

          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            className="border rounded p-3 w-full"
          />

        </div>

        <div>

          <label>Zip Code</label>

          <input
            type="text"
            name="zipCode"
            value={form.zipCode}
            onChange={handleChange}
            className="border rounded p-3 w-full"
          />

        </div>

      </div>

      <div>

        <label>Address</label>

        <textarea
          rows={4}
          name="address"
          value={form.address}
          onChange={handleChange}
          className="border rounded p-3 w-full"
        />

      </div>

      <div className="grid md:grid-cols-3 gap-5">

        <div>

          <label>Customer Type</label>

          <select
            name="customerType"
            value={form.customerType}
            onChange={handleChange}
            className="border rounded p-3 w-full"
          >
            <option>Regular</option>
            <option>Wholesale</option>
            <option>VIP</option>
          </select>

        </div>

        <div>

          <label>GST Number</label>

          <input
            type="text"
            name="gstNumber"
            value={form.gstNumber}
            onChange={handleChange}
            className="border rounded p-3 w-full"
          />

        </div>

        <div>

          <label>Status</label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border rounded p-3 w-full"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

        </div>

      </div>

      <div className="flex gap-4">

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Save Customer
        </button>

        <button
          type="button"
          onClick={() => router.push("/customers")}
          className="bg-gray-500 text-white px-6 py-3 rounded"
        >
          Cancel
        </button>

      </div>

    </form>

  );

}
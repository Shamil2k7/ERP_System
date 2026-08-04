"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import CustomerForm from "../../components/CustomerForm";

export default function EditCustomerPage() {

  const { id } = useParams();

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [customer, setCustomer] = useState(null);

  useEffect(() => {

    // Replace this with your API call later
    // GET /api/customers/:id

    const dummyCustomer = {

      id,

      firstName: "Rahul",

      lastName: "Kumar",

      email: "rahul@gmail.com",

      phone: "9876543210",

      gender: "Male",

      dob: "1998-06-12",

      city: "Kochi",

      state: "Kerala",

      country: "India",

      address: "MG Road",

      zipCode: "682001",

      customerType: "Regular",

      gstNumber: "32ABCDE1234F1Z5",

      status: "Active"

    };

    setCustomer(dummyCustomer);

    setLoading(false);

  }, [id]);



  const handleUpdate = (updatedCustomer) => {

    console.log("Updated Customer");

    console.log(updatedCustomer);

    // PUT /api/customers/:id

    alert("Customer Updated Successfully");

    router.push("/customers");

  };



  if (loading) {

    return (

      <div className="p-8">

        Loading...

      </div>

    );

  }



  return (

    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">

        Edit Customer

      </h1>

      <CustomerForm

        initialData={customer}

        onSubmit={handleUpdate}

      />

    </div>

  );

}

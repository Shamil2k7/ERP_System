"use client";

import { useRouter } from "next/navigation";
import CustomerForm from "../components/CustomerForm";

export default function AddCustomerPage() {

    const router = useRouter();

    const saveCustomer = async (customer) => {

        try {

            const res = await fetch(
                "http://localhost:5000/api/customers",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(customer),
                }
            );

            const data = await res.json();

            if (!res.ok) {

                alert(data.message);

                return;

            }

            alert("Customer Added");

            router.push("/customers");

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="p-6">

            <h1 className="text-3xl font-bold mb-6">

                Add Customer

            </h1>

            <CustomerForm onSubmit={saveCustomer} />

        </div>

    );

}
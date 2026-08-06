"use client";

import "./RecentOrders.css";

const orders = [
  {
    id: "#ORD-1001",
    customer: "John Smith",
    product: "Dell Laptop",
    amount: "$1,250",
    status: "Completed",
  },
  {
    id: "#ORD-1002",
    customer: "Emma Wilson",
    product: "Samsung TV",
    amount: "$980",
    status: "Pending",
  },
  {
    id: "#ORD-1003",
    customer: "Michael Brown",
    product: "iPhone 15",
    amount: "$1,180",
    status: "Processing",
  },
  {
    id: "#ORD-1004",
    customer: "Sophia Taylor",
    product: "Office Chair",
    amount: "$240",
    status: "Completed",
  },
  {
    id: "#ORD-1005",
    customer: "David Lee",
    product: "Wireless Mouse",
    amount: "$45",
    status: "Cancelled",
  },
];

export default function RecentOrders() {
  return (
    <div className="recent-orders">

      <div className="orders-header">
        <h3>Recent Orders</h3>
        <button>View All</button>
      </div>

      <table>

        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.product}</td>
              <td>{order.amount}</td>

              <td>
                <span
                  className={`status ${order.status.toLowerCase()}`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}
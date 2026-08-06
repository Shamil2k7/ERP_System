"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

import "./RevenueExpenseChart.css";

const data = [
  { month: "Jan", revenue: 42000, expenses: 28000 },
  { month: "Feb", revenue: 51000, expenses: 32000 },
  { month: "Mar", revenue: 47000, expenses: 30000 },
  { month: "Apr", revenue: 60000, expenses: 36000 },
  { month: "May", revenue: 68000, expenses: 41000 },
  { month: "Jun", revenue: 75000, expenses: 46000 },
];

export default function RevenueExpenseChart() {
  return (
    <div className="revenue-card">

      <div className="revenue-header">
        <div>
          <h3>Revenue vs Expenses</h3>
          <p>Monthly Financial Overview</p>
        </div>

        <select>
          <option>2026</option>
          <option>2025</option>
          <option>2024</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="revenue"
            fill="#2563eb"
            radius={[6, 6, 0, 0]}
            name="Revenue"
          />

          <Bar
            dataKey="expenses"
            fill="#ef4444"
            radius={[6, 6, 0, 0]}
            name="Expenses"
          />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}
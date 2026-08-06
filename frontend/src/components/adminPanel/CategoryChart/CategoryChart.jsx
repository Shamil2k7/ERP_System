"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import "./CategoryChart.css";

const data = [
  { name: "Electronics", value: 35 },
  { name: "Fashion", value: 25 },
  { name: "Grocery", value: 18 },
  { name: "Furniture", value: 12 },
  { name: "Accessories", value: 10 },
];

const COLORS = [
  "#2563eb",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
];

export default function CategoryChart() {
  return (
    <div className="category-card">
      <div className="category-header">
        <h3>Sales by Category</h3>
        <span>This Month</span>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={4}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
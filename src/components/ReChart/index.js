import classes from "./ReChart.module.css";
import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

export default function ReChart() {
  const data = [
    { name: "Group A", value: 500 },
    { name: "Group B", value: 150 },
    { name: "Group C", value: 200 },
    { name: "Group D", value: 80 },
    { name: "Group E", value: 70 },
  ];
  const COLORS = ["#FF7555", "#FFE934", "#FF92E7", "#AA16A3", "#FFDB80"];
  return (
    <>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart width="100%" height={320}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="75%"
            outerRadius="100%"
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}

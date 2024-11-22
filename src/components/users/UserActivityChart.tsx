"use client";

import { AreaChart } from "@tremor/react";

const chartdata = [
  {
    date: "Jan 23",
    "Order Value": 167,
  },
  {
    date: "Feb 23",
    "Order Value": 125,
  },
  // Add more data points...
];

export default function UserActivityChart({ userId }: { userId: string }) {
  return (
    <AreaChart
      className="h-72 mt-4"
      data={chartdata}
      index="date"
      categories={["Order Value"]}
      colors={["blue"]}
      yAxisWidth={60}
    />
  );
}
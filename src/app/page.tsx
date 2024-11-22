import { Card } from "@tremor/react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Total Users
          </h3>
          <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
            1,234
          </p>
        </Card>
        <Card>
          <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Active Subscriptions
          </h3>
          <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
            789
          </p>
        </Card>
        <Card>
          <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Monthly Revenue
          </h3>
          <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
            $12,345
          </p>
        </Card>
      </div>
    </div>
  );
}
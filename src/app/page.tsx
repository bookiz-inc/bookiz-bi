import { Card } from "@tremor/react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">1,234</p>
          <div className="mt-4 h-1 w-full bg-primary-100 rounded-full overflow-hidden">
            <div className="h-1 bg-primary-600 w-3/4 rounded-full"></div>
          </div>
        </Card>
        
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-sm font-medium text-gray-500">Active Subscriptions</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">789</p>
          <div className="mt-4 h-1 w-full bg-primary-100 rounded-full overflow-hidden">
            <div className="h-1 bg-primary-600 w-1/2 rounded-full"></div>
          </div>
        </Card>
        
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-sm font-medium text-gray-500">Monthly Revenue</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">$12,345</p>
          <div className="mt-4 h-1 w-full bg-primary-100 rounded-full overflow-hidden">
            <div className="h-1 bg-primary-600 w-2/3 rounded-full"></div>
          </div>
        </Card>
      </div>

      {/* Add more dashboard content here */}
    </div>
  );
}
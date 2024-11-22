import { Card } from "@tremor/react";
import { fetchDashboardData } from "@/services/api";
import { Calendar, Users, Briefcase, UserPlus } from "lucide-react";

// Make the page async
export default async function DashboardPage() {
  const data = await fetchDashboardData();

  const stats = [
    {
      name: "Total Appointments",
      value: data.appointments,
      icon: Calendar,
      change: data.appointments_in_24h,
      changeLabel: "Last 24h",
      color: "blue",
    },
    {
      name: "Total Users",
      value: data.users,
      icon: Users,
      change: null,
      color: "green",
    },
    {
      name: "Active Services",
      value: data.services,
      icon: Briefcase,
      change: null,
      color: "purple",
    },
    {
      name: "Total Customers",
      value: data.customers,
      icon: UserPlus,
      change: null,
      color: "indigo",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg bg-${stat.color}-50`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stat.value.toLocaleString()}
              </p>
              {stat.change !== null && (
                <div className="flex items-center mt-2">
                  <span className="text-sm text-gray-500">{stat.changeLabel}: </span>
                  <span className="ml-2 text-sm font-medium text-green-600">
                    +{stat.change.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Additional Stats */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card className="bg-white shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Upcoming Appointments</h3>
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Next 24 hours</span>
              <span className="text-2xl font-bold text-gray-900">
                {data.appointments_in_24h.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-600">Next 7 days</span>
              <span className="text-2xl font-bold text-gray-900">
                {data.appointments_in_7d.toLocaleString()}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
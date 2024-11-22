import { Card } from "@tremor/react";

export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-48 bg-gray-200 rounded"></div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-white">
            <div className="h-6 w-6 bg-gray-200 rounded"></div>
            <div className="mt-4 space-y-3">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-8 w-32 bg-gray-200 rounded"></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
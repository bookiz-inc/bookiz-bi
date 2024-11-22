"use client";

const transactions = [
  {
    id: 1,
    date: "2024-02-20",
    amount: 125.00,
    status: "completed",
    items: ["Product A", "Product B"]
  },
  // Add more transactions...
];

export default function UserTransactions({ userId }: { userId: string }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Items
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {transaction.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${transaction.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                  transaction.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {transaction.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {transaction.items.join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
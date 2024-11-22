"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Mail, Phone, ExternalLink } from "lucide-react";

// Mock data - replace with actual API call
const MOCK_USERS = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    status: "active",
    role: "user",
    lastLogin: "2024-02-20",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1987654321",
    status: "active",
    role: "admin",
    lastLogin: "2024-02-19",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "+1122334455",
    status: "inactive",
    role: "user",
    lastLogin: "2024-02-15",
  },
  // Add more mock users as needed
];

interface UsersTableProps {
  searchQuery: string;
}

export default function UsersTable({ searchQuery }: UsersTableProps) {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const router = useRouter();

  const filteredUsers = MOCK_USERS.filter((user) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.phone.includes(searchQuery)
    );
  });

  const handleRowClick = (userId: number) => {
    router.push(`/users/${userId}`);
  };

  const handleActionClick = (e: React.MouseEvent, userId: number) => {
    e.stopPropagation(); // Prevent row click when clicking action button
    setSelectedUser(selectedUser === userId ? null : userId);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Login
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr 
                key={user.id} 
                onClick={() => handleRowClick(user.id)}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-200" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="flex items-center text-sm text-gray-500">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View Profile
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <Mail className="mr-2 h-4 w-4" />
                      {user.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="mr-2 h-4 w-4" />
                      {user.phone}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                    user.role === 'admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.lastLogin}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="relative">
                    <button 
                      onClick={(e) => handleActionClick(e, user.id)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                    {selectedUser === user.id && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1" role="menu">
                          <button
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle edit action
                            }}
                          >
                            Edit User
                          </button>
                          <button
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRowClick(user.id);
                            }}
                          >
                            View Details
                          </button>
                          <button
                            className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 text-left"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle deactivate action
                            }}
                          >
                            {user.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredUsers.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No users found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
}
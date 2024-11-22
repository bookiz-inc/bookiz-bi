"use client";

export default function UserFilters() {
  return (
    <div className="flex gap-2">
      <select 
        className="rounded-md border border-gray-200 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="">Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <select 
        className="rounded-md border border-gray-200 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="">Role</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
}
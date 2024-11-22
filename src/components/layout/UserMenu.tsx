"use client";

import { LogOut, Settings, User } from "lucide-react";
import { useState } from "react";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center gap-2"
      >
        <div className="h-8 w-8 rounded-full bg-gray-200" />
        <span className="hidden sm:inline-block text-sm font-medium text-gray-700">
          John Doe
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
          <button
            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => {/* Handle profile click */}}
          >
            <User className="mr-3 h-4 w-4" />
            Profile
          </button>
          <button
            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => {/* Handle settings click */}}
          >
            <Settings className="mr-3 h-4 w-4" />
            Settings
          </button>
          <button
            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => {/* Handle logout click */}}
          >
            <LogOut className="mr-3 h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
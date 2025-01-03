"use client";

import { Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for landing pages
const mockLandingPages = [
  {
    id: 1,
    name: "דף הבית הראשי",
    url: "https://www.bookiz.co.il/",
    status: "Active",
    description: "דף הבית הראשי שלנו",
  },
  {
    id: 2,
    name: "דף נחיתה לנייליסטיות - משפיעניות",
    url: "https://www.bookiz.co.il/nails",
    status: "Active",
    description: "דף נחיתה לנייליסטיות - משפיעניות",
  },
  {
    id: 3,
    name: "דף נחיתה למשפיעניות בתחום הביוטי",
    url: "https://www.bookiz.co.il/beauty",
    status: "Active",
    description: "דף נחיתה למשפיעניות בתחום הביוטי",
  },

];

export default function LandingPages() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Landing Pages</h1>
        <p className="mt-2 text-gray-600">Manage and monitor your marketing landing pages</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockLandingPages.map((page) => (
          <div
            key={page.id}
            className="relative group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{page.name}</h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{page.description}</p>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  page.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {page.status}
              </span>
            </div>

            <div className="mt-4 text-sm text-gray-500 break-all">{page.url}</div>

            <div className="mt-4 flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => copyToClipboard(page.url)}
              >
                <Copy className="h-4 w-4" />
                Copy URL
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => window.open(page.url, "_blank")}
              >
                <ExternalLink className="h-4 w-4" />
                Visit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
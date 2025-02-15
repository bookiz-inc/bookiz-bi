import { Metadata } from "next";
import SystemUpdatesContent from "@/components/cms/system-updates/SystemUpdatesContent";

export const metadata: Metadata = {
  title: "System Updates Management",
  description: "Manage system-wide updates and announcements",
};

export default function SystemUpdatesPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">System Updates</h1>
        <p className="text-muted-foreground">
          Manage system-wide updates and announcements
        </p>
      </div>
      <SystemUpdatesContent />
    </div>
  );
} 
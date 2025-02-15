"use client";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SystemUpdatesTable from "./SystemUpdatesTable";
import CreateUpdateDialog from "./CreateUpdateDialog";
import { useToast } from "@/components/ui/use-toast";

export default function SystemUpdatesContent() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedUpdates, setSelectedUpdates] = useState<number[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { toast } = useToast();

  const refreshData = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  const handleBulkDelete = async () => {
    try {
      const response = await fetch(`${process.env.BASE_URL}/api/v1/notifications/updates/bulk-delete/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Frontend-Token": "0suV43CiTkrrzk3Q",
        },
        body: JSON.stringify({ ids: selectedUpdates }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete updates");
      }

      toast({
        title: "Success",
        description: "Selected updates have been deleted",
      });

      setSelectedUpdates([]);
      refreshData();
    } catch (error) {
      console.error("Error deleting updates:", error);
      toast({
        title: "Error",
        description: "Failed to delete updates",
        variant: "destructive",
      });
    }
  };

  const handleBulkToggleActive = async (isActive: boolean) => {
    try {
      const response = await fetch(`${process.env.BASE_URL}/api/v1/notifications/updates/bulk-toggle-active/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Frontend-Token": "0suV43CiTkrrzk3Q",
        },
        body: JSON.stringify({ ids: selectedUpdates, is_active: isActive }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      toast({
        title: "Success",
        description: `Selected updates have been ${isActive ? 'activated' : 'deactivated'}`,
      });

      setSelectedUpdates([]);
      refreshData();
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {selectedUpdates.length > 0 && (
            <>
              <Button
                variant="destructive"
                onClick={handleBulkDelete}
              >
                Delete Selected
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleBulkToggleActive(true)}
              >
                Activate Selected
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleBulkToggleActive(false)}
              >
                Deactivate Selected
              </Button>
            </>
          )}
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Update
        </Button>
      </div>

      <SystemUpdatesTable
        selectedUpdates={selectedUpdates}
        setSelectedUpdates={setSelectedUpdates}
        refreshTrigger={refreshTrigger}
        onRefresh={refreshData}
      />

      <CreateUpdateDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={() => {
          setIsCreateDialogOpen(false);
          refreshData();
          toast({
            title: "Success",
            description: "New update has been created",
          });
        }}
      />
    </div>
  );
}

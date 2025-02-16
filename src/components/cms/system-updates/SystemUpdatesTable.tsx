import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SystemUpdate, UPDATE_CATEGORIES } from "@/types/systemUpdate";
import { format } from "date-fns";
import { MoreHorizontal, Pencil, Trash, Sparkles, Link as LinkIcon, Video as VideoIcon, Image as ImageIcon, Moon, Sun } from "lucide-react";
import EditUpdateDialog from "./EditUpdateDialog";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SystemUpdatesTableProps {
  selectedUpdates: number[];
  setSelectedUpdates: (ids: number[]) => void;
  refreshTrigger: number;
  onRefresh: () => void;
}

export default function SystemUpdatesTable({
  selectedUpdates,
  setSelectedUpdates,
  refreshTrigger,
  onRefresh,
}: SystemUpdatesTableProps) {
  const [updates, setUpdates] = useState<SystemUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [editingUpdate, setEditingUpdate] = useState<SystemUpdate | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { toast } = useToast();

  const fetchUpdates = async () => {
    try {
      setLoading(true);
      let url = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000'}/api/v1/notifications/updates/?page=${page}`;

      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }
      if (categoryFilter && categoryFilter !== "all") {
        url += `&category=${categoryFilter}`;
      }
      if (dateRange?.from) {
        url += `&from_date=${format(dateRange.from, "yyyy-MM-dd")}`;
      }
      if (dateRange?.to) {
        url += `&to_date=${format(dateRange.to, "yyyy-MM-dd")}`;
      }

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "X-Frontend-Token": "0suV43CiTkrrzk3Q",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch updates");
      }

      const data = await response.json();
      setUpdates(data.results);
      setTotalPages(Math.ceil(data.count / 10));
    } catch (error) {
      console.error("Error fetching updates:", error);
      toast({
        title: "Error",
        description: "Failed to fetch updates",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, [page, searchQuery, categoryFilter, dateRange, refreshTrigger]);

  const handleToggleActive = async (id: number, isActive: boolean) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000'}/api/v1/notifications/updates/${id}/toggle-active/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Frontend-Token": "0suV43CiTkrrzk3Q",
          },
          body: JSON.stringify({ is_active: isActive }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to toggle status");
      }

      toast({
        title: "Success",
        description: `Update has been ${isActive ? 'activated' : 'deactivated'}`,
      });

      onRefresh();
    } catch (error) {
      console.error("Error toggling status:", error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000'}/api/v1/notifications/updates/${id}/delete/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-Frontend-Token": "0suV43CiTkrrzk3Q",
          }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete update");
      }

      toast({
        title: "Success",
        description: "Update has been deleted",
      });

      onRefresh();
    } catch (error) {
      console.error("Error deleting update:", error);
      toast({
        title: "Error",
        description: "Failed to delete update",
        variant: "destructive",
      });
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUpdates(updates.map((update) => update.id));
    } else {
      setSelectedUpdates([]);
    }
  };

  const handleSelectOne = (checked: boolean, id: number) => {
    if (checked) {
      setSelectedUpdates([...selectedUpdates, id]);
    } else {
      setSelectedUpdates(selectedUpdates.filter((selectedId) => selectedId !== id));
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "URGENT":
        return "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-900/50 dark:text-red-200 dark:ring-red-500/30";
      case "FEATURE":
        return "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-900/50 dark:text-blue-200 dark:ring-blue-500/30";
      case "BUG":
        return "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-900/50 dark:text-amber-200 dark:ring-amber-500/30";
      case "MAINTENANCE":
        return "bg-purple-50 text-purple-700 ring-purple-600/20 dark:bg-purple-900/50 dark:text-purple-200 dark:ring-purple-500/30";
      default:
        return "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/50 dark:text-green-200 dark:ring-green-500/30";
    }
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive
      ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-900/50 dark:text-emerald-200 dark:ring-emerald-500/30"
      : "bg-zinc-50 text-zinc-700 ring-zinc-600/20 dark:bg-zinc-900/50 dark:text-zinc-200 dark:ring-zinc-500/30";
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <Input
          placeholder="Search updates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:max-w-xs"
        />
        <div className="flex flex-1 gap-4 overflow-x-auto pb-2 sm:pb-0">
          <Select
            value={categoryFilter || "all"}
            onValueChange={setCategoryFilter}
          >
            <SelectTrigger className="w-[180px] min-w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {UPDATE_CATEGORIES.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DatePickerWithRange
            value={dateRange}
            onChange={setDateRange}
          />
        </div>
      </div>

      <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
        <div className="relative">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedUpdates.length === updates.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="min-w-[300px]">Title & Content</TableHead>
                <TableHead className="min-w-[120px]">Category</TableHead>
                <TableHead className="min-w-[100px]">Status</TableHead>
                <TableHead className="min-w-[80px]">Priority</TableHead>
                <TableHead className="min-w-[150px]">Valid From</TableHead>
                <TableHead className="min-w-[150px]">Valid Until</TableHead>
                <TableHead className="min-w-[150px]">Created At</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    <div className="flex items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : updates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-2">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      <p>No updates found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                updates.map((update) => (
                  <TableRow 
                    key={update.id} 
                    className="group hover:bg-muted/50 cursor-pointer"
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      if (
                        target.closest('button') ||
                        target.closest('[role="checkbox"]')
                      ) {
                        return;
                      }
                      setEditingUpdate(update);
                    }}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedUpdates.includes(update.id)}
                        onCheckedChange={(checked) =>
                          handleSelectOne(checked as boolean, update.id)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium leading-none">{update.title}</p>
                          {update.related_url && (
                            <a
                              href={update.related_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <LinkIcon className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                        {update.description && (
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {update.description}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {update.content}
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {update.video && (
                            <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                              <VideoIcon className="h-3 w-3 inline-block mr-1" />
                              Video
                            </div>
                          )}
                          {[update.image1, update.image2, update.image3].filter(Boolean).length > 0 && (
                            <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                              <ImageIcon className="h-3 w-3 inline-block mr-1" />
                              {[update.image1, update.image2, update.image3].filter(Boolean).length} Images
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset",
                        getCategoryColor(update.category)
                      )}>
                        {update.category_display}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset",
                        getStatusColor(update.is_active)
                      )}>
                        {update.is_active ? "Active" : "Inactive"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                        {update.priority}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {format(new Date(update.valid_from), "PPP")}
                    </TableCell>
                    <TableCell className="font-medium">
                      {update.valid_until ? format(new Date(update.valid_until), "PPP") : "-"}
                    </TableCell>
                    <TableCell className="font-medium">
                      {format(new Date(update.created_at), "PPP")}
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                          <DropdownMenuItem
                            onClick={() => setEditingUpdate(update)}
                            className="cursor-pointer"
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleToggleActive(update.id, !update.is_active)
                            }
                            className="cursor-pointer"
                          >
                            {update.is_active ? (
                              <>
                                <Moon className="mr-2 h-4 w-4" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <Sun className="mr-2 h-4 w-4" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive cursor-pointer focus:text-destructive"
                            onClick={() => handleDelete(update.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        <Button
          variant="outline"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="min-w-[100px]"
        >
          Previous
        </Button>
        <div className="flex items-center gap-1 text-sm font-medium">
          Page {page} of {totalPages}
        </div>
        <Button
          variant="outline"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="min-w-[100px]"
        >
          Next
        </Button>
      </div>

      {editingUpdate && (
        <EditUpdateDialog
          update={editingUpdate}
          open={!!editingUpdate}
          onOpenChange={(open) => !open && setEditingUpdate(null)}
          onSuccess={() => {
            setEditingUpdate(null);
            onRefresh();
            toast({
              title: "Success",
              description: "Update has been modified",
            });
          }}
        />
      )}
    </div>
  );
}

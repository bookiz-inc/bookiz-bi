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
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import EditUpdateDialog from "./EditUpdateDialog";
import { Badge } from "@/components/ui/badge";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { useToast } from "@/components/ui/use-toast";

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
      let url = `${process.env.BASE_URL}/api/v1/notifications/updates/?page=${page}`;

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

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch updates");
      }

      const data = await response.json();
      setUpdates(data.results);
      setTotalPages(Math.ceil(data.count / 10));
    } catch (error) {
      console.error("Error fetching updates:", error);
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
        `${process.env.BASE_URL}/api/v1/notifications/updates/${id}/toggle-active/`,
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
        `${process.env.BASE_URL}/api/v1/notifications/updates/${id}/delete/`,
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
        return "destructive";
      case "FEATURE":
        return "default";
      case "BUG":
        return "secondary";
      case "MAINTENANCE":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Search updates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Select
          value={categoryFilter || "all"}
          onValueChange={setCategoryFilter}
        >
          <SelectTrigger className="w-[180px]">
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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedUpdates.length === updates.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Valid From</TableHead>
              <TableHead>Valid Until</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4">
                  Loading...
                </TableCell>
              </TableRow>
            ) : updates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4">
                  No updates found
                </TableCell>
              </TableRow>
            ) : (
              updates.map((update) => (
                <TableRow key={update.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedUpdates.includes(update.id)}
                      onCheckedChange={(checked) =>
                        handleSelectOne(checked as boolean, update.id)
                      }
                    />
                  </TableCell>
                  <TableCell>{update.title}</TableCell>
                  <TableCell>
                    <Badge variant={getCategoryColor(update.category)}>
                      {update.category_display}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={update.is_active ? "default" : "secondary"}>
                      {update.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>{update.priority}</TableCell>
                  <TableCell>
                    {format(new Date(update.valid_from), "PPP")}
                  </TableCell>
                  <TableCell>
                    {update.valid_until
                      ? format(new Date(update.valid_until), "PPP")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {format(new Date(update.created_at), "PPP")}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => setEditingUpdate(update)}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleToggleActive(update.id, !update.is_active)
                          }
                        >
                          {update.is_active ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
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

      <div className="flex justify-center gap-2 mt-4">
        <Button
          variant="outline"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
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

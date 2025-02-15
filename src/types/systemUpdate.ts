export type UpdateCategory = "BUG" | "FEATURE" | "URGENT" | "MAINTENANCE" | "GENERAL";

export interface SystemUpdate {
  id: number;
  title: string;
  content: string;
  category: UpdateCategory;
  category_display: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  valid_from: string;
  valid_until?: string;
  priority: number;
}

export interface SystemUpdateResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SystemUpdate[];
}

export interface CreateUpdateInput {
  title: string;
  content: string;
  category: UpdateCategory;
  is_active: boolean;
  valid_from: string;
  valid_until?: string;
  priority: number;
}

export const UPDATE_CATEGORIES: { value: UpdateCategory; label: string }[] = [
  { value: "BUG", label: "Bug Fix" },
  { value: "FEATURE", label: "New Feature" },
  { value: "URGENT", label: "Urgent Update" },
  { value: "MAINTENANCE", label: "Maintenance" },
  { value: "GENERAL", label: "General Update" },
]; 
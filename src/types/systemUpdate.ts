export type UpdateCategory = "BUG" | "FEATURE" | "URGENT" | "MAINTENANCE" | "GENERAL";

export interface SystemUpdate {
  id: number;
  title: string;
  slug: string;
  content: string;
  description?: string;
  category: UpdateCategory;
  category_display: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  valid_from: string;
  valid_until?: string;
  priority: number;
  video?: string;
  image1?: string;
  image2?: string;
  image3?: string;
  related_url?: string;
}

export interface SystemUpdateResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SystemUpdate[];
}

export interface CreateUpdateInput {
  title: string;
  slug: string;
  content: string;
  description?: string;
  category: UpdateCategory;
  is_active: boolean;
  valid_from: string;
  valid_until?: string;
  priority: number;
  video?: File;
  image1?: File;
  image2?: File;
  image3?: File;
  related_url?: string;
}

export const UPDATE_CATEGORIES: { value: UpdateCategory; label: string }[] = [
  { value: "BUG", label: "Bug Fix" },
  { value: "FEATURE", label: "New Feature" },
  { value: "URGENT", label: "Urgent Update" },
  { value: "MAINTENANCE", label: "Maintenance" },
  { value: "GENERAL", label: "General Update" },
];

export const MEDIA_CONSTRAINTS = {
  VIDEO: {
    maxSize: 100 * 1024 * 1024, // 100MB
    formats: [".mp4", ".mov", ".avi"],
  },
  IMAGE: {
    maxSize: 5 * 1024 * 1024, // 5MB
    formats: [".jpg", ".jpeg", ".png", ".gif"],
  },
}; 
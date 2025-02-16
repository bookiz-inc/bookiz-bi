import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { CreateUpdateInput, UPDATE_CATEGORIES, UpdateCategory, MEDIA_CONSTRAINTS } from "@/types/systemUpdate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { X, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const MAX_FILE_SIZE = {
  video: MEDIA_CONSTRAINTS.VIDEO.maxSize,
  image: MEDIA_CONSTRAINTS.IMAGE.maxSize,
};

const ACCEPTED_VIDEO_TYPES = MEDIA_CONSTRAINTS.VIDEO.formats;
const ACCEPTED_IMAGE_TYPES = MEDIA_CONSTRAINTS.IMAGE.formats;

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  slug: z.string()
    .min(1, "Slug is required")
    .max(50, "Slug is too long")
    .regex(slugRegex, "Slug must contain only lowercase letters, numbers, and hyphens"),
  content: z.string().min(1, "Content is required"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  is_active: z.boolean(),
  valid_from: z.date(),
  valid_until: z.date().optional().nullable(),
  priority: z.number().min(1).max(100),
  video: z.any().optional(),
  image1: z.any().optional(),
  image2: z.any().optional(),
  image3: z.any().optional(),
  related_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

interface CreateUpdateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

type MediaPreview = {
  video?: string;
  image1?: string;
  image2?: string;
  image3?: string;
};

type MediaFieldName = keyof Pick<MediaPreview, "video" | "image1" | "image2" | "image3">;

export default function CreateUpdateDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateUpdateDialogProps) {
  const [loading, setLoading] = useState(false);
  const [mediaPreview, setMediaPreview] = useState<MediaPreview>({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      description: "",
      category: "GENERAL" as UpdateCategory,
      is_active: true,
      valid_from: new Date(),
      valid_until: null,
      priority: 1,
      related_url: "",
    },
  });

  const validateFile = (file: File, type: "video" | "image") => {
    if (file.size > MAX_FILE_SIZE[type]) {
      return `File size must be less than ${MAX_FILE_SIZE[type] / (1024 * 1024)}MB`;
    }
    
    const extension = "." + file.name.split(".").pop()?.toLowerCase();
    const allowedTypes = type === "video" ? ACCEPTED_VIDEO_TYPES : ACCEPTED_IMAGE_TYPES;
    
    if (!allowedTypes.includes(extension)) {
      return `File must be one of: ${allowedTypes.join(", ")}`;
    }
    
    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: any, type: "video" | "image") => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateFile(file, type);
    if (error) {
      form.setError(field.name, { message: error });
      return;
    }

    field.onChange(file);
    const previewUrl = URL.createObjectURL(file);
    setMediaPreview(prev => ({ ...prev, [field.name]: previewUrl }));
  };

  const clearFile = (fieldName: MediaFieldName) => {
    form.setValue(fieldName, undefined);
    setMediaPreview(prev => {
      const newPreview = { ...prev };
      delete newPreview[fieldName];
      return newPreview;
    });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value instanceof Date) {
          formData.append(key, format(value, "yyyy-MM-dd'T'HH:mm:ss'Z'"));
        } else if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== undefined && value !== null && value !== "") {
          formData.append(key, String(value));
        }
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000'}/api/v1/notifications/updates/create/`,
        {
          method: "POST",
          headers: {
            "X-Frontend-Token": "0suV43CiTkrrzk3Q",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create update");
      }

      form.reset();
      setMediaPreview({});
      onSuccess?.();
      toast({
        title: "Success",
        description: "Update has been created successfully",
      });
    } catch (error) {
      console.error("Error creating update:", error);
      toast({
        title: "Error",
        description: "Failed to create update",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
          <DialogHeader className="p-6">
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Sparkles className="h-5 w-5 text-primary" />
              Create New Update
            </DialogTitle>
          </DialogHeader>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 pt-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Main Information */}
              <div className="space-y-6">
                <div className="p-4 rounded-lg border bg-muted/50">
                  <h3 className="font-semibold mb-4 text-primary">Basic Information</h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter title" 
                              {...field}
                              className="bg-background"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Slug</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="enter-slug-here" 
                              {...field}
                              onChange={(e) => {
                                const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-");
                                field.onChange(value);
                              }}
                              className="bg-background font-mono text-sm"
                            />
                          </FormControl>
                          <FormDescription>
                            URL-friendly version of the title
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-background">
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {UPDATE_CATEGORIES.map((category) => (
                                  <SelectItem key={category.value} value={category.value}>
                                    {category.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Priority</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={1}
                                max={100}
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                                className="bg-background"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border bg-muted/50">
                  <h3 className="font-semibold mb-4 text-primary">Content</h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Short Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter a brief description"
                              className="resize-none bg-background h-20"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Detailed Content</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter detailed content"
                              className="resize-none bg-background h-40"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Media and Settings */}
              <div className="space-y-6">
                <div className="p-4 rounded-lg border bg-muted/50">
                  <h3 className="font-semibold mb-4 text-primary">Scheduling</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="valid_from"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Valid From</FormLabel>
                            <DateTimePicker
                              date={field.value}
                              setDate={field.onChange}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="valid_until"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Valid Until</FormLabel>
                            <DateTimePicker
                              date={field.value || undefined}
                              setDate={field.onChange}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="is_active"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg bg-background p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Active Status</FormLabel>
                            <div className="text-sm text-muted-foreground">
                              Set whether this update is active
                            </div>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-lg border bg-muted/50">
                  <h3 className="font-semibold mb-4 text-primary">Media</h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="video"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Video</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-4">
                              <div className="relative flex-1">
                                <Input
                                  type="file"
                                  accept={ACCEPTED_VIDEO_TYPES.join(",")}
                                  onChange={(e) => handleFileChange(e, field, "video")}
                                  className={cn(
                                    "bg-background",
                                    "file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0",
                                    "file:text-sm file:font-semibold file:bg-primary",
                                    "file:text-primary-foreground hover:file:bg-primary/90"
                                  )}
                                />
                              </div>
                              {mediaPreview.video && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => clearFile("video")}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </FormControl>
                          <FormDescription>
                            Max size: 100MB. Supported formats: MP4, MOV, AVI
                          </FormDescription>
                          <FormMessage />
                          {mediaPreview.video && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-2"
                            >
                              <video
                                src={mediaPreview.video}
                                controls
                                className="w-full rounded-lg border bg-background"
                              />
                            </motion.div>
                          )}
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-3 gap-4">
                      {(['image1', 'image2', 'image3'] as const).map((fieldName, index) => (
                        <FormField
                          key={fieldName}
                          control={form.control}
                          name={fieldName}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Image {index + 1}</FormLabel>
                              <FormControl>
                                <div className="space-y-2">
                                  <div className="relative">
                                    <Input
                                      type="file"
                                      accept={ACCEPTED_IMAGE_TYPES.join(",")}
                                      onChange={(e) => handleFileChange(e, field, "image")}
                                      className={cn(
                                        "bg-background",
                                        "file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0",
                                        "file:text-sm file:font-semibold file:bg-primary",
                                        "file:text-primary-foreground hover:file:bg-primary/90"
                                      )}
                                    />
                                    {mediaPreview[fieldName] && (
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-2 top-1/2 -translate-y-1/2"
                                        onClick={() => clearFile(fieldName)}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    )}
                                  </div>
                                  {mediaPreview[fieldName] && (
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.95 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                    >
                                      <img
                                        src={mediaPreview[fieldName]}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full aspect-video rounded-lg border object-cover bg-background"
                                      />
                                    </motion.div>
                                  )}
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border bg-muted/50">
                  <h3 className="font-semibold mb-4 text-primary">Additional Information</h3>
                  <FormField
                    control={form.control}
                    name="related_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Related URL</FormLabel>
                        <FormControl>
                          <Input 
                            type="url"
                            placeholder="https://example.com"
                            {...field}
                            className="bg-background"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 mt-6 -mx-6 -mb-6 px-6 py-4 bg-background/80 backdrop-blur-sm border-t flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="min-w-[100px]">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-r-transparent" />
                    <span>Creating...</span>
                  </div>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Create Update
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

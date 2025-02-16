import { useEffect, useState } from "react";
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
import { SystemUpdate, UPDATE_CATEGORIES, UpdateCategory, MEDIA_CONSTRAINTS } from "@/types/systemUpdate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format, parseISO } from "date-fns";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { X, Upload, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
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

interface EditUpdateDialogProps {
  update: SystemUpdate;
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

export default function EditUpdateDialog({
  update,
  open,
  onOpenChange,
  onSuccess,
}: EditUpdateDialogProps) {
  const [loading, setLoading] = useState(false);
  const [mediaPreview, setMediaPreview] = useState<MediaPreview>({
    video: update.video,
    image1: update.image1,
    image2: update.image2,
    image3: update.image3,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: update.title,
      slug: update.slug,
      content: update.content,
      description: update.description || "",
      category: update.category,
      is_active: update.is_active,
      valid_from: parseISO(update.valid_from),
      valid_until: update.valid_until ? parseISO(update.valid_until) : null,
      priority: update.priority,
      related_url: update.related_url || "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        title: update.title,
        slug: update.slug,
        content: update.content,
        description: update.description || "",
        category: update.category,
        is_active: update.is_active,
        valid_from: parseISO(update.valid_from),
        valid_until: update.valid_until ? parseISO(update.valid_until) : null,
        priority: update.priority,
        related_url: update.related_url || "",
      });
      setMediaPreview({
        video: update.video,
        image1: update.image1,
        image2: update.image2,
        image3: update.image3,
      });
    }
  }, [open, update, form]);

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
        `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000'}/api/v1/notifications/updates/${update.id}/update/`,
        {
          method: "PUT",
          headers: {
            "X-Frontend-Token": "0suV43CiTkrrzk3Q",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update");
      }

      toast({
        title: "Success",
        description: "Update has been modified successfully",
      });
      onSuccess?.();
    } catch (error) {
      console.error("Error updating:", error);
      toast({
        title: "Error",
        description: "Failed to update",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0 rounded-2xl border-0 shadow-2xl">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-xl border-b">
          <DialogHeader className="p-8">
            <DialogTitle className="flex items-center gap-3 text-3xl font-medium tracking-tight">
              <div className="h-8 w-8 rounded-xl bg-[#A71FFC]/10 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-[#A71FFC]" />
              </div>
              Edit Update
            </DialogTitle>
          </DialogHeader>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Main Information */}
              <div className="space-y-8">
                <div className="p-6 rounded-2xl border border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50/80 transition-colors">
                  <h3 className="font-medium text-lg mb-6 text-[#A71FFC]">Basic Information</h3>
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Title</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter title" 
                              {...field}
                              className="h-12 px-4 bg-white/80 hover:bg-white transition-colors rounded-xl border-zinc-200 focus-visible:ring-[#A71FFC]"
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
                          <FormLabel className="text-sm font-medium">Slug</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="enter-slug-here" 
                              {...field}
                              onChange={(e) => {
                                const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-");
                                field.onChange(value);
                              }}
                              className="h-12 px-4 bg-white/80 hover:bg-white transition-colors rounded-xl border-zinc-200 focus-visible:ring-[#A71FFC] font-mono text-sm"
                            />
                          </FormControl>
                          <FormDescription className="text-xs">
                            URL-friendly version of the title
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Category</FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger className="h-12 px-4 bg-white/80 hover:bg-white transition-colors rounded-xl border-zinc-200 focus-visible:ring-[#A71FFC]">
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
                            <FormLabel className="text-sm font-medium">Priority</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={1}
                                max={100}
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                                className="h-12 px-4 bg-white/80 hover:bg-white transition-colors rounded-xl border-zinc-200 focus-visible:ring-[#A71FFC]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50/80 transition-colors">
                  <h3 className="font-medium text-lg mb-6 text-[#A71FFC]">Content</h3>
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Short Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter a brief description"
                              className="min-h-[100px] px-4 py-3 bg-white/80 hover:bg-white transition-colors rounded-xl border-zinc-200 focus-visible:ring-[#A71FFC] resize-none"
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
                          <FormLabel className="text-sm font-medium">Detailed Content</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter detailed content"
                              className="min-h-[200px] px-4 py-3 bg-white/80 hover:bg-white transition-colors rounded-xl border-zinc-200 focus-visible:ring-[#A71FFC] resize-none"
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
              <div className="space-y-8">
                <div className="p-6 rounded-2xl border border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50/80 transition-colors">
                  <h3 className="font-medium text-lg mb-6 text-[#A71FFC]">Scheduling</h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="valid_from"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-sm font-medium">Valid From</FormLabel>
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
                            <FormLabel className="text-sm font-medium">Valid Until</FormLabel>
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
                        <FormItem className="flex items-center justify-between rounded-xl bg-white/80 hover:bg-white transition-colors p-4 border border-zinc-200">
                          <div className="space-y-1">
                            <FormLabel className="text-sm font-medium">Active Status</FormLabel>
                            <div className="text-sm text-zinc-500">
                              Set whether this update is active
                            </div>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-[#A71FFC]"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50/80 transition-colors">
                  <h3 className="font-medium text-lg text-[#A71FFC]">Media</h3>
                  <div className="space-y-6 mt-4">
                    <FormField
                      control={form.control}
                      name="video"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between mb-1.5">
                            <FormLabel className="text-sm font-medium">Video</FormLabel>
                            <span className="text-xs text-zinc-500">Optional</span>
                          </div>
                          <FormControl>
                            <div className="relative">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => document.getElementById(`video-upload-${field.name}`)?.click()}
                                className="w-full h-10 bg-white hover:bg-zinc-50 transition-colors rounded-lg border border-zinc-200 hover:border-[#A71FFC]/30 focus-visible:ring-[#A71FFC] text-sm text-zinc-500 hover:text-[#A71FFC] flex items-center justify-center gap-2"
                              >
                                <Upload className="h-4 w-4" />
                                {mediaPreview.video ? "Change Video" : "Choose File"}
                              </Button>
                              <Input
                                id={`video-upload-${field.name}`}
                                type="file"
                                accept={ACCEPTED_VIDEO_TYPES.join(",")}
                                onChange={(e) => handleFileChange(e, field, "video")}
                                className="hidden"
                              />
                              {mediaPreview.video && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => clearFile("video")}
                                  className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7 rounded-md hover:bg-zinc-100"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </FormControl>
                          <FormDescription className="mt-1.5 text-xs text-zinc-500">
                            Max size: 100MB. Supported formats: MP4, MOV, AVI
                          </FormDescription>
                          <FormMessage />
                          {mediaPreview.video && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-3"
                            >
                              <video
                                src={mediaPreview.video}
                                controls
                                className="w-full aspect-video rounded-lg border border-zinc-200 bg-white/80"
                              />
                            </motion.div>
                          )}
                        </FormItem>
                      )}
                    />

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-medium">Images</h4>
                        <span className="text-xs text-zinc-500">Up to 3 images</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {(['image1', 'image2', 'image3'] as const).map((fieldName, index) => (
                          <FormField
                            key={fieldName}
                            control={form.control}
                            name={fieldName}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <div className="space-y-2">
                                    <div className="relative">
                                      <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => document.getElementById(`image-upload-${fieldName}`)?.click()}
                                        className="w-full h-10 bg-white hover:bg-zinc-50 transition-colors rounded-lg border border-zinc-200 hover:border-[#A71FFC]/30 focus-visible:ring-[#A71FFC] text-sm text-zinc-500 hover:text-[#A71FFC] flex items-center justify-center gap-2"
                                      >
                                        <Upload className="h-4 w-4" />
                                        {mediaPreview[fieldName] ? `Change ${index + 1}` : "Choose File"}
                                      </Button>
                                      <Input
                                        id={`image-upload-${fieldName}`}
                                        type="file"
                                        accept={ACCEPTED_IMAGE_TYPES.join(",")}
                                        onChange={(e) => handleFileChange(e, field, "image")}
                                        className="hidden"
                                      />
                                      {mediaPreview[fieldName] && (
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => clearFile(fieldName)}
                                          className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7 rounded-md hover:bg-zinc-100"
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
                                        <div className="relative aspect-video rounded-lg border border-zinc-200 bg-white/80 overflow-hidden">
                                          <img
                                            src={mediaPreview[fieldName]}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-full object-cover"
                                          />
                                        </div>
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
                      <FormDescription className="mt-3 text-xs text-zinc-500">
                        Upload screenshots or images (max 5MB each, JPG, PNG, or GIF)
                      </FormDescription>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50/80 transition-colors">
                  <h3 className="font-medium text-lg mb-6 text-[#A71FFC]">Additional Information</h3>
                  <FormField
                    control={form.control}
                    name="related_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Related URL</FormLabel>
                        <FormControl>
                          <Input 
                            type="url"
                            placeholder="https://example.com"
                            {...field}
                            className="h-12 px-4 bg-white/80 hover:bg-white transition-colors rounded-xl border-zinc-200 focus-visible:ring-[#A71FFC]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 mt-8 -mx-8 -mb-8 px-8 py-6 bg-background/95 backdrop-blur-xl border-t flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="h-12 px-6 rounded-xl hover:bg-zinc-100"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={loading} 
                className="h-12 px-6 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white min-w-[140px]"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-200 border-r-transparent" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Save Changes
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

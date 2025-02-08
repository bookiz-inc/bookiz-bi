"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OnboardingStep {
    id: string;
    hours_from_start: number;
    time_display: string;
    wati_template_name: string;
    description: string;
    is_active: boolean;
}

interface OnboardingTemplate {
    id: string;
    name: string;
    description: string;
    is_active: boolean;
    steps: OnboardingStep[];
}

interface EditTemplateModalProps {
    template: OnboardingTemplate;
    open: boolean;
    onClose: () => void;
}

export function EditTemplateModal({ template, open, onClose }: EditTemplateModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: template.name,
        description: template.description,
        is_active: template.is_active,
        steps: template.steps,
    });

    // TODO: Fetch this from the API
    const availableTemplates = [
        { name: "welcome_message", display: "Welcome Message" },
        { name: "quick_tips", display: "Quick Tips" },
        { name: "day_1_followup", display: "Day 1 Follow-up" },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // TODO: Implement API call to update template
            onClose();
        } catch (error) {
            console.error("Failed to update template:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const addStep = () => {
        const newStep: OnboardingStep = {
            id: Math.random().toString(36).substr(2, 9), // Temporary ID
            hours_from_start: 0,
            time_display: "Immediate",
            wati_template_name: "",
            description: "",
            is_active: true,
        };

        setFormData({
            ...formData,
            steps: [...formData.steps, newStep],
        });
    };

    const updateStep = (index: number, updates: Partial<OnboardingStep>) => {
        const newSteps = [...formData.steps];
        newSteps[index] = { ...newSteps[index], ...updates };

        // Update time_display based on hours_from_start
        if ('hours_from_start' in updates) {
            const hours = updates.hours_from_start!;
            newSteps[index].time_display = formatTimeDisplay(hours);
        }

        setFormData({ ...formData, steps: newSteps });
    };

    const removeStep = (index: number) => {
        const newSteps = formData.steps.filter((_, i) => i !== index);
        setFormData({ ...formData, steps: newSteps });
    };

    const formatTimeDisplay = (hours: number): string => {
        if (hours === 0) return "Immediate";
        if (hours < 1) return `${hours * 60} minutes`;
        if (hours === 1) return "1 hour";
        if (hours < 24) return `${hours} hours`;
        if (hours === 24) return "1 day";
        return `${hours / 24} days`;
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[700px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Template</DialogTitle>
                        <DialogDescription>
                            Modify the template details and manage its steps.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="is_active">Active</Label>
                                <Switch
                                    id="is_active"
                                    checked={formData.is_active}
                                    onCheckedChange={(checked) =>
                                        setFormData({ ...formData, is_active: checked })
                                    }
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Steps</Label>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addStep}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Step
                                </Button>
                            </div>

                            <div className="space-y-4">
                                {formData.steps.map((step, index) => (
                                    <div
                                        key={step.id}
                                        className="flex items-start gap-4 p-4 border rounded-lg"
                                    >
                                        <div className="mt-2 cursor-move">
                                            <GripVertical className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <div className="flex-1 grid gap-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="grid gap-2">
                                                    <Label>Time from Start (hours)</Label>
                                                    <Input
                                                        type="number"
                                                        step="0.5"
                                                        min="0"
                                                        value={step.hours_from_start}
                                                        onChange={(e) =>
                                                            updateStep(index, {
                                                                hours_from_start: parseFloat(e.target.value),
                                                            })
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label>WhatsApp Template</Label>
                                                    <Select
                                                        value={step.wati_template_name}
                                                        onValueChange={(value) =>
                                                            updateStep(index, {
                                                                wati_template_name: value,
                                                            })
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a template" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {availableTemplates.map((template) => (
                                                                <SelectItem
                                                                    key={template.name}
                                                                    value={template.name}
                                                                >
                                                                    {template.display}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label>Description</Label>
                                                <Input
                                                    value={step.description}
                                                    onChange={(e) =>
                                                        updateStep(index, {
                                                            description: e.target.value,
                                                        })
                                                    }
                                                    placeholder="Describe this step..."
                                                    required
                                                />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Label>Active</Label>
                                                    <Switch
                                                        checked={step.is_active}
                                                        onCheckedChange={(checked) =>
                                                            updateStep(index, {
                                                                is_active: checked,
                                                            })
                                                        }
                                                    />
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => removeStep(index)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
    Copy,
    MoreVertical,
    Pencil,
    Search,
    Trash2,
    Clock,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditTemplateModal } from "./EditTemplateModal";
import { DeleteTemplateDialog } from "./DeleteTemplateDialog";

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

export function OnboardingTemplatesList() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTemplate, setSelectedTemplate] = useState<OnboardingTemplate | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    // TODO: Replace with actual API call
    const templates: OnboardingTemplate[] = [];

    const filteredTemplates = templates.filter(
        (template) =>
            template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCloneTemplate = async (templateId: string) => {
        // TODO: Implement clone functionality
    };

    const handleToggleActive = async (templateId: string, newState: boolean) => {
        // TODO: Implement toggle active functionality
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                        placeholder="Search templates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredTemplates.map((template) => (
                    <Card key={template.id}>
                        <CardHeader className="flex flex-row items-start justify-between space-y-0">
                            <div className="space-y-1">
                                <CardTitle className="flex items-center gap-2">
                                    {template.name}
                                    <Badge
                                        variant={template.is_active ? "default" : "secondary"}
                                    >
                                        {template.is_active ? "Active" : "Inactive"}
                                    </Badge>
                                </CardTitle>
                                <CardDescription>{template.description}</CardDescription>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                        onClick={() => {
                                            setSelectedTemplate(template);
                                            setIsEditModalOpen(true);
                                        }}
                                    >
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => handleCloneTemplate(template.id)}
                                    >
                                        <Copy className="mr-2 h-4 w-4" />
                                        Clone
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => {
                                            setSelectedTemplate(template);
                                            setIsDeleteDialogOpen(true);
                                        }}
                                        className="text-red-600"
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Status</span>
                                    <Switch
                                        checked={template.is_active}
                                        onCheckedChange={(checked) =>
                                            handleToggleActive(template.id, checked)
                                        }
                                    />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-sm font-medium">Steps</span>
                                    {template.steps.map((step) => (
                                        <div
                                            key={step.id}
                                            className="flex items-center gap-2 text-sm text-gray-600"
                                        >
                                            <Clock className="h-4 w-4" />
                                            <span>
                                                {step.time_display} - {step.description}
                                            </span>
                                            {!step.is_active && (
                                                <Badge variant="secondary" className="ml-auto">
                                                    Inactive
                                                </Badge>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {selectedTemplate && (
                <>
                    <EditTemplateModal
                        template={selectedTemplate}
                        open={isEditModalOpen}
                        onClose={() => {
                            setIsEditModalOpen(false);
                            setSelectedTemplate(null);
                        }}
                    />
                    <DeleteTemplateDialog
                        template={selectedTemplate}
                        open={isDeleteDialogOpen}
                        onClose={() => {
                            setIsDeleteDialogOpen(false);
                            setSelectedTemplate(null);
                        }}
                    />
                </>
            )}
        </div>
    );
} 
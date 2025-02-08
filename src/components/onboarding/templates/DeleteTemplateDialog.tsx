"use client";

import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface OnboardingTemplate {
    id: string;
    name: string;
    description: string;
    is_active: boolean;
    steps: any[];
}

interface DeleteTemplateDialogProps {
    template: OnboardingTemplate;
    open: boolean;
    onClose: () => void;
}

export function DeleteTemplateDialog({
    template,
    open,
    onClose,
}: DeleteTemplateDialogProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);

        try {
            // TODO: Implement API call to delete template
            onClose();
        } catch (error) {
            console.error("Failed to delete template:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Template</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete the template "{template.name}"? This
                        action cannot be undone, and all associated steps will be deleted.
                        {template.is_active && (
                            <p className="mt-2 text-red-600">
                                Warning: This template is currently active and may be in use by
                                some users.
                            </p>
                        )}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        {isDeleting ? "Deleting..." : "Delete Template"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
} 
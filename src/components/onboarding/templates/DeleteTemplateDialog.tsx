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
            </AlertDialogContent>
        </AlertDialog>
    );
}

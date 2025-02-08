"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CheckCircle2, XCircle } from "lucide-react";

interface UserProgress {
    id: string;
    user: {
        id: string;
        email: string;
        phone_number: string;
    };
    template: {
        id: string;
        name: string;
    };
    current_step: {
        id: string;
        hours_from_start: number;
        time_display: string;
        wati_template_name: string;
    } | null;
    status: "IN_PROGRESS" | "COMPLETED" | "STOPPED";
    start_date: string;
    completed_date: string | null;
    completed_steps: Array<{
        id: string;
        step: {
            id: string;
            hours_from_start: number;
            time_display: string;
            wati_template_name: string;
        };
        completed_at: string;
        was_successful: boolean;
    }>;
    next_step: {
        id: string;
        hours_from_start: number;
        time_display: string;
        wati_template_name: string;
    } | null;
    time_in_onboarding: {
        hours: number;
        days: number;
        display: string;
    };
}

interface UserProgressDialogProps {
    progress: UserProgress;
    open: boolean;
    onClose: () => void;
}

export function UserProgressDialog({
    progress,
    open,
    onClose,
}: UserProgressDialogProps) {
    const getStatusBadge = (status: UserProgress["status"]) => {
        switch (status) {
            case "IN_PROGRESS":
                return <Badge>In Progress</Badge>;
            case "COMPLETED":
                return <Badge variant="default">Completed</Badge>;
            case "STOPPED":
                return <Badge variant="destructive">Stopped</Badge>;
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        Onboarding Progress {getStatusBadge(progress.status)}
                    </DialogTitle>
                    <DialogDescription>
                        Detailed progress information for {progress.user.email}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* User Information */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                            User Information
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="text-sm text-gray-500">Email</span>
                                <p className="font-medium">{progress.user.email}</p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">Phone</span>
                                <p className="font-medium">{progress.user.phone_number}</p>
                            </div>
                        </div>
                    </div>

                    {/* Template Information */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                            Template Information
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="text-sm text-gray-500">Template</span>
                                <p className="font-medium">{progress.template.name}</p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">Time in Onboarding</span>
                                <p className="font-medium">{progress.time_in_onboarding.display}</p>
                            </div>
                        </div>
                    </div>

                    {/* Progress Timeline */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-4">
                            Progress Timeline
                        </h3>
                        <div className="space-y-4">
                            {progress.completed_steps.map((completion) => (
                                <div
                                    key={completion.id}
                                    className="flex items-start gap-4 p-3 rounded-lg bg-gray-50"
                                >
                                    {completion.was_successful ? (
                                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                                    ) : (
                                        <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                                    )}
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">
                                                {completion.step.time_display}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {format(
                                                    new Date(completion.completed_at),
                                                    "PPp"
                                                )}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            {completion.step.wati_template_name}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {progress.current_step && (
                                <div className="flex items-start gap-4 p-3 rounded-lg bg-primary-50 border border-primary-200">
                                    <div className="h-5 w-5 rounded-full bg-primary-500 mt-0.5" />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">
                                                {progress.current_step.time_display}
                                            </span>
                                            <Badge variant="outline">Current</Badge>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            {progress.current_step.wati_template_name}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {progress.next_step && (
                                <div className="flex items-start gap-4 p-3 rounded-lg bg-gray-50 opacity-50">
                                    <div className="h-5 w-5 rounded-full border-2 border-gray-300 mt-0.5" />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">
                                                {progress.next_step.time_display}
                                            </span>
                                            <Badge variant="outline">Next</Badge>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            {progress.next_step.wati_template_name}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="text-sm text-gray-500">Start Date</span>
                            <p className="font-medium">
                                {format(new Date(progress.start_date), "PPp")}
                            </p>
                        </div>
                        {progress.completed_date && (
                            <div>
                                <span className="text-sm text-gray-500">Completed Date</span>
                                <p className="font-medium">
                                    {format(new Date(progress.completed_date), "PPp")}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

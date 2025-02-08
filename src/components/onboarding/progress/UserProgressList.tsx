"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Play, Square, RotateCcw } from "lucide-react";
import { format } from "date-fns";
import { UserProgressDialog } from "./UserProgressDialog";

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

interface UserProgressListProps {
    filters: {
        search: string;
        status: string;
        template: string;
        startDateAfter: Date | null;
        startDateBefore: Date | null;
    };
}

export function UserProgressList({ filters }: UserProgressListProps) {
    const [selectedProgress, setSelectedProgress] = useState<UserProgress | null>(null);
    const [isProgressDialogOpen, setIsProgressDialogOpen] = useState(false);

    // TODO: Replace with actual API call
    const progressList: UserProgress[] = [];

    const handleForceNextStep = async (progressId: string) => {
        try {
            // TODO: Implement API call
        } catch (error) {
            console.error("Failed to force next step:", error);
        }
    };

    const handleStop = async (progressId: string) => {
        try {
            // TODO: Implement API call
        } catch (error) {
            console.error("Failed to stop onboarding:", error);
        }
    };

    const handleRestart = async (progressId: string) => {
        try {
            // TODO: Implement API call
        } catch (error) {
            console.error("Failed to restart onboarding:", error);
        }
    };

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
        <>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Template</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Current Step</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>Time in Onboarding</TableHead>
                            <TableHead className="w-[80px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {progressList.map((progress) => (
                            <TableRow key={progress.id}>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium">
                                            {progress.user.email}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {progress.user.phone_number}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>{progress.template.name}</TableCell>
                                <TableCell>{getStatusBadge(progress.status)}</TableCell>
                                <TableCell>
                                    {progress.current_step ? (
                                        <div className="flex flex-col">
                                            <span>
                                                {progress.current_step.time_display}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {progress.current_step.wati_template_name}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-gray-500">-</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {format(new Date(progress.start_date), "PPp")}
                                </TableCell>
                                <TableCell>{progress.time_in_onboarding.display}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setSelectedProgress(progress);
                                                    setIsProgressDialogOpen(true);
                                                }}
                                            >
                                                View Details
                                            </DropdownMenuItem>
                                            {progress.status === "IN_PROGRESS" && (
                                                <>
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleForceNextStep(progress.id)
                                                        }
                                                    >
                                                        <Play className="mr-2 h-4 w-4" />
                                                        Force Next Step
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleStop(progress.id)
                                                        }
                                                        className="text-red-600"
                                                    >
                                                        <Square className="mr-2 h-4 w-4" />
                                                        Stop
                                                    </DropdownMenuItem>
                                                </>
                                            )}
                                            {progress.status === "STOPPED" && (
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleRestart(progress.id)
                                                    }
                                                >
                                                    <RotateCcw className="mr-2 h-4 w-4" />
                                                    Restart
                                                </DropdownMenuItem>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {selectedProgress && (
                <UserProgressDialog
                    progress={selectedProgress}
                    open={isProgressDialogOpen}
                    onClose={() => {
                        setIsProgressDialogOpen(false);
                        setSelectedProgress(null);
                    }}
                />
            )}
        </>
    );
}

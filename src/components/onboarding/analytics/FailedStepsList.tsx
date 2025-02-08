"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

interface FailedStep {
    id: string;
    user: {
        email: string;
        phone_number: string;
    };
    step: {
        hours_from_start: number;
        time_display: string;
        wati_template_name: string;
    };
    completed_at: string;
    error_message: string;
}

export function FailedStepsList() {
    // TODO: Replace with actual API call
    const failedSteps: FailedStep[] = [];

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Step</TableHead>
                        <TableHead>Template</TableHead>
                        <TableHead>Failed At</TableHead>
                        <TableHead>Error</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {failedSteps.map((step) => (
                        <TableRow key={step.id}>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="font-medium">{step.user.email}</span>
                                    <span className="text-sm text-gray-500">
                                        {step.user.phone_number}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span>{step.step.time_display}</span>
                                    <span className="text-sm text-gray-500">
                                        {step.step.hours_from_start} hours from start
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell>{step.step.wati_template_name}</TableCell>
                            <TableCell>
                                {format(new Date(step.completed_at), "PPp")}
                            </TableCell>
                            <TableCell>
                                <span className="text-red-600">{step.error_message}</span>
                            </TableCell>
                        </TableRow>
                    ))}
                    {failedSteps.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-4">
                                No failed steps found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
} 
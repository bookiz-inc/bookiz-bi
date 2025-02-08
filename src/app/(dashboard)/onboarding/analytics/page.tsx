"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FailedStepsList } from "@/components/onboarding/analytics/FailedStepsList";

interface AnalyticsData {
    total_users: number;
    active_users: number;
    completed_users: number;
    stopped_users: number;
    completion_rate: number;
    step_completion_rates: Array<{
        time: string;
        hours_from_start: number;
        description: string;
        total: number;
        successful: number;
        success_rate: number;
    }>;
    average_completion_time: {
        hours: number;
        days: number;
        display: string;
    };
    completion_trend: {
        labels: string[];
        completed: number[];
        stopped: number[];
    };
}

export default function OnboardingAnalyticsPage() {
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    // TODO: Replace with actual API call
    const templates = [
        { id: "1", name: "Default Onboarding" },
        { id: "2", name: "Premium Onboarding" },
    ];

    // TODO: Replace with actual API call
    const analyticsData: AnalyticsData = {
        total_users: 100,
        active_users: 50,
        completed_users: 40,
        stopped_users: 10,
        completion_rate: 80.0,
        step_completion_rates: [
            {
                time: "Immediate",
                hours_from_start: 0,
                description: "Welcome message",
                total: 100,
                successful: 98,
                success_rate: 98.0,
            },
            {
                time: "30 minutes",
                hours_from_start: 0.5,
                description: "Quick tips",
                total: 95,
                successful: 92,
                success_rate: 96.8,
            },
        ],
        average_completion_time: {
            hours: 72.5,
            days: 3.0,
            display: "3 days",
        },
        completion_trend: {
            labels: ["2024-01", "2024-02"],
            completed: [35, 40],
            stopped: [8, 10],
        },
    };

    const trendData = analyticsData.completion_trend.labels.map((label, index) => ({
        name: label,
        completed: analyticsData.completion_trend.completed[index],
        stopped: analyticsData.completion_trend.stopped[index],
    }));

    return (
        <div className="flex flex-col gap-6">
            <PageHeader
                title="Onboarding Analytics"
                description="Track and analyze onboarding performance"
            />

            {/* Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="grid gap-2">
                            <Label>Template</Label>
                            <Select
                                value={selectedTemplate}
                                onValueChange={setSelectedTemplate}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="All templates" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All</SelectItem>
                                    {templates.map((template) => (
                                        <SelectItem key={template.id} value={template.id}>
                                            {template.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label>Start Date</Label>
                            <DatePicker date={startDate} setDate={setStartDate} />
                        </div>
                        <div className="grid gap-2">
                            <Label>End Date</Label>
                            <DatePicker date={endDate} setDate={setEndDate} />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Overview Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {analyticsData.total_users}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {analyticsData.active_users}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">
                            Completion Rate
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {analyticsData.completion_rate}%
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">
                            Average Completion Time
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {analyticsData.average_completion_time.display}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Step Completion Rates */}
            <Card>
                <CardHeader>
                    <CardTitle>Step Completion Rates</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={analyticsData.step_completion_rates}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="time" />
                                <YAxis />
                                <Tooltip />
                                <Bar
                                    dataKey="success_rate"
                                    fill="#22c55e"
                                    name="Success Rate (%)"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Completion Trend */}
            <Card>
                <CardHeader>
                    <CardTitle>Completion Trend</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={trendData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar
                                    dataKey="completed"
                                    fill="#22c55e"
                                    name="Completed"
                                    stackId="a"
                                />
                                <Bar
                                    dataKey="stopped"
                                    fill="#ef4444"
                                    name="Stopped"
                                    stackId="a"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Failed Steps */}
            <Card>
                <CardHeader>
                    <CardTitle>Failed Steps</CardTitle>
                </CardHeader>
                <CardContent>
                    <FailedStepsList />
                </CardContent>
            </Card>
        </div>
    );
} 
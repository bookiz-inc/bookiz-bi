"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { UserProgressList } from "@/components/onboarding/progress/UserProgressList";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Card, CardContent } from "@/components/ui/card";
import { ClientOnly } from "@/components/ClientOnly";

export default function OnboardingProgressPage() {
    const [filters, setFilters] = useState({
        search: "",
        status: "ALL",
        template: "ALL",
        startDateAfter: null as Date | null,
        startDateBefore: null as Date | null,
    });

    // TODO: Fetch from API
    const templates = [
        { id: "1", name: "Default Onboarding" },
        { id: "2", name: "Premium Onboarding" },
    ];

    return (
        <ClientOnly>
            <div className="flex flex-col gap-6">
                <PageHeader
                    title="User Progress"
                    description="Track and manage users' onboarding progress"
                />

                <Card>
                    <CardContent className="pt-6">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                            <div className="grid gap-2">
                                <Label>Search</Label>
                                <Input
                                    placeholder="Search by email or phone..."
                                    value={filters.search}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setFilters({ ...filters, search: e.target.value })
                                    }
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label>Status</Label>
                                <Select
                                    value={filters.status}
                                    onValueChange={(value: string) =>
                                        setFilters({ ...filters, status: value })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="All statuses" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ALL">All</SelectItem>
                                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                                        <SelectItem value="COMPLETED">Completed</SelectItem>
                                        <SelectItem value="STOPPED">Stopped</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label>Template</Label>
                                <Select
                                    value={filters.template}
                                    onValueChange={(value: string) =>
                                        setFilters({ ...filters, template: value })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="All templates" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ALL">All</SelectItem>
                                        {templates.map((template) => (
                                            <SelectItem key={template.id} value={template.id}>
                                                {template.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label>Start Date After</Label>
                                <DatePicker
                                    date={filters.startDateAfter}
                                    setDate={(date: Date | null) =>
                                        setFilters({ ...filters, startDateAfter: date })
                                    }
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label>Start Date Before</Label>
                                <DatePicker
                                    date={filters.startDateBefore}
                                    setDate={(date: Date | null) =>
                                        setFilters({ ...filters, startDateBefore: date })
                                    }
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <UserProgressList filters={filters} />
            </div>
        </ClientOnly>
    );
}

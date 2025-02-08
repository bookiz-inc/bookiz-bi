"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { OnboardingTemplatesList } from "@/components/onboarding/templates/OnboardingTemplatesList";
import { CreateTemplateModal } from "@/components/onboarding/templates/CreateTemplateModal";
import { PageHeader } from "@/components/common/PageHeader";

export default function OnboardingTemplatesPage() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <div className="flex flex-col gap-6">
            <PageHeader
                title="Onboarding Templates"
                description="Manage your onboarding sequences and their steps"
                action={
                    <Button onClick={() => setIsCreateModalOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        New Template
                    </Button>
                }
            />

            <OnboardingTemplatesList />

            <CreateTemplateModal
                open={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </div>
    );
} 
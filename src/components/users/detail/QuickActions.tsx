'use client';

import { useState } from 'react';
import { Shield, Ban, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { BusinessBlockingService } from '@/services/businessBlocking';
import { UserDetail } from '@/types/userDetail';

interface QuickActionsProps {
    user: UserDetail;
    onActionComplete?: () => void;
}

export function QuickActions({ user, onActionComplete }: QuickActionsProps) {
    const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);
    const [blockReason, setBlockReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const handleBlock = async () => {
        setIsSubmitting(true);
        try {
            await BusinessBlockingService.blockBusiness({
                business_id: user.business.id,
                reason: blockReason,
            });
            toast({
                title: "Success",
                description: "Business blocked successfully",
            });
            setIsBlockDialogOpen(false);
            setBlockReason('');
            onActionComplete?.();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to block business",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUnblock = async () => {
        setIsSubmitting(true);
        try {
            await BusinessBlockingService.unblockBusiness(user.business.id);
            toast({
                title: "Success",
                description: "Business unblocked successfully",
            });
            onActionComplete?.();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to unblock business",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            
            <div className="space-y-4">
                {user.business.is_payment_verified ? (
                    <Button
                        variant="destructive"
                        className="w-full sm:w-auto"
                        onClick={() => setIsBlockDialogOpen(true)}
                        disabled={isSubmitting}
                    >
                        <Ban className="mr-2 h-4 w-4" />
                        Block Business
                    </Button>
                ) : (
                    <Button
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={handleUnblock}
                        disabled={isSubmitting}
                    >
                        <Shield className="mr-2 h-4 w-4" />
                        Unblock Business
                        {isSubmitting && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                    </Button>
                )}
            </div>

            <Dialog open={isBlockDialogOpen} onOpenChange={setIsBlockDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Block Business</DialogTitle>
                        <DialogDescription>
                            This action will block the business and expire their subscription. Please provide a reason.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Reason for Blocking</label>
                            <Textarea
                                placeholder="Enter reason for blocking..."
                                value={blockReason}
                                onChange={(e) => setBlockReason(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter className="flex-col sm:flex-row gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setIsBlockDialogOpen(false)}
                            disabled={isSubmitting}
                            className="w-full sm:w-auto"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleBlock}
                            disabled={!blockReason || isSubmitting}
                            className="w-full sm:w-auto"
                        >
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Block Business
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
} 
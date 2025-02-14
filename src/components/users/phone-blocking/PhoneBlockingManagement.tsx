"use client";

import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BlockedNumber, PhoneBlockingService } from '@/services/phoneBlocking';
import { format } from 'date-fns';
import { Shield, Loader2, Search } from 'lucide-react';

export function PhoneBlockingManagement() {
    const [blockedNumbers, setBlockedNumbers] = useState<BlockedNumber[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);
    const [newBlockData, setNewBlockData] = useState({ phone_number: '', reason: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        fetchBlockedNumbers();
    }, []);

    const fetchBlockedNumbers = async () => {
        try {
            const data = await PhoneBlockingService.listBlockedNumbers();
            setBlockedNumbers(data);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch blocked numbers",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleBlock = async () => {
        setIsSubmitting(true);
        try {
            await PhoneBlockingService.blockNumber(newBlockData);
            toast({
                title: "Success",
                description: "Phone number blocked successfully",
            });
            setIsBlockDialogOpen(false);
            setNewBlockData({ phone_number: '', reason: '' });
            fetchBlockedNumbers();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to block number",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUnblock = async (phoneNumber: string) => {
        try {
            await PhoneBlockingService.unblockNumber(phoneNumber);
            toast({
                title: "Success",
                description: "Phone number unblocked successfully",
            });
            fetchBlockedNumbers();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to unblock number",
                variant: "destructive",
            });
        }
    };

    const filteredNumbers = blockedNumbers.filter(number =>
        number.phone_number.includes(searchQuery) ||
        number.reason.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                        placeholder="Search phone numbers or reasons..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 w-full sm:w-[300px]"
                    />
                </div>
                <Button onClick={() => setIsBlockDialogOpen(true)} className="w-full sm:w-auto">
                    <Shield className="mr-2 h-4 w-4" />
                    Block New Number
                </Button>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                </div>
            ) : (
                <div className="border rounded-md overflow-x-auto">
                    <div className="min-w-full align-middle">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="whitespace-nowrap">Phone Number</TableHead>
                                    <TableHead className="hidden sm:table-cell">Reason</TableHead>
                                    <TableHead className="hidden md:table-cell">Blocked At</TableHead>
                                    <TableHead className="hidden lg:table-cell">Blocked By</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredNumbers.map((number) => (
                                    <TableRow key={number.phone_number}>
                                        <TableCell className="font-medium whitespace-nowrap">
                                            {number.phone_number}
                                            <div className="sm:hidden text-xs text-gray-500 mt-1">
                                                {number.reason}
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">{number.reason}</TableCell>
                                        <TableCell className="hidden md:table-cell whitespace-nowrap">
                                            {format(new Date(number.blocked_at), 'PPp')}
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell">{number.blocked_by}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                number.is_active
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-green-100 text-green-700'
                                            }`}>
                                                {number.is_active ? 'Blocked' : 'Unblocked'}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {number.is_active && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleUnblock(number.phone_number)}
                                                >
                                                    Unblock
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {filteredNumbers.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                            No blocked numbers found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}

            <Dialog open={isBlockDialogOpen} onOpenChange={setIsBlockDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Block New Phone Number</DialogTitle>
                        <DialogDescription>
                            Enter the phone number you want to block and provide a reason.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Phone Number</label>
                            <Input
                                placeholder="Enter phone number..."
                                value={newBlockData.phone_number}
                                onChange={(e) =>
                                    setNewBlockData((prev) => ({
                                        ...prev,
                                        phone_number: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Reason</label>
                            <Textarea
                                placeholder="Enter reason for blocking..."
                                value={newBlockData.reason}
                                onChange={(e) =>
                                    setNewBlockData((prev) => ({
                                        ...prev,
                                        reason: e.target.value,
                                    }))
                                }
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
                            onClick={handleBlock}
                            disabled={!newBlockData.phone_number || isSubmitting}
                            className="w-full sm:w-auto"
                        >
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Block Number
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
} 
'use client';

import { ChevronDown, Filter, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import UserFilters from "./UserFilters";
import type { FilterOptions, SortOptions } from "./UserFilters";
import { useState } from "react";

interface MobileFiltersProps {
    onFilterChange: (filters: FilterOptions) => void;
    onSortChange: (sort: SortOptions) => void;
    onReset: () => void;
}

export default function MobileFilters({ onFilterChange, onSortChange, onReset }: MobileFiltersProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden">
            <div className="flex gap-2">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex-1 flex items-center justify-between p-4 bg-white rounded-lg shadow"
                >
                    <span className="inline-flex items-center gap-2 font-medium">
                        <Filter className="h-4 w-4 text-gray-500" />
                        Filters & Sort</span>
                    <ChevronDown className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <button
                    onClick={onReset}
                    className="p-4 bg-white rounded-lg shadow hover:bg-gray-50"
                    title="Reset all filters"
                >
                    <RotateCcw className="w-5 h-5 text-gray-500" />
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 bg-white rounded-lg shadow overflow-hidden"
                    >
                        <div className="p-4">
                            <UserFilters
                                onFilterChange={onFilterChange}
                                onSortChange={onSortChange}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
} 
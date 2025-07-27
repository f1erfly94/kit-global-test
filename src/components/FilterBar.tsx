'use client';

import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Search, User, SortAsc} from 'lucide-react';
import {RootState} from '@/store';
import {setSearchTerm, setAuthor, setSortBy, resetFilters} from '@/store/slices/filtersSlice';
import {Input} from './ui/Input';
import {Button} from './ui/Button';

export const FilterBar: React.FC = () => {
    const dispatch = useDispatch();
    const filters = useSelector((state: RootState) => state.filters);

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
                <div className="flex-1 min-w-0">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
                        <Input
                            placeholder="Search by title..."
                            value={filters.searchTerm}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                dispatch(setSearchTerm(e.target.value))
                            }
                            className="pl-10"
                        />
                    </div>
                </div>

                <div className="w-full lg:w-48">
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
                        <Input
                            placeholder="Author..."
                            value={filters.author}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                dispatch(setAuthor(e.target.value))
                            }
                            className="pl-10"
                        />
                    </div>
                </div>

                <div className="w-full lg:w-40">
                    <div className="relative">
                        <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
                        <select
                            value={filters.sortBy}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                dispatch(setSortBy(e.target.value as 'newest' | 'oldest' | 'title'))
                            }
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        >
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                            <option value="title">By title</option>
                        </select>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    onClick={() => dispatch(resetFilters())}
                    className="whitespace-nowrap"
                >
                    Reset
                </Button>
            </div>
        </div>
    );
};

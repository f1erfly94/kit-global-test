import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from '@/types';

const initialState: FilterState = {
    searchTerm: '',
    author: '',
    sortBy: 'newest',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        setAuthor: (state, action: PayloadAction<string>) => {
            state.author = action.payload;
        },
        setSortBy: (state, action: PayloadAction<'newest' | 'oldest' | 'title'>) => {
            state.sortBy = action.payload;
        },
        resetFilters: (state) => {
            state.searchTerm = '';
            state.author = '';
            state.sortBy = 'newest';
        },
    },
});

export const { setSearchTerm, setAuthor, setSortBy, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'search',
    initialState: {
        searchText: '',
        searchStatus: {
            value: 'newest',
            label: 'Newest',
        },
    },
    reducers: {
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        },
        setSearchStatus: (state, action) => {
            state.searchStatus = action.payload;
        },
    }
})

export const { setSearchText, setSearchStatus } = productSlice.actions;

export const searchTextSelector = (state) => state.search.searchText;
export const searchStatusSelector = (state) => state.search.searchStatus;

export default productSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'search',
    initialState: {
        searchText: '',
        searchStatus: {
            value: 'newest',
            label: 'Newest',
        },
        searchBrand: -1,
        page: 1,
    },
    reducers: {
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        },
        setSearchStatus: (state, action) => {
            state.searchStatus = action.payload;
        },
        setSearchBrand: (state, action) => {
            state.searchBrand = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        }
    }
})

export const { setSearchText, setSearchStatus, setSearchBrand, setPage } = productSlice.actions;

export const searchTextSelector = (state) => state.search.searchText;
export const searchStatusSelector = (state) => state.search.searchStatus;
export const searchBrandSelector = (state) => state.search.searchBrand;
export const pageSelector = (state) => state.search.page;

export default productSlice.reducer;
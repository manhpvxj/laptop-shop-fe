import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: {},
    },
    reducers: {
        setProductDetail: (state, action) => {
            state.product.product = action.payload;
        },
    }
})

export const { setProductDetail, setOpenCategory } = productSlice.actions;

export const productDetailSelector = (state) => state.product.product;

export default productSlice.reducer;
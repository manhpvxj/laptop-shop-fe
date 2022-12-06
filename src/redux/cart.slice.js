import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
}
export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { id } = action.payload;
            const itemInCart = state.cart.find((item) => item.id === id);
            if(!itemInCart) {
                state.cart.push(action.payload);
            }
            else {
                itemInCart.quantity = action.payload.quantity;
            }
        },
        removeProductFromCart: (state, action) => {
            state.cart = state.cart.filter((product) => product.id !== action.payload.id);
        },
        removeAllFromCart: (state, action) => {
            state.cart = initialState;
        },
    }
})

export const { addToCart, removeProductFromCart, removeAllFromCart} = cartSlice.actions;

export const cartSelector = (state) => state.cart.cart;


export default cartSlice.reducer
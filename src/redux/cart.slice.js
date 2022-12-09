import sum from 'lodash/sum';
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    totalPrice: 0,
    totalItems: 0,
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
        increaseQuantity: (state, action) => {
            const updatedItem = state.cart.map((product) => {
                if(product.id === action.payload) {
                    return {
                        ...product,
                        quantity: product.quantity + 1,
                    }
                }
                return product;
            })
            state.cart = updatedItem;
        },
        decreaseQuantity: (state, action) => {
            const updatedItem = state.cart.map((product) => {
                if(product.id === action.payload) {
                    return {
                        ...product,
                        quantity: product.quantity - 1,
                    }
                }
                return product;
            })
            state.cart = updatedItem;
        },
        removeProductFromCart: (state, action) => {
            state.cart = state.cart.filter((product) => product.id !== action.payload);
        },
        removeAllFromCart: (state, action) => {
            state.cart = initialState;
        },
        setTotalPrice: (state, action) => {
            const carts = action.payload;
            state.totalPrice = sum(carts.map((item) => item.priceSell * item.quantity));
        },
        setTotalItems: (state, action) => {
            const carts = action.payload;
            state.totalItems = sum(carts.map((item) => item.quantity));
        }
    }
})

export const {
  addToCart,
  removeProductFromCart,
  removeAllFromCart,
  setTotalPrice,
  increaseQuantity,
  decreaseQuantity,
  setTotalItems,
} = cartSlice.actions;

export const cartSelector = (state) => state.cart.cart;
export const totalPriceSelector = (state) => state.cart.totalPrice;
export const totalItemsSelector = (state) => state.cart.totalItems;

export default cartSlice.reducer
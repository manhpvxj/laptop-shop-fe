import sum from 'lodash/sum';
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    totalPrice: 0,
    totalItems: 0,
    information: {
        fullName: '',
        phoneNumber: '',
        address: '',
    }
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
        removeAllFromCart: () => initialState,
        setTotalPrice: (state, action) => {
            const carts = action.payload;
            state.totalPrice = sum(carts.map((item) => item.priceSell * item.quantity));
        },
        setTotalItems: (state, action) => {
            const carts = action.payload;
            state.totalItems = sum(carts.map((item) => item.quantity));
        },
        setFullName: (state, action) => {
            state.information.fullName = action.payload;
        },
        setPhoneNumber: (state, action) => {
            state.information.phoneNumber = action.payload;
        },
        setAddress: (state, action) => {
            state.information.address = action.payload;
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
  setFullName,
  setPhoneNumber,
  setAddress,
} = cartSlice.actions;

export const cartSelector = (state) => state.cart.cart;
export const totalPriceSelector = (state) => state.cart.totalPrice;
export const totalItemsSelector = (state) => state.cart.totalItems;

export default cartSlice.reducer
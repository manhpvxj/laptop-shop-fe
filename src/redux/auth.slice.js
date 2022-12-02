import { createSlice } from "@reduxjs/toolkit";

const authLoginState = {
    isAuthenticated: false,
    accessToken: '',
}

export const authLoginSlice = createSlice({
    name: 'authLogin',
    initialState: authLoginState,
    reducers: {
        setLogin: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
    }
})

export const {setLogin, setAccessToken} = authLoginSlice.actions;
export const loginSelector = (state) => state.authLogin.isAuthenticated;
export const accessTokenSelector = (state) => state.authLogin.accessToken;

export default authLoginSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const authLoginState = {
    accessToken: '',
    isLoggedin: false,
}

export const authLoginSlice = createSlice({
    name: 'authLogin',
    initialState: authLoginState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setLoggedIn: (state, action) => {
            state.isLoggedin = action.payload;
        }
    }
})

export const { setAccessToken, setLoggedIn } = authLoginSlice.actions;
export const accessTokenSelector = (state) => state.authLogin.accessToken;

export default authLoginSlice.reducer;
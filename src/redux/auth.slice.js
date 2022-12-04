import { createSlice } from "@reduxjs/toolkit";

const authLoginState = {
    accessToken: '',
}

export const authLoginSlice = createSlice({
    name: 'authLogin',
    initialState: authLoginState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
    }
})

export const { setAccessToken } = authLoginSlice.actions;
export const accessTokenSelector = (state) => state.authLogin.accessToken;

export default authLoginSlice.reducer;
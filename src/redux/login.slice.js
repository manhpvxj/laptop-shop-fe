import { createSlice } from "@reduxjs/toolkit";

const loginState = {
    username: '',
    password: '',
    showPassword: false,
    rememberMe: false,
}
export const loginSlice = createSlice({
    name: 'login',
    initialState: loginState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setShowPassword: (state, action) => {
            state.showPassword = action.payload;
        },
        setRememberMe: (state, action) => {
            state.rememberMe = action.payload;
        }
    }
})
export const { setUsername, setPassword, setShowPassword, setRememberMe } = loginSlice.actions;

export const usernameSelector = (state) => state.login.username;

export const passwordSelector = (state) => state.login.password;

export const showPasswordSelector = (state) => state.login.showPassword;

export default loginSlice.reducer;
import { combineReducers } from "redux";
import authLoginSliceReducer from "./auth.slice";
import loginSliceReducer from "./login.slice";
import cartSliceReducer from './cart.slice';

const rootReducer = combineReducers({
    login: loginSliceReducer,
    authLogin: authLoginSliceReducer,
    cart: cartSliceReducer,
})

export default rootReducer;
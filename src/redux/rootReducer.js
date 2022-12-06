import { combineReducers } from "redux";
import authLoginSliceReducer from "./auth.slice";
import loginSliceReducer from "./login.slice";
import cartSliceReducer from './cart.slice';
import productSliceReducer from './product.slice';
import searchSliceReducer from './search.slice';

const rootReducer = combineReducers({
    login: loginSliceReducer,
    authLogin: authLoginSliceReducer,
    cart: cartSliceReducer,
    product: productSliceReducer,
    search: searchSliceReducer,
})

export default rootReducer;
import { combineReducers } from "redux";
import authLoginSliceReducer from "./auth.slice";
import loginSliceReducer from "./login.slice";

const rootReducer = combineReducers({
    login: loginSliceReducer,
    authLogin: authLoginSliceReducer,
})

export default rootReducer;
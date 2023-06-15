import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/Login/loginSlice"
import signupReducer from "./features/Signup/signupSlice"
import shopReducer from "./features/Shop/shopSlice"

export const store= configureStore({
    reducer:{
        login: loginReducer,
        signup: signupReducer,
        shop: shopReducer,
    },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

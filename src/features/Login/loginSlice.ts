import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LoginState{
    userName: string;
    password: string;
}

const initialState: LoginState = {
    userName: "",
    password: "",
}


export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers:{
        setUserName: (state, action: PayloadAction<string>) =>{
            state.userName = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) =>{
            state.password = action.payload;
        },
    },
})

export const {setUserName, setPassword} = loginSlice.actions
export default loginSlice.reducer
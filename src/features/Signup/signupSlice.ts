import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface SignupState {
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;
}

const initialState: SignupState = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
}

export const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers:{
        setUser: (state, action: PayloadAction<SignupState>) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.emailAddress = action.payload.emailAddress;
            state.password = action.payload.password;
        },

    }
})

export const {setUser} = signupSlice.actions

export default signupSlice.reducer
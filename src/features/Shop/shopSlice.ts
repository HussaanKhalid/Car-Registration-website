import { createSlice } from "@reduxjs/toolkit";
import { regCarData, registerCarsData } from "../../carData";

export interface ShopState{
    carList: regCarData[];
}

const initialState: ShopState = {
    carList: registerCarsData,
}

export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        registerCar: (state, action) => {
            state.carList.push(action.payload);
        }, 
        setCarList: (state,action) => {
            state.carList = action.payload;
        },
        updateCar: (state, action) => {
            const index = Number(action.payload.id) - 1;
            state.carList[index] = action.payload;
        }
    }
})

export const {registerCar, setCarList, updateCar} = shopSlice.actions

export default shopSlice.reducer
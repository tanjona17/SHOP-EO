'use client'
import {createSlice} from "@reduxjs/toolkit";

const cart_slice = createSlice({
    name: "cart",
    initialState: {
        data: [],
        quantity: 0,
        total_price: 0,
    },
    reducers: {
        add_product: (state, action) =>{
            state.quantity += 1;
            state.data.push(action.payload.data);
            state.total_price += action.payload.price;

        }
    }
});

export const {add_product} = cart_slice.actions;
export default cart_slice.reducer;
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

        },
        reset_cart: (state, ) =>{
            state.quantity = 0;
            state.data = [];
            state.total_price = 0;

        }
    }
});

export const {add_product,reset_cart} = cart_slice.actions;
export default cart_slice.reducer;
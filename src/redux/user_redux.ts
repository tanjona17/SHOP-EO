'use client'
import {createSlice} from "@reduxjs/toolkit";

const user_slice = createSlice({
    name: "user",
    initialState: {
        current_user: null,
        is_fetching: false,
        // search_input: "",
        error: false,
    },
    reducers: {
        login_start: (state) =>{
            state.is_fetching = true;
        },
        login_success: (state,action) =>{
            state.is_fetching = false;
            state.current_user = action.payload;
            state.error = false;
        },
        login_failed: (state) =>{
            state.is_fetching = false;
            state.error = true;

        },
        // input_reducer: (state, action) =>{
           
 
        //     state.search_input = action.payload
        // }
    },
});

export const {login_start, login_success, login_failed} = user_slice.actions;
export default user_slice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counterSlice.js";
import { categoriesReducer } from "./categoriesSlice.js";


// the store is  waiting for reducer
export let store = configureStore ({
    reducer:{
        //        [reducerName]: reducer,
counter:counterReducer,
categories:categoriesReducer


    }
})



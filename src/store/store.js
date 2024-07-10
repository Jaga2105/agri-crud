import { configureStore } from "@reduxjs/toolkit";
import cropReducer from "./reducers/cropSlice";

const store = configureStore({
    reducer:{
        crops:cropReducer
    }
})

export default store;
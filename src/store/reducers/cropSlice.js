import { createSlice } from "@reduxjs/toolkit";
import { AllCrops } from "../../Data";

const cropSlice = createSlice({
    name:'crops',
    initialState:AllCrops,
    reducers:{
        addCrop:(state,action)=>{
            state.unshift(action.payload);
        },
        editCrop:(state,action)=>{
            return action.payload;
        },
        deleteCrop:(state,action)=>{
            return action.payload;
        }

    }
})

export const {addCrop, editCrop, deleteCrop} = cropSlice.actions;
export default cropSlice.reducer;
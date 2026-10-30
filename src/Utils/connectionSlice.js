import { createSlice } from "@reduxjs/toolkit";

const connectionSlice= createSlice({
    name:"connections",
    initialState:null,
    reducers:{
        addConnections: (state,action)=>{
            return action.payload
        },
        removeConnections:(state,action)=>{
            const newArray= state.filter((r)=>r._id!==action.payload)
            return newArray;

        }
    }
});

export const {addConnections,removeConnections}=connectionSlice.actions;
export default connectionSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const serverUrl = import.meta.env.VITE_SERVER_URL;



export const fetchCategroies = createAsyncThunk('fetchCategroies',async()=>{
    const response = await fetch(serverUrl + "/api/getAllCategroiesData");
    return response.json();
})

const initialState = {
    isLoading : false,
    data : null,
    isError : false 
}
 const categroiesSubCategroiesSlice = createSlice({
    name : 'fileDataCategroies',
    initialState,
    extraReducers : (builder) =>{
        builder.addCase(fetchCategroies.pending , (state, action)=>{
            state.isLoading = true;
        })
        builder.addCase(fetchCategroies.fulfilled,(state , action)=>{
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchCategroies.rejected , (state,action)=>{
            state.isError = true
        })
    }

})

export  default categroiesSubCategroiesSlice.reducer
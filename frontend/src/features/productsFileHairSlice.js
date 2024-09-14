import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const fetchProducts = createAsyncThunk('fetchProducts', async () => {
    // Fetch product data
    const response = await fetch(serverUrl + "/api/getAllProductData");
    const products = await response.json();

    return products;
});


const initialState = {
    isLoading: false,
    data: null,
    isError: false
}
const productsFileHairSlice = createSlice({
    name: 'fileDataProducts',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isError = true
        })
    }

})

export default productsFileHairSlice.reducer
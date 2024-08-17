import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const fetchProducts = createAsyncThunk('fetchProducts', async () => {
    // Fetch product data
    const response = await fetch(serverUrl + "/api/getAllProductData");
    const products = await response.json();

    // Fetch image data
    const responseImage = await fetch(serverUrl + "/api/getAllProductHeadImage");
    const images = await responseImage.json();

    // Map over products and add the matching image
    const productsWithImages = products.data.map(product => {
        // Find the image that matches the product _id
        const matchedImage = images.data.find(image => image.productId === product._id);

        // Add the image to the product object
        return {
            ...product,
            image: matchedImage ? matchedImage.image : null // Assign the image if found, otherwise null
        };
    });

    return productsWithImages;
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
// tokenFeatureSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const setTokenFunc = (token) => {
    localStorage.setItem("HennaKartToken", token);
};

export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (_, { getState, rejectWithValue }) => {
        const state = getState();
        const token = state.TokenReducer.token; // Access token from the state

        try {
            const response = await axios.get('http://localhost:4000/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }); 
            
            return response.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            return rejectWithValue(error.response.data);
        }
    }
);

const tokenFeatureSlice = createSlice({
    name: "Token",
    initialState: {
        token: localStorage.getItem("HennaKartToken") || "",
        userData: null,
        error: null,
    },
    reducers: {
        addTokenOnLocal: (state, action) => {
            const token = action.payload;
            state.token = token;
            setTokenFunc(token);
        },
        removeTokenOnLocal: (state) => {
            state.token = "";
            localStorage.removeItem("HennaKartToken");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.userData = action.payload;
                state.error = null;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.userData = null;
                state.error = action.payload;
            });
    },
});

export const { addTokenOnLocal, removeTokenOnLocal } = tokenFeatureSlice.actions;
export default tokenFeatureSlice.reducer;

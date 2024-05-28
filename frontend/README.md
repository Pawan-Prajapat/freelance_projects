# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh








import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const userAuthentication = createAsyncThunk('userAuthentication',async()=>{ 
    try {
        const response = await fetch(serverUrl + "/api/user",{
            method : "GET",
            headers : {
                Authorization : `Bearer ${token}`,
            }
        });
        if(response.ok){
            const data = await response.json();
            
        }
        
    } catch (error) {
        console.error("Error fetching  user data");
    }
})


const setTokenFunc = (token) => {
    localStorage.setItem("HennaKartToken", token);
};

const tokenFeatureSlice = createSlice({
    name: "Token",
    initialState: {
        token: localStorage.getItem("HennaKartToken") || "",
    },
    reducers: {
        addTokenOnLocal: (state, action) => {
            const token = action.payload;
            state.token = token; // Update state.token
            setTokenFunc(token);
        },
        removeTokenOnLocal: (state) => {
            state.token = ""; // Clear state.token
            localStorage.removeItem("HennaKartToken");
        },
    },
});

export const { addTokenOnLocal, removeTokenOnLocal } = tokenFeatureSlice.actions;
export default tokenFeatureSlice.reducer;

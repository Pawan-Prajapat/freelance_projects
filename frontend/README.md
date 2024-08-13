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


// for remove the free return tag from product whole  page 


import { IoShieldHalfSharp } from "react-icons/io5";

{/* <div className="w-full">
                    <div className='flex items-end gap-3 mt-3'>
                        <IoShieldHalfSharp className='w-6 h-6' />
                        <p className='text-green-700 mt-3 font-pawan font-semibold'>Free Returns</p>
                        <FaQuestionCircle className='w-5 h-5 text-gray-300' />
                    </div>
                    <p className='text-gray-500 mt-2'>Learn More.</p>
                </div> */}

remove the review 

import { IoIosStar } from "react-icons/io";
 <div className='flex items-center gap-2'>
                        <p className='flex text-gray-200 gap-1'>
                            {Array.from({ length: 5 }, (_, i) => (
                                <IoIosStar key={i} />
                            ))}
                        </p>
                        <span className='text-gray-400'>No Review</span>
                    </div>
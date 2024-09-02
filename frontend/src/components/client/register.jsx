import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux";
import {addTokenOnLocal} from "../../features/tokenFeatureSlice"

const serverUrl = import.meta.env.VITE_SERVER_URL;

function Register() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: ""
    });

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    
    const dispatch = useDispatch();
    const handleAddToken  = (token) => {
        dispatch(addTokenOnLocal(token));
    }

    const onsubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(serverUrl + "/api/register", user);
            handleAddToken(response.data.token);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className={`flex justify-center h-auto mb-0`}>
            <section className={`text-black bg-white px-8 gap-8 flex flex-col w-[50%] transition-all duration-500 ease-in-out`}>
                <div className='flex justify-center items-center mt-4'>
                    <p className='font-semibold text-2xl uppercase tracking-wider'>create account</p>
                </div>

                <form onSubmit={onsubmit}>
                    <label className='font-medium' htmlFor="username">Username <span className='text-red-500'>*</span></label>
                    <input value={user.username} onChange={handleInputs} type="text" id='username' name='username' className='border border-black outline-none placeholder:text-gray-500 px-3 py-2 my-3 w-full' placeholder='Username' />
                    <label className='font-medium' htmlFor="email">Email Address <span className='text-red-500'>*</span></label>
                    <input value={user.email} onChange={handleInputs} type="text" id='email' name='email' className='border border-black outline-none placeholder:text-gray-500 px-3 py-2 my-3 w-full' placeholder='Email Address' />
                    <label className='font-medium' htmlFor="phone">Phone <span className='text-red-500'>*</span></label>
                    <input value={user.phone} onChange={handleInputs} type="text" id='phone' name='phone' className='border border-black outline-none placeholder:text-gray-500 px-3 py-2 my-3 w-full' placeholder='Phone' />
                    <label className='font-medium' htmlFor="password">Password <span className='text-red-500'>*</span></label>
                    <input value={user.password} onChange={handleInputs} type="password" id='password' name='password' className='border border-black outline-none placeholder:text-gray-500 px-3 py-2 my-3 w-full' placeholder='Password' />
                    <button className='text-lg uppercase hover:border-2 hover:border-black w-full py-[12px] mt-3 font-bold bg-[#4b7422] shadow-[5px_6px_rgb(166,222,205,1)] text-blue-50 hover:bg-white hover:text-black hover:shadow-black' type="submit">Create An Account</button>
                </form>
            </section>
        </div>
    );
}

export default Register;
import React, { useState, useEffect } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, Outlet, Navigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from "../../features/tokenFeatureSlice";
function adminLayout() {
    const [dropDownArray, setDropDownArray] = useState([true, true, true, true, true]);
    const togglePrice = (number) => {
        const newArray = [...dropDownArray];
        newArray[number] = !newArray[number];
        setDropDownArray(newArray);
    };


    // check admin or not 
    const dispatch = useDispatch();
    const token = useSelector((state) => state.TokenReducer.token || "");

    useEffect(() => {
        if (token) {
            dispatch(fetchUserData());
        } else {
        }
    }, [token]);
    const userData = useSelector(state => state.TokenReducer.userData);
    if (userData) {
        if (userData.msg.isAdmin !== true)
            return <Navigate to="/" />
    }
    if (!token) {
        return <Navigate to="/" />
    }
    return (
        <>
            <div>
                <div className='w-full bg-red-500 h-20 flex justify-between px-20 items-center'>
                    <p>Admin Panel</p>
                    <p>User Name</p>
                    <NavLink to={'/logout'} >Logout</NavLink>

                </div>
                <div className='flex flex-col lg:flex-row'>
                    <div className='w-full lg:w-[15%] bg-blue-950 px-4 lg:px-5'>
                        <div className=" text-base tracking-wide font-bold text-white mt-10">Deshboard</div>
                        <div className="pt-5 w-full">
                            <div className=" flex gap-2 items-center cursor-pointer " onClick={() => togglePrice(0)}>
                                <div className=" text-base tracking-wide font-bold text-white">Product</div>
                                <div className="text-gray-600">
                                    <span className={`arrow`}>
                                        <IoMdArrowDropdown className={`${dropDownArray[0] ? "rotate-[-180deg]" : ""} transition duration-1000 bi bi-chevron-down h-8 w-7`} />
                                    </span>
                                </div>
                            </div>
                            <div className={`${dropDownArray[0] ? " pt-3 grid-rows-[0fr] opacity-100" : "grid-rows-[1fr]"} ps-5 pt-3 overflow-hidden grid duration-500 ease-in-out transition-all`}>
                                <div className=" overflow-hidden flex flex-col">
                                    <Link className=' text-white hover:underline hover:underline-offset-4' to={'/admin/products'}>View Product</Link>
                                    <Link className=' text-white hover:underline hover:underline-offset-4' to={'/admin/ProductForm'}>Product Form</Link>
                                </div>
                            </div>
                        </div>
                        <div className=" pt-0 w-full">
                            <div className=" flex gap-2 items-center cursor-pointer " onClick={() => togglePrice(1)}>
                                <div className=" text-base tracking-wide font-bold text-white">Orders</div>
                                <div className="text-gray-600">
                                    <span className={`arrow`}>
                                        <IoMdArrowDropdown className={`${dropDownArray[1] ? "rotate-[-180deg]" : ""} transition duration-1000 bi bi-chevron-down h-8 w-7`} />
                                    </span>
                                </div>
                            </div>
                            <div className={`${dropDownArray[1] ? " pt-3 grid-rows-[0fr] opacity-100" : "grid-rows-[1fr]"} ps-5 pt-3 overflow-hidden grid duration-500 ease-in-out transition-all`}>
                                <div className=" overflow-hidden flex flex-col">
                                    <Link className=' text-white hover:underline hover:underline-offset-4' to={'/admin/orders'}>All Orders</Link>
                                </div>
                            </div>
                        </div>
                        <div className=" pt-0 w-full">
                            <div className=" flex gap-2 items-center cursor-pointer " onClick={() => togglePrice(2)}>
                                <div className=" text-base tracking-wide font-bold text-white">Categroies</div>
                                <div className="text-gray-600">
                                    <span className={`arrow`}>
                                        <IoMdArrowDropdown className={`${dropDownArray[2] ? "rotate-[-180deg]" : ""} transition duration-1000 bi bi-chevron-down h-8 w-7`} />
                                    </span>
                                </div>
                            </div>
                            <div className={`${dropDownArray[2] ? " pt-3 grid-rows-[0fr] opacity-100" : "grid-rows-[1fr]"} ps-5 pt-3 overflow-hidden grid duration-500 ease-in-out transition-all`}>
                                <div className=" overflow-hidden flex flex-col">
                                    <Link className=' text-white hover:underline hover:underline-offset-4' to={'/admin/categroies'}>categroies</Link>
                                    <Link className=' text-white hover:underline hover:underline-offset-4' to={'/admin/subcategroies'}>subcategroies</Link>
                                </div>
                            </div>
                        </div>
                        <div className=" pt-0 w-full">
                            <div className=" flex gap-2 items-center cursor-pointer " >
                                <Link className=' text-base tracking-wide font-bold text-white hover:underline hover:underline-offset-4' to={'/admin/bannerAndTopSlider'}>Add Banner and Show Offer</Link>
                            </div>
                        </div>

                    </div>
                    <div className='w-full lg:w-[85%] bg-white px-4 lg:px-8'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default adminLayout
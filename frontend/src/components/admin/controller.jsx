import React,{useState} from 'react'
import { IoMdArrowDropdown } from "react-icons/io";
import {Link} from 'react-router-dom';

function controller() {
    const [dropDownArray, setDropDownArray] = useState([true, true, true, true, true]);
    const togglePrice = (number) => {
        const newArray = [...dropDownArray];
        newArray[number] = !newArray[number];
        setDropDownArray(newArray);
    };
    return (
        <>
            <div className=" text-base tracking-wide font-bold text-white mt-10">Deshboard</div>
            <div className="pt-5 w-full">
                <div className=" flex gap-2 items-center cursor-pointer " onClick={() => togglePrice(0)}>
                    <div className=" text-base tracking-wide font-bold text-white">Product</div>
                    <div className="text-gray-600">
                        <span className={`arrow`}>
                        <IoMdArrowDropdown className={`${dropDownArray[0] ? "rotate-[-180deg]" : ""} transition duration-1000 bi bi-chevron-down h-8 w-7`}/>
                        </span>
                    </div>
                </div>
                <div className={`${dropDownArray[0] ? " pt-3 grid-rows-[0fr] opacity-100" : "grid-rows-[1fr]"} ps-5 pt-3 overflow-hidden grid duration-500 ease-in-out transition-all`}>
                    <div className=" overflow-hidden flex flex-col">
                        <Link className=' text-white hover:underline hover:underline-offset-4' to={'/admin/products'}>View Product</Link>
                        <Link className=' text-white hover:underline hover:underline-offset-4' to={'/admin/insertProduct'}>Insert Product</Link>
                    </div>
                </div>
            </div>
            <div className=" pt-0 w-full">
                <div className=" flex gap-2 items-center cursor-pointer " onClick={() => togglePrice(1)}>
                    <div className=" text-base tracking-wide font-bold text-white">Users</div>
                    <div className="text-gray-600">
                        <span className={`arrow`}>
                        <IoMdArrowDropdown className={`${dropDownArray[1] ? "rotate-[-180deg]" : ""} transition duration-1000 bi bi-chevron-down h-8 w-7`}/>
                        </span>
                    </div>
                </div>
                <div className={`${dropDownArray[1] ? " pt-3 grid-rows-[0fr] opacity-100" : "grid-rows-[1fr]"} ps-5 pt-3 overflow-hidden grid duration-500 ease-in-out transition-all`}>
                    <div className=" overflow-hidden flex flex-col">
                        <Link className=' text-white hover:underline hover:underline-offset-4' to={'/admin/userDetail'}>User Detail</Link>
                        <Link className=' text-white hover:underline hover:underline-offset-4' to={'/admin/userPaymentDetail'}>User Payment Detail</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default controller
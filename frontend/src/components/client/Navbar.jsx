import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import flag from '../../img/India.webp';
import logo from '../../img/YumiHerbalProduct.png';
import { LiaShoppingBagSolid } from "react-icons/lia";
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import Login from "./login";
import { GoPerson } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../features/tokenFeatureSlice";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Navbar() {

    // for the login use show the vlaue 

    const dispatch = useDispatch();
    const token = useSelector((state) => state.TokenReducer.token || "");
    useEffect(() => {
        if (token) {
            dispatch(fetchUserData());
        }
    }, [token, dispatch]);
    const userData = useSelector(state => state.TokenReducer.userData);

    const location = useLocation();

    const [navbar, setNavbar] = useState(false);
    const changeNavBar = () => {
        if (window.scrollY >= 27) {
            setNavbar(true);
        }
        else {
            setNavbar(false);
        }
    };

    window.addEventListener('scroll', changeNavBar);

    // for the offcanvas

    const [isOffcanvasOpen, setOffcanvas] = useState([false, false]);

    const offcanvasOpenAndClose = (number) => {
        const newArray = [...isOffcanvasOpen];
        newArray[number] = !newArray[number];
        setOffcanvas(newArray);
    }

    const checkIsOffcanvasOpenForLogin = (number) => {
        if (isOffcanvasOpen[number]) return true;
        return false;
    }

    // show the submenu on hover     
    const [showTheSubmenuOnHover, setShowTheSubmenuOnHover] = useState([false, false, false, false]);
    const showTheSubmenuOnHoverFunc = (number) => {
        const newArray = [...showTheSubmenuOnHover];
        newArray[number] = !newArray[number];
        setShowTheSubmenuOnHover(newArray);
    }

    // show the how many product in add to cart
    const howManyProductAdd = useSelector(state => state.AddToCartReducer.addToCart);
    let totalAddproduct = 0;
    howManyProductAdd.map((product) => {
        totalAddproduct += product.qyt;
    })

    // hide the  navbar from the admin
    if (location.pathname === '/admin' || location.pathname.startsWith('/admin')) {
        return null;
    }

    return (
        <>
            {/* login offcanvas  */}
            <Login openAndClose={offcanvasOpenAndClose} showOrNot={checkIsOffcanvasOpenForLogin} />


            <nav className={`${navbar ? 'h-[50px]  pb-10 pt-3   bg-white   fixed top-0  ' : '  '} shadow-md xl:shadow-none w-full z-50 `}>
                <div className={`${navbar ? 'hidden' : 'w-full h-0 xl:h-[88px] items-center justify-between px-4  bg-[#f8f8f8] hidden xl:flex'}`}>

                    <div className='flex'>
                        <LazyLoadImage src={flag} alt="" className=' w-6 me-1 ' />
                        <p>IN</p>
                    </div>
                    <div className='w-[200px] h-[70px] overflow-y-clip'><Link to="/"><LazyLoadImage src={logo} alt="" className=' w-[190px] h-[95px] ' /></Link></div>
                    <div className='flex items-center w-72 justify-between'>
                        <div className="relative mt-2 rounded-md shadow-sm mx-2">
                            <input type="text" name="search" id="search" className="block  rounded-md py-1.5 border-b-2 w-[132px] pl-1 pr-10 text-gray-900 outline-none  placeholder:text-gray-400   sm:text-sm sm:leading-6" placeholder="Search" />
                            <div className="cursor-pointer transition-all hover:ease-in-out hover:duration-75 absolute inset-y-0 right-0 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" fill="currentColor" className="  bi bi-search " viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                </svg>

                            </div>
                        </div>
                        <div onClick={() => offcanvasOpenAndClose(1)} className='cursor-pointer w-8 h-11 mx-2 '>
                            {
                                userData !== null ? (
                                    <p className=' text-center text-xl border-2 rounded-full bg-gray-600 text-white'>{userData.msg.username[0]}</p>

                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" fill="currentColor" className="hover:w-full hover:h-full duration-500  bi bi-person " viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                    </svg>
                                )
                            }
                        </div>

                        <div className='cursor-pointer w-6 h-11 mx-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="40" fill="currentColor" className="hover:w-full hover:h-full duration-500  bi bi-heart" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                            </svg>
                        </div>
                        <Link to={"/addtocart"}>
                            <div className='cursor-pointer w-7 h-11 mx-2 relative'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="40" fill="currentColor" className="hover:w-full hover:h-full duration-500  bi bi-cart3" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                </svg>
                                <p className="text-xs p-2 font-semibold absolute -top-1 -right-2 rounded-full bg-green-800 flex justify-center items-center text-white w-5  h-5"> {totalAddproduct} </p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className={`${navbar ? 'flex  justify-between items-center bg-white shadow-md' : 'flex items-center justify-between xl:justify-center '} h-[100px]    xl:h-[67px] px-4  w-full`}>
                    <div className={`${navbar ? '' : '  xl:hidden'} flex gap-11`}>
                        <div className='xl:hidden'>
                            <FiMenu onClick={() => offcanvasOpenAndClose(0)} className=' w-6 h-6 cursor-pointer' />
                        </div>
                        <Link to="/"><LazyLoadImage src={logo} alt="" className='w-[100px] h-[50px]' /></Link>
                    </div>
                    {/* this is for desktop  */}
                    <div >
                        <ul className={`${navbar ? '  ' : ' items-center  justify-center  '} hidden z-30  xl:inline-flex   `}>
                            <li className=' uppercase mx-3 text-green-700 font-bold text-base hover:underline hover:underline-offset-4 hover:text-black hover:decoration-black hover:cursor-pointer'><Link to="/bestSellers">bestsellers</Link></li>
                            <li className=' relative uppercase mx-3 text-green-700 font-bold text-base hover:underline hover:underline-offset-4 hover:text-black hover:decoration-black hover:cursor-pointer' onMouseEnter={() => showTheSubmenuOnHoverFunc(0)}
                                onMouseLeave={() => showTheSubmenuOnHoverFunc(0)}><Link to="/hair">
                                    hairCare
                                    <div className={`${showTheSubmenuOnHover[0] ? 'border-t absolute w-52 top-[25px] left-1 flex flex-col bg-white z-50 text-black' : 'hidden'}`}>
                                        <Link className=' mx-2 py-2 font-normal hover:underline hover:underline-offset-4' to="/hennas">Hennas</Link>
                                        <Link className='border-t mx-2 py-2 font-normal hover:underline hover:underline-offset-4 ' to="/hairMask"><span>Hair Mask</span></Link>
                                        <Link className='border-t mx-2 py-2 font-normal hover:underline hover:underline-offset-4 ' to="/hair">Hair Care</Link>
                                        <Link className='border-t mx-2 py-2 font-normal hover:underline hover:underline-offset-4 ' to="/hairEssentialOil">Essential Oil For Hair</Link>
                                    </div>
                                </Link>
                            </li>
                            <li className=' relative uppercase mx-3 text-green-700 font-bold text-base hover:underline hover:underline-offset-4 hover:text-black hover:decoration-black hover:cursor-pointer' onMouseEnter={() => showTheSubmenuOnHoverFunc(1)}
                                onMouseLeave={() => showTheSubmenuOnHoverFunc(1)}><Link to="/skin">
                                    SkinCare
                                    <div className={`${showTheSubmenuOnHover[1] ? 'border-t absolute w-40 top-[25px] flex flex-col bg-white text-black z-50' : 'hidden'}`}>
                                        <Link className='           mx-2 py-2 font-normal hover:underline hover:underline-offset-4' to="/facePowder">fack powder</Link>
                                        <Link className='border-t mx-2 py-2 font-normal hover:underline hover:underline-offset-4' to="/facePack"><span>face pack</span></Link>
                                        <Link className='border-t mx-2 py-2 font-normal hover:underline hover:underline-offset-4' to="/faceSheet">face sheet</Link>
                                        <Link className='border-t mx-2 py-2 font-normal hover:underline hover:underline-offset-4' to="/faceEssentialOil">Essential Oil </Link>
                                    </div>
                                </Link>
                            </li>
                            <li className='relative uppercase mx-3 text-green-700 font-bold text-base hover:underline hover:underline-offset-4 hover:text-black hover:decoration-black hover:cursor-pointer' onMouseEnter={() => showTheSubmenuOnHoverFunc(2)}
                                onMouseLeave={() => showTheSubmenuOnHoverFunc(2)}><Link to="/deals">
                                    Deals
                                    <div className={`${showTheSubmenuOnHover[2] ? 'border-t absolute w-40 ps-2 top-[25px] flex flex-col bg-white text-black z-50' : 'hidden'}`}>
                                        <Link className='    mx-2 py-2 font-normal hover:underline hover:underline-offset-4' to="/deals100">under 100</Link>
                                        <Link className=' border-t mx-2 py-2 font-normal hover:underline hover:underline-offset-4' to="/deals200">under 200</Link>
                                        <Link className=' border-t mx-2 py-2 font-normal hover:underline hover:underline-offset-4' to="/deals300">under 300</Link>
                                    </div>
                                </Link>
                            </li>
                            <li className='relative uppercase mx-3 text-green-700 font-bold text-base hover:underline hover:underline-offset-4 hover:text-black hover:decoration-black hover:cursor-pointer' onMouseEnter={() => showTheSubmenuOnHoverFunc(3)}
                                onMouseLeave={() => showTheSubmenuOnHoverFunc(3)}><Link to="/combopack">
                                    combopack
                                    <div className={`${showTheSubmenuOnHover[3] ? 'border-t absolute w-[15vw] text ps-2 top-[25px] flex flex-col bg-white text-black z-50' : 'hidden'}`}>
                                        <Link className='    mx-2 py-2 font-normal hover:underline hover:underline-offset-4' to="/combopackHairMask">Hair mask combo</Link>
                                        <Link className=' border-t mx-2 py-2 font-normal hover:underline hover:underline-offset-4' to="/combopackFaceCare">face mask combo</Link>
                                        <Link className=' border-t mx-2 py-2 font-normal hover:underline hover:underline-offset-4' to="/combopackHennaIndigo">Henna Indigo combo</Link>
                                        <Link className=' border-t mx-2 py-2 font-normal hover:underline hover:underline-offset-4' to="/combopackFaceSheet">face sheet combo</Link>
                                        <Link className=' border-t mx-2 py-2 font-normal hover:underline hover:underline-offset-4' to="/combopackEssentialOil">Esential Oil combo</Link>
                                    </div>
                                </Link>
                            </li>
                            <li className=' uppercase mx-3 text-green-700 font-bold text-base hover:underline hover:underline-offset-4 hover:text-black hover:decoration-black hover:cursor-pointer'><Link to="/newLaunches">new launches </Link></li>
                            <li className=' uppercase mx-3 text-green-700 font-bold text-base hover:underline hover:underline-offset-4 hover:text-black hover:decoration-black hover:cursor-pointer'><Link to="/">review </Link></li>
                            <li className=' uppercase mx-3 text-green-700 font-bold text-base hover:underline hover:underline-offset-4 hover:text-black hover:decoration-black hover:cursor-pointer'><Link to="/">result </Link></li>
                            <li className=' uppercase mx-3 text-green-700 font-bold text-base hover:underline hover:underline-offset-4 hover:text-black hover:decoration-black hover:cursor-pointer'><Link to="/">blog </Link></li>
                        </ul>
                    </div>

                    {/* menu  slidebar for the mobile */}

                    <div className={`${isOffcanvasOpen[0] ? 'translate-x-0' : 'translate-x-full hidden'} fixed  w-full xl:hidden bg-black/50 backdrop-blur-sm top-0 right-0 z-10`}>
                        <section className={`text-black bg-white absolute left-0 top-0 h-screen p-8 gap-8 z-50 flex flex-col overflow-y-auto w-56 ${isOffcanvasOpen[0] ? 'translate-x-0' : 'translate-x-full'} transition-all duration-500 ease-in-out`}>
                            <div className='flex justify-between items-center'>
                                <h2>Menu</h2>
                                <IoCloseOutline onClick={() => offcanvasOpenAndClose(0)} className=' mt-0 text-3xl cursor-pointer ' />
                            </div>
                            <Link onClick={() => offcanvasOpenAndClose(0)} to="/bestSellers">bestsellers</Link>
                            <Link onClick={() => offcanvasOpenAndClose(0)} to="/hair">haircare</Link>
                            <Link onClick={() => offcanvasOpenAndClose(0)} to="/skin">skincare</Link>
                            <Link onClick={() => offcanvasOpenAndClose(0)} to="/deals">deals </Link>
                            <Link onClick={() => offcanvasOpenAndClose(0)} to="/combopack">combopack </Link>
                            <Link onClick={() => offcanvasOpenAndClose(0)} to="/newLaunches">newlaunches </Link>
                            <Link onClick={() => offcanvasOpenAndClose(0)} to="/">review </Link>
                            <Link onClick={() => offcanvasOpenAndClose(0)} to="/">result </Link>
                            <Link onClick={() => offcanvasOpenAndClose(0)} to="/">blog </Link>
                        </section>
                    </div>
                    <div className={`${navbar ? '' : ' xl:hidden'} flex gap-7  `}>
                        <div className='cursor-pointer  '>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 bi bi-search " viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                        </div>

                        <div onClick={() => { offcanvasOpenAndClose(1) }} className='cursor-pointer  '>
                            {
                                userData !== null ? (
                                    <p className=' text-center text-xl border-2 px-2 py-1 rounded-full bg-gray-600 text-white'>{userData.msg.username[0]}</p>

                                ) : (
                                    <GoPerson className='border border-black rounded-full w-6 h-6  ' />
                                )
                            }
                        </div>
                        <Link to={"/addtocart"}>
                            <div className='cursor-pointer relative '>
                                <LiaShoppingBagSolid className=' w-6 h-6  ' />
                                <p className=" text-xs p-2 font-semibold  absolute -top-2 -right-2 rounded-full bg-green-800 flex justify-center items-center text-white w-5  h-5"> {totalAddproduct} </p>
                            </div>
                        </Link>


                    </div>
                </div>

            </nav >

        </>
    )
}
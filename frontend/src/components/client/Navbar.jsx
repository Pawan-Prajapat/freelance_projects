import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import flag from '../../img/India.webp';
import logo from '../../img/henna_logo2.jpg';
import { LiaShoppingBagSolid } from "react-icons/lia";
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import Login from "./login";
import Search from "./search";
import { GoPerson } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../features/tokenFeatureSlice";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { GoChevronDown } from "react-icons/go";
import { FaFireFlameCurved } from "react-icons/fa6";

import axios from 'axios';
const serverUrl = import.meta.env.VITE_SERVER_URL;


export default function Navbar() {

    // for the login use show the vlaue 

    const dispatch = useDispatch();
    const token = useSelector((state) => state.TokenReducer.token || "");
    useEffect(() => {
        if (token) {
            dispatch(fetchUserData());
        }
    }, [token, dispatch]);


    const [textParts, setTextParts] = useState([]);
    useEffect(() => {
        // Fetch the text from your API
        axios.get(`${serverUrl}/api/marquee`)
            .then(response => {
                const textWithIcon = response.data.topSlide;
                // Split the text by the [ICON] placeholder
                const parts = textWithIcon.split('[Icon]');
                setTextParts(parts);
            })
            .catch(error => console.error(error));
    }, []);

    const userData = useSelector(state => state.TokenReducer.userData);

    const location = useLocation();

    const [navbar, setNavbar] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
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

    const [isOffcanvasOpen, setOffcanvas] = useState([false, false, false, false]);

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
    const [showTheSubmenuOnHover, setShowTheSubmenuOnHover] = useState(null);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [showSearchResults2, setShowSearchResults2] = useState(false);
    const [activeLink, setActiveLink] = useState(null);
    const showTheSubmenuOnHoverFunc = (index) => {
        setShowTheSubmenuOnHover(prevIndex => prevIndex === index ? null : index);
    }
    const showTheActiveLinkFunc = (index) => {
        setActiveLink(prevIndex => prevIndex === index ? index : index);
    }

    // show the how many product in add to cart
    const howManyProductAdd = useSelector(state => state.AddToCartReducer.addToCart);
    let totalAddproduct = 0;
    howManyProductAdd.map((product) => {
        totalAddproduct += product.qty;
    })

    // hide the  navbar from the admin
    if (location.pathname === '/admin' || location.pathname.startsWith('/admin')) {
        return null;
    }

    // carousel responsive

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 1024 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 1024, min: 800 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 800, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    // Handle the keyword passed from the Search component

    const handleSearchKeyword = (event) => {
        const keyword = event.target.value;
        setSearchKeyword(keyword);
    };

    const handleFocus = () => {
        setShowSearchResults(true);
    };
    const mobile_search_handle = () => {
        setShowSearchResults2(!showSearchResults2);
    }
    const check_search_result = () => {
        setShowSearchResults(!showSearchResults);
    }

    return (
        <>
            {/* login offcanvas  */}
            <Login openAndClose={offcanvasOpenAndClose} showOrNot={checkIsOffcanvasOpenForLogin} />
            <div className='flex h-14 overflow-hidden gap-96 group bg-[#222621] text-white'>
                <div className=' flex flex-shrink-0 items-center justify-around whitespace-nowrap w-full animate-slide gap-4 group-hover:paused'>
                    <div className='inline-flex items-center justify-center'>
                        {textParts.map((part, index) => (
                            <React.Fragment key={index}>
                                <p>{part}</p>
                                {/* Insert the icon between text parts, except after the last part */}
                                {index < textParts.length - 1 && <FaFireFlameCurved className='mx-3 h-5 w-5' />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className=' flex flex-shrink-0 items-center justify-around whitespace-nowrap w-full animate-slide gap-4 group-hover:paused'>
                    <div className='inline-flex items-center justify-center'>
                        {textParts.map((part, index) => (
                            <React.Fragment key={index}>
                                <p>{part}</p>
                                {/* Insert the icon between text parts, except after the last part */}
                                {index < textParts.length - 1 && <FaFireFlameCurved className='mx-3 h-5 w-5' />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
            <nav className={`${navbar ? 'h-[50px]  pb-10 pt-3   bg-white   fixed top-0  ' : '  '} shadow-md xl:shadow-none w-full z-[1001] `}>
                <div className={`${navbar ? 'hidden' : 'w-full h-0 xl:h-[88px] items-center justify-between px-4  bg-[#f8f8f8] hidden xl:flex'}`}>

                    <div className='flex'>
                        <LazyLoadImage src={flag} alt="" className=' w-6 me-1 ' />
                        <p>IN</p>
                    </div>
                    <div className='w-[200px] h-[70px] overflow-y-clip'><Link to="/"><LazyLoadImage src={logo} alt="" className=' w-[190px] h-[70px] ' /></Link></div>

                    <div className='flex items-center w-72 justify-between'>
                        <div className="relative mt-2 rounded-md shadow-sm mx-2 ">
                            <input
                                type="text"
                                name="search"
                                id="search"
                                className="block rounded-md py-1.5 border-b-2 w-[132px] pl-1 pr-10 text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                placeholder="Search"
                                onFocus={handleFocus}
                                onChange={handleSearchKeyword}
                            />

                            {showSearchResults && (
                                <div className={`${showSearchResults ? '' : 'hidden'}`}>
                                    <Search
                                        keyword={searchKeyword}
                                        openAndClose={check_search_result}
                                    />
                                </div>
                            )}
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
                <div className={`${navbar ? 'flex justify-between items-center bg-white shadow-md' : 'flex items-center justify-between xl:justify-center '} py-2  px-4  w-full`}>
                    <div className={`${navbar ? '' : '  xl:hidden'} flex gap-11`}>
                        <div className='xl:hidden'>
                            <FiMenu onClick={() => offcanvasOpenAndClose(0)} className=' w-6 h-6 cursor-pointer' />
                        </div>
                        <Link to="/"><LazyLoadImage src={logo} alt="" className='w-[100px] h-[50px]' /></Link>
                    </div>
                    {/* this is for desktop  */}
                    <div >
                        <ul className={`${navbar ? ' flex flex-wrap justify-center h-auto py-4 ' : ' items-center  justify-center  '} hidden z-30  xl:flex   `}>
                            <li className={`nav ${activeLink === 0 ? 'navConditionClass' : ''}`} onClick={() => showTheActiveLinkFunc(0)}><Link to="/bestSellers">bestsellers</Link></li>
                            <li className={`relative nav ${activeLink === 1 ? 'navConditionClass' : ''} `} onMouseEnter={() => showTheSubmenuOnHoverFunc(0)}
                                onClick={() => showTheActiveLinkFunc(1)}
                                onMouseLeave={() => showTheSubmenuOnHoverFunc(null)}><Link to="/henna/all_henna">
                                    HENNA
                                    <div className={`${showTheSubmenuOnHover === 0 ? 'border-t absolute shadow-lg rounded-md w-52 top-[40px] left-1 flex flex-col bg-white z-50 text-black' : 'hidden'}`}>
                                        <Link className='navSubMenuLink' to="/henna/baq_henna">BAQ HENNA POWDER</Link>
                                        <Link className='navSubMenuLink ' to="/henna/herbal_henna"><span>HERBAL HENNA POWDER</span></Link>
                                        <Link className='navSubMenuLink ' to="/henna/natural_henna">NATURAL HENNA POWDER</Link>
                                        <Link className='navSubMenuLink ' to="/henna/henna_based_hair_color">HENNA BASED HAIR COLOUR</Link>
                                    </div>
                                </Link>
                            </li>
                            <li className={`relative nav ${activeLink === 2 ? 'navConditionClass' : ''} `} onClick={() => showTheActiveLinkFunc(2)} onMouseEnter={() => showTheSubmenuOnHoverFunc(1)}

                                onMouseLeave={() => showTheSubmenuOnHoverFunc(null)}><Link to="/essentialOil/all_oil">
                                    ESSENTIAL OIL
                                    <div className={`${showTheSubmenuOnHover === 1 ? 'border-t shadow-lg rounded-md absolute w-40 top-[40px] flex flex-col bg-white text-black z-50' : 'hidden'}`}>
                                        <Link className='navSubMenuLink' to="/essentialOil/eucalyptus_oil">EUCALYPTUS OIL</Link>
                                        <Link className='navSubMenuLink' to="/essentialOil/lavender_oil">LAVENDER OIL</Link>
                                        <Link className='navSubMenuLink' to="/essentialOil/tea_tree_oil">TEA TREE OIL</Link>
                                        <Link className='navSubMenuLink' to="/essentialOil/mehandi_oil">MEHANDI OIL</Link>
                                        <Link className='navSubMenuLink' to="/essentialOil/clove_oil">CLOVE OIL</Link>
                                        <Link className='navSubMenuLink' to="/essentialOil/cajeput_oil">CAJEPUT OIL</Link>
                                    </div>
                                </Link>
                            </li>
                            <li className={`nav ${activeLink === 3 ? 'navConditionClass' : ''}`} onClick={() => showTheActiveLinkFunc(3)}><Link to="/face_care">FACE CARE </Link></li>
                            <li className={`nav ${activeLink === 4 ? 'navConditionClass' : ''}`} onClick={() => showTheActiveLinkFunc(4)}><Link to="/hair_care">Hair CARE </Link></li>

                            <li className={`relative nav ${activeLink === 5 ? ' navConditionClass' : ''} `} onClick={() => showTheActiveLinkFunc(5)} onMouseEnter={() => showTheSubmenuOnHoverFunc(2)}
                                onMouseLeave={() => showTheSubmenuOnHoverFunc(null)}><Link to="/combopack/all_combo">
                                    combopack
                                    <div className={`${showTheSubmenuOnHover === 2 ? 'border-t shadow-lg rounded-md absolute w-[15vw] text ps-2 top-[40px] flex flex-col bg-white text-black z-50' : 'hidden'}`}>
                                        <Link className='navSubMenuLink' to="/combopack/henna_and_oil_combo">HENNA AND OIL COMBO</Link>
                                        <Link className='navSubMenuLink' to="/combopack/essential_oil_combo">ESSENTIAL OIL COMBO</Link>
                                        <Link className='navSubMenuLink' to="/combopack/henna_indigo_combo">HENNA INDIGO COMBO</Link>
                                        <Link className='navSubMenuLink' to="/combopack/face_care_combo">FACE CARE COMBO</Link>
                                        <Link className='navSubMenuLink' to="/combopack/skin_care_combo">SKIN CARE COMBO</Link>
                                    </div>
                                </Link>
                            </li>
                            <li className={`nav ${activeLink === 6 ? 'navConditionClass' : ''}`} onClick={() => showTheActiveLinkFunc(6)}><Link to="/About">about us </Link></li>
                            <li className={`nav ${activeLink === 7 ? 'navConditionClass' : ''}`} onClick={() => showTheActiveLinkFunc(7)}><Link to="/">results </Link></li>
                            <li className={`nav ${activeLink === 8 ? 'navConditionClass' : ''}`} onClick={() => showTheActiveLinkFunc(8)}><Link to="/">blog </Link></li>
                            <li className='px-3 py-3 font-medium text-center text-white bg-lime-800 rounded-full' ><Link to="/orderTracking">Track your order </Link></li>
                        </ul>
                    </div>

                    {/* menu  slidebar for the mobile */}

                    <div className={`${isOffcanvasOpen[0] ? 'translate-x-0' : 'translate-x-full hidden'} fixed  w-full xl:hidden bg-black/50 backdrop-blur-sm top-0 right-0 z-10`}>
                        <section className={`text-black bg-white absolute left-0 top-0 h-screen p-8 gap-1 z-50 flex flex-col overflow-y-auto w-56 ${isOffcanvasOpen[0] ? 'translate-x-0' : 'translate-x-full'} transition-all duration-500 ease-in-out`}>
                            <div className='flex justify-end items-center '>
                                <IoCloseOutline onClick={() => offcanvasOpenAndClose(0)} className=' mt-0 text-3xl cursor-pointer ' />
                            </div>
                            <Link onClick={() => { offcanvasOpenAndClose(0), showTheActiveLinkFunc(9) }} className={`font-medium uppercase px-2 py-[10px] ${activeLink === 9 ? 'navConditionClass' : ''}`} to="/bestSellers">bestsellers</Link>
                            <p className={`font-medium uppercase `} onClick={() => showTheActiveLinkFunc(10)} onMouseEnter={() => showTheSubmenuOnHoverFunc(0)}
                                onMouseLeave={() => showTheSubmenuOnHoverFunc(null)}>
                                <div className={` flex justify-between px-2 py-[10px] ${activeLink === 10 ? 'navConditionClass' : ''}`}>
                                    HENNA <GoChevronDown />
                                </div>
                                <div className={`${showTheSubmenuOnHover === 0 ? '  flex flex-col bg-white z-50 text-black' : 'hidden'}`}>
                                    <Link onClick={() => offcanvasOpenAndClose(0)} className='mx-2 py-2 font-normal text-xs  ' to="/henna/all_henna">HENNA </Link>
                                    <Link onClick={() => offcanvasOpenAndClose(0)} className='mx-2 py-2 font-normal text-xs ' to="/henna/baq_henna"><span>HERBAL HENNA POWDER</span></Link>
                                    <Link onClick={() => offcanvasOpenAndClose(0)} className='mx-2 py-2 font-normal text-xs ' to="/henna/herbal_henna">NATURAL HENNA POWDER</Link>
                                    <Link onClick={() => offcanvasOpenAndClose(0)} className='mx-2 py-2 font-normal text-xs ' to="/henna/natural_henna">HENNA BASED HAIR COLOUR</Link>
                                    <Link onClick={() => offcanvasOpenAndClose(0)} className='mx-2 py-2 font-normal text-xs ' to="/henna/henna_based_hair_color">HENNA BASED HAIR COLOUR</Link>
                                </div>
                            </p>
                            <p className='uppercase  font-medium text-base' onClick={() => showTheActiveLinkFunc(11)} onMouseEnter={() => showTheSubmenuOnHoverFunc(1)}
                                onMouseLeave={() => showTheSubmenuOnHoverFunc(null)}>
                                <div className={` flex justify-between px-2 py-[10px] ${activeLink === 11 ? 'navConditionClass' : ''}`}>
                                    ESSENTIAL OIL <GoChevronDown />
                                </div>

                                <div className={`${showTheSubmenuOnHover === 1 ? '  flex flex-col bg-white text-black z-50' : 'hidden'}`}>
                                    <Link onClick={() => offcanvasOpenAndClose(0)} className='mx-2 py-2 font-normal text-xs' to="/essentialOil/all_oil">ESSENTIAL OIL</Link>
                                    <Link onClick={() => offcanvasOpenAndClose(0)} className='mx-2 py-2 font-normal text-xs' to="/essentialOil/eucalyptus_oil">EUCALYPTUS OIL</Link>
                                    <Link onClick={() => offcanvasOpenAndClose(0)} className='mx-2 py-2 font-normal text-xs' to="/essentialOil/lavender_oil">LAVENDER OIL</Link>
                                    <Link onClick={() => offcanvasOpenAndClose(0)} className='mx-2 py-2 font-normal text-xs' to="/essentialOil/tea_tree_oil">TEA TREE OIL</Link>
                                    <Link onClick={() => offcanvasOpenAndClose(0)} className='mx-2 py-2 font-normal text-xs' to="/essentialOil/mehandi_oil">MEHANDI OIL</Link>
                                    <Link onClick={() => offcanvasOpenAndClose(0)} className='mx-2 py-2 font-normal text-xs' to="/essentialOil/clove_oil">CLOVE OIL</Link>
                                    <Link onClick={() => offcanvasOpenAndClose(0)} className='mx-2 py-2 font-normal text-xs' to="/essentialOil/cajeput_oil">CAJEPUT OIL</Link>
                                </div>
                            </p>
                            <p className={`font-medium uppercase px-2 py-[10px] ${activeLink === 12 ? 'navConditionClass' : ''}`}><Link onClick={() => { offcanvasOpenAndClose(0), showTheActiveLinkFunc(12) }} to="/face_care">FACE CARE </Link></p>
                            <p className={`font-medium uppercase px-2 py-[10px] ${activeLink === 13 ? 'navConditionClass' : ''}`}><Link onClick={() => { offcanvasOpenAndClose(0), showTheActiveLinkFunc(13) }} to="/hair_care">Hair CARE </Link></p>

                            <p className=' uppercase  font-medium text-base' onMouseEnter={() => showTheSubmenuOnHoverFunc(2)}
                                onClick={() => showTheActiveLinkFunc(14)}
                                onMouseLeave={() => showTheSubmenuOnHoverFunc(null)}>
                                <div className={` flex justify-between px-2 py-[10px] ${activeLink === 14 ? 'navConditionClass' : ''}`}>
                                    combopack <GoChevronDown />
                                </div>

                                <div className={`${showTheSubmenuOnHover === 2 ? ' flex flex-col bg-white text-black z-50' : 'hidden'}`}>
                                    <Link onClick={() => offcanvasOpenAndClose(0)} className=' mx-2 py-2 font-normal text-xs' to="/combopack/all_combo"> COMBOPACK</Link>
                                    <Link onClick={() => offcanvasOpenAndClose(0)} className=' mx-2 py-2 font-normal text-xs' to="/combopack/henna_and_oil_combo">HENNA AND OIL COMBO</Link>
                                    <Link onClick={() => offcanvasOpenAndClose(0)} className=' mx-2 py-2 font-normal text-xs' to="/combopack/essential_oil_combo">ESSENTIAL OIL COMBO</Link>
                                    <Link onClick={() => offcanvasOpenAndClose(0)} className=' mx-2 py-2 font-normal text-xs' to="/combopack/henna_indigo_combo">HENNA INDIGO COMBO</Link>
                                    <Link onClick={() => offcanvasOpenAndClose(0)} className=' mx-2 py-2 font-normal text-xs' to="/combopack/face_care_combo">FACE CARE COMBO</Link>
                                    <Link onClick={() => offcanvasOpenAndClose(0)} className=' mx-2 py-2 font-normal text-xs' to="/combopack/skin_care_combo">SKIN CARE COMBO</Link>
                                </div>
                            </p>
                            <p className={`font-medium uppercase px-2 py-[10px] ${activeLink === 15 ? 'navConditionClass' : ''}`}><Link onClick={() => { offcanvasOpenAndClose(0), showTheActiveLinkFunc(15) }} to="/About">about us </Link></p>
                            <p className={`font-medium uppercase px-2 py-[10px] ${activeLink === 16 ? 'navConditionClass' : ''}`}><Link onClick={() => { offcanvasOpenAndClose(0), showTheActiveLinkFunc(16) }} to="/">results </Link></p>
                            <p className={`font-medium uppercase px-2 py-[10px] ${activeLink === 17 ? 'navConditionClass' : ''}`}><Link onClick={() => { offcanvasOpenAndClose(0), showTheActiveLinkFunc(17) }} to="/">blog </Link></p>
                            <p className='px-3 py-3 font-medium text-center text-white bg-lime-800 rounded-full' ><Link to="/">Trak your order </Link></p>
                        </section>
                    </div>
                    <div className={`${navbar ? '' : ' xl:hidden'} flex gap-7  `}>
                        <div onClick={() => setShowSearchResults2(!showSearchResults2)} className='cursor-pointer  '>
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

                {showSearchResults2 && (
                    <div className={`${showSearchResults2 ? '' : 'hidden'}`}>
                        <Search
                            showFull={true}
                            mobile_search_handle={mobile_search_handle}
                            openAndClose={mobile_search_handle}
                        />
                    </div>
                )}
            </nav >

        </>
    )
}
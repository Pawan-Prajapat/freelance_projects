import React, { useState, useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux';
import { Link,NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { IoIosStar } from "react-icons/io";
import { FaFire } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { GoShareAndroid } from "react-icons/go";
import { FaRegEye } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import { IoShieldHalfSharp } from "react-icons/io5";
import { BsChevronRight } from "react-icons/bs";
import { BsChevronLeft } from "react-icons/bs";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {addProductInCart} from "../../features/AddToCartSlice";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { fetchProducts } from "../../features/productsFileHairSlice.js";

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

function  productDetailWhole() {
    const dispatch = useDispatch();
    const myName = useSelector((state) => state.ProductHairReducer); 
    const param = useParams()
    let currentProduct =  myName.data.data.filter(element => element.subCategroies === param.id);

    useEffect(() => {
        dispatch(fetchProducts());
      }, [dispatch]);
    
      if(myName.data === null){
          return <h1>Loading........ </h1>
      }

    const [quantity, setQuantity] = useState(1);

    const handleMinusClick = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handlePlusClick = () => {
        setQuantity(quantity + 1);
    };

    // custorm dots by the images
    const CustomDot = ({ onClick, ...rest }) => {
        const {
            onMove,
            index,
            active,
            carouselState: { currentSlide, deviceType }
        } = rest;
        const carouselItems = [
            <LazyLoadImage src="/images/Hennakart/Hennakart Face Care-01.jpg" alt="" className=' lg:h-[181px] lg:w-[181px] h-[70px] w-[70px]  ' />,
            <LazyLoadImage src="/images/Hennakart/Hennakart Face Care-02.jpg" alt="" className=' lg:h-[181px] lg:w-[181px] h-[70px] w-[70px]  ' />,
            <LazyLoadImage src="/images/Hennakart/Hennakart Face Care-03.jpg" alt="" className=' lg:h-[181px] lg:w-[181px] h-[70px] w-[70px]  ' />];
        // onMove means if dragging or swiping in progress.
        // active is provided by this lib for checking if the item is active or not.
        return (
            <button
                className={`${active ? "active opacity-60" : "inactive"} mx-1 `}
                onClick={() => onClick()}
            >
                {React.Children.toArray(carouselItems)[index]}
            </button>
        );
    };


    // custorm left right button 
    const CustomRightArrow = ({ onClick, ...rest }) => {
        const {
            onMove,
            carouselState: { currentSlide, deviceType }
        } = rest;
        // onMove means if dragging or swiping in progress.
        return <button onClick={() => onClick()} className='  absolute right-0 lg:bottom-20 bottom-3 z-10'  > <BsChevronRight className=' cursor-pointer h-10 w-8' />
        </button>;

    };
    const CustomLeftArrow = ({ onClick, ...rest }) => {
        const {
            onMove,
            carouselState: { currentSlide, deviceType }
        } = rest;
        // onMove means if dragging or swiping in progress.
        return <button onClick={() => onClick()} className='    absolute left-0 lg:bottom-20 bottom-3 z-10'  > <BsChevronLeft className='cursor-pointer  h-10 w-8' />
        </button>;

    };


    // when uesr click then page show on the top every time
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])



    const handleAddToCart =(product) =>{
        dispatch(addProductInCart(product));
    }

    return (

        <>
            <div className='flex lg:my-10 flex-col  lg:flex-row'>
                <div className=' lg:w-[60%] lg:pe-6 lg:ps-14 ps-0 pe-0 w-full  '>
                    <div className="pic w-full md:w-[100%] xl:w-[730.08] px-2 sm:px-5 lg:px-10    gap-y-10 flex ">
                        <Carousel responsive={responsive} infinite={true} showDots customDot={<CustomDot />} customRightArrow={<CustomRightArrow />} customLeftArrow={<CustomLeftArrow />}
                            className='w-full h-[600px] lg:h-auto ' >
                            <div className='w-full lg:h-[900px] h-auto'>
                                <LazyLoadImage src="/images/Hennakart/Hennakart Face Care-01.jpg" alt="" className=' lg:h-[631px] h-[350px]   ' />
                            </div>
                            <div className='w-full'>
                                <LazyLoadImage src="/images/Hennakart/Hennakart Face Care-02.jpg" alt="" className=' lg:h-[631px] h-[350px]' />
                            </div>
                            <div className='w-full '>
                                <LazyLoadImage src="/images/Hennakart/Hennakart Face Care-03.jpg" alt="" className=' lg:h-[631px] h-[350px] ' />
                            </div>
                        </Carousel>
                    </div>
                </div>
                <div className=' lg:pe-24 px-4 mt-8 lg:mt-0 lg:w-[40%] flex items-center flex-col '>
                    <div className=' w-full'>
                        <h1 className=' capitalize lg:text-[26px] text-xl font-pawan font-semibold text-green-700 '>natural indigo powder for hair color 1 kg pack</h1>
                    </div>
                    <div className='flex justify-between flex-col gap-3 lg:gap-0 lg:flex-row w-full mt-3'>
                        <div className='flex items-center gap-2'>
                            <p className='flex text-gray-200 gap-1'>
                                {
                                    Array.from({ length: 5 }, (_, i) => (
                                        <IoIosStar key={i} />
                                    ))
                                }
                            </p>
                            <span className=' text-gray-400'>No Review</span>
                        </div>
                        <div className='flex items-center gap-2 text-red-400 font-semibold'>
                            <p><FaFire /></p>
                            <span>15 sold in last 15 hours</span>
                        </div>
                    </div>
                    <div className='w-full text-gray-500 mt-3 '>
                        <p>{currentProduct.productDetailDescription}</p>
                    </div>
                    <div className='w-full text-gray-500 mt-3 '>
                        <p>Vendor : Yummi <br /> Availability : In Stock <br /> Product Type : Beauty</p>
                        <p className='mt-3 font-bold text-black text-xl'>Rs. 650.00</p>
                    </div>
                    <div className='flex flex-col w-full mt-4'>
                        <div>
                            <label htmlFor="qyt">Quantity : </label>
                            <div className="flex items-center relative border border-gray-300 w-[120px] py-6 mt-2">
                                <button className=" font-bold py-3  px-4 rounded-l absolute -left-2" onClick={handleMinusClick}>
                                    <FaMinus />
                                </button>
                                <input id='qyt' type="number" className=" focus:outline-none  text-gray-700 py-3 w-[50px] bg-transparent absolute left-1/2  " value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))} />
                                <button className=" text-gray-700 font-bold py-2 px-4 rounded-r absolute -right-2 " onClick={handlePlusClick}>
                                    <FaPlus />

                                </button>
                            </div>
                            <p className='mt-2 text-gray-500 '>Subtotal : <span className='text-black font-semibold text-lg'>Rs. {currentProduct.price}</span></p>
                        </div>

                    </div>

                    <div className='w-full'>
                        <div className='flex items-center justify-between '>
                            <NavLink to={"/addtocart"} className={"w-3/4"} onClick={()=>handleAddToCart(currentProduct)}>
                                <button className=' w-full text-base uppercase hover:border-2 hover:border-black  py-[12px] mt-3 font-bold bg-[#4b7422] shadow-[5px_6px_rgb(166,222,205,1)] text-blue-50  hover:bg-white hover:text-black hover:shadow-black hover:antialiased' > add to cart</button>
                            </NavLink>
                            <CiHeart className=' border border-gray-500 rounded-full p-2 h-10 w-10 lg:h-14 lg:w-14 cursor-pointer' />
                            <GoShareAndroid className='h-7 w-7 cursor-pointer' />
                        </div>
                        <div className=' text-center  text-base uppercase hover:border-none border-2 border-gray-600  py-[12px]  font-bold  shadow-[5px_6px_rgb(166,222,205,1)] hover:text-blue-50  bg-white hover:bg-black text-black  w-full  mt-10'>
                            <Link to={`/paymentDetailSummary/${param.id}`}  > Buy it Now</Link>
                        </div>
                    </div>

                    <div className="w-full flex items-center mt-10 gap-5">
                        <FaRegEye className='w-5 h-5' />
                        <p className='text-gray-500'> 165 customers are viewing  this product </p>
                    </div>
                    <div className="w-full mt-3">
                        <div className='flex items-end gap-3'>
                            <FaTruckFast className='w-7 h-7 ' />
                            <p className='text-green-700 mt-3 font-pawan font-semibold'>Free Shipping</p>
                            <FaQuestionCircle className='w-5 h-5 text-gray-300' />
                        </div>
                        <p className='text-gray-500   mt-2  '>Free standard shipping on all orders </p>
                        <p className='text-gray-500   mt-2  '>Estimated to be delivered on : 6-7 Days</p>
                    </div>
                    <div className="w-full">
                        <div className='flex items-end gap-3 mt-3'>
                            <IoShieldHalfSharp className='w-6 h-6 ' />
                            <p className='text-green-700 mt-3 font-pawan font-semibold'>Free Returns</p>
                            <FaQuestionCircle className='w-5 h-5 text-gray-300' />
                        </div>
                        <p className='text-gray-500   mt-2  '> Learn More. </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default productDetailWhole
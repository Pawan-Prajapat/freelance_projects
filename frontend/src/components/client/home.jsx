
import React, { useState, useEffect } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link, NavLink } from 'react-router-dom';
import { addProductInCart } from "../../features/AddToCartSlice";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../features/productsFileHairSlice.js";
const serverUrl = import.meta.env.VITE_SERVER_URL;

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 1024 },
        items: 4
    },
    desktop: {
        breakpoint: { max: 1024, min: 800 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 800, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
const responsiveForLove = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 1024 },
        items: 3
    },
    desktop: {
        breakpoint: { max: 1024, min: 800 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 800, min: 464 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
const responsiveVerifyLogo = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 1024 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 1024, min: 800 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 800, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
const responsiveForBanner = {
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





function Home() {
    const dispatch = useDispatch();
    const myName = useSelector((state) => state.ProductHairReducer);
    // for get the products from the store 
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    let records;
    let recordsForBestSelling , recordsForTrend;
    if (myName.data !== null) {
        const recordsFace = myName.data.data.filter(element => element.categroies === "face").slice(0, 2);
        const recordsHair = myName.data.data.filter(element => element.categroies === "hair").slice(0, 2);
        records = recordsFace.concat(recordsHair) ;
        recordsForBestSelling = myName.data.data.filter(element => element.categroies === "hair").slice(0, 4);
        recordsForTrend = myName.data.data.filter(element => element.categroies === "face").slice(0, 4);
        
    }
    const images = [
        { url: "/images/Hennakart/Hennakart-01.jpg", name: "Hennas", description: "Try our wide range of natural hair care products, 100% Pure, Vegan and Cruelty free", urlLink: "/" },
        { url: "/images/Hennakart/Hennakart-02.jpg", name: "Hair Care", description: "Try our wide range of natural hair care products, 100% Pure, Vegan and Cruelty free", urlLink: "/hair" },
        { url: "/images/Hennakart/Hennakart-03.jpg", name: "Skin Care", description: "Try our wide range of natural hair care products, 100% Pure, Vegan and Cruelty free", urlLink: "/face" },
        { url: "/images/Hennakart/Hennakart-04.jpg", name: "Face Care", description: "Try our wide range of natural hair care products, 100% Pure, Vegan and Cruelty free", urlLink: "/" }
    ]


    const handleAddToCart = (product) => {
        dispatch(addProductInCart(product));
    }


    // trend 
    const [whatNewInHennaKart, setWhatNewInHennaKart] = useState([true, false, false]);

    const getWhatNew = (which) => {
        setWhatNewInHennaKart(newArray => newArray.map((value, index) => index === which));
    };

    return (
        <React.Fragment>
            <Carousel responsive={responsiveForBanner} infinite={true} autoPlay={true} autoPlaySpeed={4000} removeArrowOnDeviceType={["tablet", "mobile", "desktop", "superLargeDesktop"]} >
                <div className='w-full'>
                    <LazyLoadImage src="/images/Hennakart/banner4.jpg" alt="" className=' ' />
                </div>
                <div className='w-full'>
                    <LazyLoadImage src="/images/Hennakart/banner1.jpg" alt="" className='w-full' />
                </div>
                <div className='w-full'>
                    <LazyLoadImage src="/images/Hennakart/banner2.jpg" alt="" className='w-full' />
                </div>
                <div className='w-full'>
                    <LazyLoadImage src="/images/Hennakart/banner3.jpg" alt="" className='w-full' />
                </div>
            </Carousel>
            <div className='mt-10'>
                <p className='  font-bold font-pawan text-3xl tracking-normal text-[#4b7422] text-center'>Featured On Hennakart</p>
            </div>
            <Carousel responsive={responsive} showDots={window.innerWidth < 1024 ? true : false} removeArrowOnDeviceType={["tablet", "mobile"]} >
                {
                    images.map((carts, i) => (
                        <div key={i} className={` w-auto mx-3 my-10`} >
                            <div className={`overflow-hidden `}>
                                <Link to={carts.urlLink}><LazyLoadImage src={carts.url} alt="" /></Link>
                            </div>
                            <div className={`mt-4 text-center`} >
                                <Link to={carts.urlLink}><h3 className=" text-[#4b7422] font-bold text-2xl  title-font mb-1">{carts.name}</h3></Link>
                                <p className="  text-lg mt-1">{carts.description}</p> <br /> <br />
                                <Link to={carts.urlLink} className="  uppercase  px-[45px]  py-[12px]  font-bold bg-[#7a7d79] border-2 border-[#282928] rounded-sm   text-blue-50 hover:opacity-45 hover:text-black  ">
                                    Shop now
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </Carousel>
            <div className='my-10'>
                <p className='  font-bold font-pawan text-2xl text-[#4b7422] text-center'>Our Best Selling Premium</p>
                <p className='  font-bold font-pawan text-2xl text-[#4b7422] text-center'>Quality Naturals Products</p>
            </div>
            {/* bad me shi se karnge optimize */}
            <div className={`w-full grid gap-2 lg:gap-4 px-3 ${window.innerWidth < 1024 ? window.innerWidth < 770 ? window.innerWidth < 320 ? 'grid-cols-1' : 'grid-cols-2' : 'grid-cols-3' : 'grid-cols-4'}`}>
                {
                    records ? (
                        records.map((data, i) => (
                            <div key={i} className='py-3 shadow-sm'  >
                                <Link className="overflow-hidden" to={{
                                    pathname: `/productDetail/${data.name}`
                                }} >
                                    <LazyLoadImage alt="ecommerce" className={`object-cover object-center block `} style={window.innerWidth < 1024 ? { height: `${window.innerWidth * 0.477}px`, width: `${window.innerWidth * 0.477}px` } : {}} src={`${serverUrl}/${data.image}`} />
                                </Link>
                                <div className="mt-4 text-center">
                                    <h3 className=" text-green-700 font-bold  title-font mb-1">Yumi mehendi</h3>
                                    <p className=" text-base">{data.name}</p>
                                    <p className="font-bold mt-1">Rs. {data.price}</p>
                                    <NavLink to="/addtocart" onClick={() => handleAddToCart(data)}>
                                        <button className="   mb-4 border border-gray-400 w-full py-[12px] mt-3 bg-gray-50 hover:bg-gray-100 font-semibold rounded-md text-black ">
                                            Add to cart
                                        </button>
                                    </NavLink>
                                </div>
                            </div>
                        ))) : (
                        <h1>Loading .........</h1>
                    )
                }
            </div>
            <Carousel className='mt-10 lg:mt-20 lg:h-[500px]' responsive={responsiveForBanner} infinite={true} autoPlay={true} autoPlaySpeed={2000}  >
                <div className='w-full'>
                    <LazyLoadImage src="/images/Hennakart/banner4.jpg" alt=""  height={100} />
                </div>
                <div className='w-full'>
                    <LazyLoadImage src="/images/Hennakart/banner1.jpg" alt="" height={100}  />
                </div>
                <div className='w-full'>
                    <LazyLoadImage src="/images/Hennakart/hair.jpg" alt="" height={100}/>
                </div>
            </Carousel>
            <div className='my-10'>
                <p className='  font-bold font-pawan text-[28px] text-[#4b7422] text-center capitalize'>What's New in hennakart store</p>

            </div>
            <div className='w-full flex justify-center'>
                <div className='flex  lg:w-1/2 w-full px-3 lg:px-14 justify-between text-lg lg:text-2xl font-bold font-pawan tracking-normal lg:tracking-wide text-gray-600 mb-4'>
                    <button className={`${whatNewInHennaKart[0] ? '   text-black border-b-[3px] border-black pb-2 ' : 'hover:text-black'} `} onClick={() => getWhatNew(0)}>Best Selling</button>
                    <button className={`${whatNewInHennaKart[1] ? '   text-black border-b-[3px] border-black pb-2 ' : 'hover:text-black'} `} onClick={() => getWhatNew(1)}>Trend Now</button>
                    <button className={`${whatNewInHennaKart[2] ? '   text-black border-b-[3px] border-black pb-2 ' : 'hover:text-black'} `} onClick={() => getWhatNew(2)}> Most Viewed</button>
                </div>
            </div>
            <div className=' flex flex-col'>
                <div className={`${whatNewInHennaKart[0] ? 'visible' : 'hidden'} w-full grid gap-2 lg:gap-4 px-3 ${window.innerWidth < 1024 ? window.innerWidth < 770 ? window.innerWidth < 320 ? 'grid-cols-1' : 'grid-cols-2' : 'grid-cols-3' : 'grid-cols-4'}`}>
                    {
                        records ? (
                            records.map((data, i) => (
                                <div key={i} className='py-3'  >
                                    <Link className="overflow-hidden" to={{
                                        pathname: `/productDetail/${data.subcategories}`
                                    }} >
                                        <LazyLoadImage alt="ecommerce" className={`object-cover object-center block `} style={window.innerWidth < 1024 ? { height: `${window.innerWidth * 0.477}px`, width: `${window.innerWidth * 0.477}px` } : {}} src={`${serverUrl}/${data.image}`} />
                                    </Link>
                                    <div className="mt-4 text-center">
                                        <h3 className=" text-green-700 font-bold  title-font mb-1">Yumi mehendi</h3>
                                        <p className=" text-base">{data.name}</p>
                                        <p className="font-bold mt-1">Rs. {data.price}</p>
                                        <NavLink to="/addtocart" onClick={() => handleAddToCart(data)}>
                                            <button className="   mb-4 border border-gray-400 w-full py-[12px] mt-3 bg-gray-50 hover:bg-gray-100 font-semibold rounded-md text-black ">
                                                Add To Cart
                                            </button>
                                        </NavLink>
                                    </div>
                                </div>
                            ))) : (
                            <h1>Loading ...............</h1>
                        )
                    }
                </div>
                <div className={`${whatNewInHennaKart[1] ? 'visible' : 'hidden'} w-full grid gap-2 lg:gap-4 px-3 ${window.innerWidth < 1024 ? window.innerWidth < 770 ? window.innerWidth < 320 ? 'grid-cols-1' : 'grid-cols-2' : 'grid-cols-3' : 'grid-cols-4'}`}>
                    {
                        recordsForBestSelling?(
                        recordsForBestSelling.map((data, i) => (
                            <div key={i} className='py-3'  >
                                <Link className="overflow-hidden" to={{
                                    pathname: `/productDetail/${data.name}`
                                }} >
                                    <LazyLoadImage alt="ecommerce" className={`object-cover object-center block `} style={window.innerWidth < 1024 ? { height: `${window.innerWidth * 0.477}px`, width: `${window.innerWidth * 0.477}px` } : {}} src={`${serverUrl}/${data.image}`} />
                                </Link>
                                <div className="mt-4 text-center">
                                    <h3 className=" text-green-700 font-bold  title-font mb-1">Yumi mehendi</h3>
                                    <p className=" text-base">{data.name}</p>
                                    <p className="font-bold mt-1">Rs. {data.price}</p>
                                    <NavLink to="/addtocart" onClick={() => handleAddToCart(data)}>
                                        <button className="   mb-4 border border-gray-400 w-full py-[12px] mt-3 bg-gray-50 hover:bg-gray-100 font-semibold rounded-md text-black ">
                                            Add To Cart
                                        </button>
                                    </NavLink>
                                </div>
                            </div>
                        ))):(
                            <h1>Loading .........</h1>
                        )
                    }
                </div>
                <div className={`${whatNewInHennaKart[2] ? 'visible' : 'hidden'} w-full grid gap-2 lg:gap-4 px-3 ${window.innerWidth < 1024 ? window.innerWidth < 770 ? window.innerWidth < 320 ? 'grid-cols-1' : 'grid-cols-2' : 'grid-cols-3' : 'grid-cols-4'}`}>
                    {
                        recordsForTrend?(
                        recordsForTrend.map((data, i) => (
                            <div key={i} className='py-3'  >
                                <Link className="overflow-hidden" to={{
                                    pathname: `/productDetail/${data.name}`
                                }} >
                                    <LazyLoadImage alt="ecommerce" className={`object-cover object-center block `} style={window.innerWidth < 1024 ? { height: `${window.innerWidth * 0.477}px`, width: `${window.innerWidth * 0.477}px` } : {}} src={`${serverUrl}/${data.image}`} />
                                </Link>
                                <div className="mt-4 text-center">
                                    <h3 className=" text-green-700 font-bold  title-font mb-1">Yumi mehendi</h3>
                                    <p className=" text-base">{data.name}</p>
                                    <p className="font-bold mt-1">Rs. {data.price}</p>
                                    <NavLink to="/addtocart" onClick={() => handleAddToCart(data)}>
                                        <button className="   mb-4 border border-gray-400 w-full py-[12px] mt-3 bg-gray-50 hover:bg-gray-100 font-semibold rounded-md text-black ">
                                            Add To Cart
                                        </button>
                                    </NavLink>
                                </div>
                            </div>
                        ))) : (
                            <h1>Loading .........</h1>
                        )
                    }
                </div>
            </div>

            <Carousel className='mt-10 lg:mt-20 lg:h-[500px]' responsive={responsiveForBanner} infinite={true} autoPlay={true} autoPlaySpeed={8000} removeArrowOnDeviceType={["tablet", "mobile", "desktop", "superLargeDesktop"]} >
                <div className='w-full'>
                    <LazyLoadImage src="/images/Hennakart/Hennakart Face Care-01.jpg" alt="" className=' ' />
                </div>

            </Carousel>

            <div className='my-20 flex items-center flex-col'>
                <p className='  font-bold mb-3 font-pawan text-[28px] text-[#4b7422] text-center capitalize'>Why hennakart</p>
                <p className='text-center text-base lg:w-[63%] w-full px-5 tracking-wide'>HENNAKART INDIA is a Recognized Henna Manufacturers in churu, supplier and exporter of Henna, henna products, Hair care Herbs & Personal care herbs, We are a well-established Company with a state of an art Manufacturing facility with ISO 9001:2015 Certified unit.</p>
            </div>

            <Carousel responsive={responsiveVerifyLogo} className=' bg-gray-100 py-5 lg:py-16 border-t'>
                <div className='w-full px-5'>
                    <LazyLoadImage src="/images/logo/1.avif" alt="" className=' ' />
                </div>
                <div className='w-full px-5'>
                    <LazyLoadImage src="/images/logo/2.png" alt="" className='w-full' />
                </div>
                <div className='w-full px-5'>
                    <LazyLoadImage src="/images/logo/3.png" alt="" className='w-full' />
                </div>
                <div className='w-full px-5'>
                    <LazyLoadImage src="/images/logo/4.avif" alt="" className=' ' />
                </div>
                <div className='w-full px-5'>
                    <LazyLoadImage src="/images/logo/5.avif" alt="" className='w-full' />
                </div>
                <div className='w-full px-5'>
                    <LazyLoadImage src="/images/logo/6.avif" alt="" className='w-full' />
                </div>
            </Carousel>

            <div className=' bg-blue-50  h-[450px] text-center mt-10 pt-5 px-3 lg:px-20'>
                <div>
                    <p className='text-green-800 text-2xl lg:text-3xl font-bold font-pawan capitalize mb-10'>we love hennakart because of</p>
                </div>
                <Carousel responsive={responsiveForLove} >
                    <div className='  px-5 h-[300px] bg-white shadow-sm w-full lg:w-5/6 pt-5'>
                        <div className='flex justify-center pb-10 '>
                            <LazyLoadImage src="/images/logo/busLove.png" height={50} width={70} alt="" />
                        </div>
                        <div>
                            <p className=' text-green-800 mb-3 text-lg font-semibold'>Always Free Shipping</p>
                            <p>We always provide  free shipping all over India on all oreder with no minimum
                                purchase and delivered products within 5-6 Days
                            </p>
                        </div>
                    </div>
                    <div className=' px-5 h-[300px] bg-white shadow-sm w-full lg:w-5/6 pt-5'>
                        <div className='flex justify-center pb-10'>
                            <LazyLoadImage src="/images/logo/heartLove.png" height={50} width={60} alt="" />
                        </div>
                        <div>
                            <p className=' text-green-800 mb-3 text-lg font-semibold'>Easy Free Returns</p>
                            <p>if you are not completely satisfied with your purchage for any reason or received
                                damaged product, you may return it to us.
                            </p>
                        </div>
                    </div>
                    <div className=' px-5 h-[300px] bg-white shadow-sm w-full lg:w-5/6 pt-5'>
                        <div className='flex justify-center pb-10'>
                            <LazyLoadImage src="/images/logo/StarLove.png" height={50} width={70} alt="" />
                        </div>
                        <div>
                            <p className=' text-green-800 mb-3 text-lg font-semibold'>Genuine Products</p>
                            <p>We always provides 100% original products to customer without mixing any chemical
                                or harmful ingredients.
                            </p>
                        </div>
                    </div>
                </Carousel>
            </div>
        </React.Fragment >
    )
}

export default Home
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FaFire, FaPlus, FaMinus, FaRegEye } from "react-icons/fa";
// import { CiHeart } from "react-icons/ci";
// import { GoShareAndroid } from "react-icons/go";
// import { FaQuestionCircle } from "react-icons/fa";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { addProductInCart, singleProduct } from "../../features/AddToCartSlice";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { fetchProducts } from "../../features/productsFileHairSlice.js";
import axios from 'axios';
import { SiWhatsapp } from "react-icons/si";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { FcOnlineSupport } from "react-icons/fc";
import best_price from '../../assets/best_price2.png'
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 1 },
    desktop: { breakpoint: { max: 1024, min: 800 }, items: 1 },
    tablet: { breakpoint: { max: 800, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
};

const responsive_related = {
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



function ProductDetailWhole() {
    const dispatch = useDispatch();
    const myName = useSelector((state) => state.ProductHairReducer);
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const [variant, setVariant] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [customerCount, setCustomerCount] = useState(165); // Initial value
    const [soldproduct, setSoldproduct] = useState(16); // Initial value


    useEffect(() => {
        const updateCustomerCount = () => {
            // Generate a random number between a range, e.g., 150 to 200
            const randomCount = Math.floor(Math.random() * (200 - 150 + 1)) + 150;
            const randomSold = Math.floor(Math.random() * (100 - 15 + 1)) + 15;
            setCustomerCount(randomCount);
            setSoldproduct(randomSold);
        };

        // Update customer count every 15 to 20 seconds
        const interval = setInterval(updateCustomerCount, Math.floor(Math.random() * (10000 - 5000)) + 5000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        const fetchVariant = async () => {
            try {
                const currentProduct_variant = myName.data?.data.find(element => element.slug === id);
                const res = await axios.get(`${serverUrl}/api/getVariant/${currentProduct_variant._id}`);
                const variants = res.data.variants;
                setVariant(variants);
                setSelectedVariant(variants[0]);  // Set the first variant as default
            } catch (error) {
                console.error("Error in fetching the variants of the product");
            }
        };
        fetchVariant();
    }, [id , myName.data]);

    if (!myName.data?.data) return <h1>Loading........ </h1>;

    const currentProduct = myName.data?.data.find(element => element.slug === id);
    if (!currentProduct) return <h1>Product not found</h1>;

    const multipleImages = [currentProduct.images];

    const handleMinusClick = () => quantity > 1 && setQuantity(quantity - 1);
    const handlePlusClick = () => quantity < selectedVariant?.qty && setQuantity(quantity + 1);

    const CustomDot = ({ onClick, index, active }) => (
        <button className={`${active ? "active opacity-60" : "inactive"} mx-1`} onClick={() => onClick()}>
            <LazyLoadImage src={`${multipleImages[0][index]}`} alt="" className='lg:h-[181px] lg:w-[181px] h-[70px] w-[70px]' />
        </button>
    );

    const CustomRightArrow = ({ onClick }) => (
        <button onClick={onClick} className='absolute right-0 lg:bottom-20 bottom-3 z-10'>
            <BsChevronRight className='cursor-pointer h-10 w-8' />
        </button>
    );

    const CustomLeftArrow = ({ onClick }) => (
        <button onClick={onClick} className='absolute left-0 lg:bottom-20 bottom-3 z-10'>
            <BsChevronLeft className='cursor-pointer h-10 w-8' />
        </button>
    );

    const handleVariantChange = (event) => {
        const selected = variant.find(v => v._id === event.target.value);
        setSelectedVariant(selected);
    };

    // this is for add the product detail in the single product in the redux state management
    const handleSingleProduct = (product) => {
        const productWithVariant = {
            ...product,
            selectedVariant,
            quantity
        };
        dispatch(singleProduct(productWithVariant))
    }

    // this for addto car the product detail
    const handleAddToCart = (product) => {
        const productWithVariant = {
            ...product,
            selectedVariant,
            quantity
        };
        dispatch(addProductInCart(productWithVariant));
    }

    const currentProduct_recommned = myName.data?.data.filter(element => currentProduct.recommend.includes(element._id));

    return (
        <>
            <div className='flex lg:my-10 flex-col lg:flex-row'>
                <div className='lg:w-[60%] lg:pe-6 lg:ps-14 ps-0 pe-0 w-full'>
                    <div className=" pic w-full md:w-[100%] xl:w-[730.08] px-2 sm:px-5 lg:px-10 gap-y-10 flex">
                        <Carousel responsive={responsive} infinite={true} showDots customDot={<CustomDot />} customRightArrow={<CustomRightArrow />} customLeftArrow={<CustomLeftArrow />}
                            className='w-full h-[450px] pt-5 pb-20 lg:h-auto '>
                            {multipleImages[0].map((image, index) => (
                                <div key={index} className='w-full lg:h-[900px] h-auto'>
                                    <LazyLoadImage src={`${image}`} alt="" className='lg:h-[631px] h-[350px]' />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
                <div className='lg:pe-24 px-4 mt-8 lg:mt-0 lg:w-[40%] flex items-center flex-col'>
                    <div className='w-full'>
                        <h1 className='capitalize lg:text-[26px] text-xl font-pawan font-semibold text-green-700'>{currentProduct.title}</h1>
                    </div>

                    <div className='flex justify-between flex-col gap-3 lg:gap-0 lg:flex-row w-full mt-3'>
                        <div className='flex items-center gap-2 text-red-400 font-semibold'>
                            <p><FaFire /></p>
                            <span>{soldproduct} sold in last 15 hours</span>
                        </div>
                    </div>

                    <div className='w-full mt-4'>
                        <label htmlFor="variantSelector" className='font-semibold'>Choose a variant:</label>
                        <select id="variantSelector" className="w-full mt-2 border p-2" value={selectedVariant?._id} onChange={handleVariantChange}>
                            {variant.map((v) => (
                                <option key={v._id} value={v._id}>
                                    {`${v.weight}g - ₹${v.final_price}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='w-full text-gray-500 mt-3'>
                        <p>{currentProduct.title}</p>
                    </div>
                    <div className='w-full text-gray-500 mt-3'>
                        <p> Availability: {selectedVariant?.qty} <br /></p>
                        <div className='flex gap-2 items-end'>
                            <p className='mt-3 font-semibold text-red-500 text-2xl'>₹ {selectedVariant?.final_price}</p>
                            <p className={` ${selectedVariant?.price_off <= 0 ? ' hidden' : "mt-4 line-through text-base"}`}>₹ {selectedVariant?.price}</p>
                            <p className={` ${selectedVariant?.price_off <= 0 ? ' hidden' : "mt-4 text-green-800 font-bold text-base"}`}>{selectedVariant?.price_off}% Off</p>
                        </div>
                    </div>
                    <div className='flex flex-col w-full mt-4'>
                        <div>
                            <label htmlFor="qyt">Quantity: </label>
                            <div className="flex items-center relative border border-gray-300 w-[120px] py-6 mt-2">
                                <button className="font-bold py-3 px-4 rounded-l absolute -left-2" onClick={handleMinusClick}>
                                    <FaMinus />
                                </button>
                                <input id='qyt' type="number" className="focus:outline-none text-gray-700 py-3 w-[50px] bg-transparent absolute left-1/2" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))} />
                                <button className="text-gray-700 font-bold py-2 px-4 rounded-r absolute -right-2" onClick={handlePlusClick}>
                                    <FaPlus />
                                </button>
                            </div>
                            <p className='mt-2 text-gray-500'>Subtotal: <span className='text-green-800 font-bold text-lg'>₹ {(selectedVariant?.final_price * quantity).toFixed(2)}</span></p>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='flex items-center justify-between'>
                            <NavLink to={"/addtocart"} className={"w-3/4"} onClick={() => handleAddToCart(currentProduct)}>
                                <button className='w-full text-base uppercase hover:border-2 hover:border-black py-[12px] mt-3 font-bold bg-[#4b7422] shadow-[5px_6px_rgb(166,222,205,1)] text-blue-50 hover:bg-white hover:text-black hover:shadow-black hover:antialiased'>Add to Cart</button>
                            </NavLink>
                            {/* <CiHeart className='border border-gray-500 rounded-full p-2 h-10 w-10 lg:h-14 lg:w-14 cursor-pointer' />
                            <GoShareAndroid className='h-7 w-7 cursor-pointer' /> */}
                        </div>
                        <a href="https://wa.me/919256432475">
                            <div className='text-center flex gap-2 items-center justify-center text-base uppercase hover:border-none border-2 border-gray-600 py-[12px] font-bold shadow-[5px_6px_rgb(166,222,205,1)] hover:text-blue-50 bg-white hover:bg-black text-black w-full mt-10'>
                                Order On Whatsapp <div className='bg-green-600  rounded-full flex justify-center items-center'>
                                    <a href="https://wa.me/919256432475"><SiWhatsapp className=' text-white  w-8 h-8' /></a>
                                </div>
                            </div>
                        </a>
                        <Link to={`/paymentDetailSummary/${id}/${selectedVariant?._id}`} onClick={() => handleSingleProduct(currentProduct)}>
                            <div className='text-center text-base uppercase hover:border-none border-2 border-gray-600 py-[12px] font-bold shadow-[5px_6px_rgb(166,222,205,1)] hover:text-blue-50 bg-white hover:bg-black text-black w-full mt-10'>
                                Buy it Now
                            </div>
                        </Link>
                    </div>
                    <div className="w-full flex items-center mt-10 gap-5">
                        <FaRegEye className='w-5 h-5' />
                        <p className='text-gray-500'><span className='text-amber-700 font-semibold'>{customerCount}</span> customers are viewing this product</p>
                    </div>
                    <div className="w-full flex justify-between mt-5 gap-4">
                        <div className='flex flex-col gap-2 justify-center items-center text-sm'>
                            <div><IoShieldCheckmarkSharp className='bg-red-600 text-white w-8 h-8 p-[5px] rounded-full' /></div>
                            <div className='text-center'>100% Genuine Product</div>
                        </div>
                        <div className='flex flex-col gap-2 justify-center items-center text-sm'>
                            <div><img src={best_price} alt="Best Price" className='w-8 h-8 rounded-full bg-red-400 p-[5px]' /></div>
                            <div className='text-center'>Assured Best Price</div>
                        </div>
                        <div className='flex flex-col gap-2 justify-center items-center text-sm'>
                            <div><FcOnlineSupport className=' w-8 h-8' /></div>
                            <div className='text-center'>Customer Support</div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='text-center mt-10 font-semibold text-2xl mx-10 border-b-2 font-serif text-gray-700 border-black pb-5'>
                Description
            </div>
            <div className='px-10  pt-14'
                dangerouslySetInnerHTML={{ __html: currentProduct.description }}
            />
            <div className={`${currentProduct_recommned.length > 0 ? '' : 'hidden'} text-center font-semibold text-xl lg:text-2xl mx-10 mt-10 font-serif text-gray-700 `}>
                You May Also Like
            </div>
            <div className={'w-full px-0 lg:px-14 mt-2 lg:mt-10'}>
                {
                    currentProduct_recommned ? (
                        <Carousel responsive={responsive_related} showDots={false}  >
                            {
                                currentProduct_recommned.map((data, i) => (
                                    <div key={i} className='py-3 shadow-sm px-0 lg:px-7 flex flex-col justify-center items-center'  >
                                        <Link className="overflow-hidden" to={{
                                            pathname: `/productDetail/${data.slug}`
                                        }} >
                                            <LazyLoadImage alt="ecommerce" className={`object-cover object-center block `} style={window.innerWidth < 1024 ? { height: `${window.innerWidth * 0.477}px`, width: `${window.innerWidth * 0.477}px` } : {}} src={`${data.images[0]}`} />
                                        </Link>
                                        <div className="mt-4 text-center">
                                            <h3 className=" text-green-700 font-bold  title-font mb-1">Yumi mehendi</h3>
                                            <p className=" text-base line-clamp-2">{data.title}</p>
                                            <p className="font-bold mt-1">Rs. {data.Variant_Price}</p>
                                            <NavLink to="/addtocart" onClick={() => handleAddToCart(data)}>
                                                <button className="   mb-4 border border-gray-400 w-full py-[12px] mt-3 bg-gray-50 hover:bg-gray-100 font-semibold rounded-md text-black ">
                                                    Add to cart
                                                </button>
                                            </NavLink>
                                        </div>
                                    </div>
                                ))
                            }
                        </Carousel>) : (
                        <h1></h1>
                    )
                }
            </div>
        </>
    );
}

export default ProductDetailWhole;

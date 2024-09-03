import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FaFire, FaPlus, FaMinus, FaRegEye } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { GoShareAndroid } from "react-icons/go";
import { FaQuestionCircle } from "react-icons/fa";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { addProductInCart , singleProduct } from "../../features/AddToCartSlice";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { fetchProducts } from "../../features/productsFileHairSlice.js";
import axios from 'axios';

const serverUrl = import.meta.env.VITE_SERVER_URL;

const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 1 },
    desktop: { breakpoint: { max: 1024, min: 800 }, items: 1 },
    tablet: { breakpoint: { max: 800, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
};

function ProductDetailWhole() {
    const dispatch = useDispatch();
    const myName = useSelector((state) => state.ProductHairReducer);
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const [otherImages, setOtherImages] = useState([]);
    const [variant, setVariant] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState(null);
    

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const res = await axios.get(`${serverUrl}/api/getImagesWithoutHeadInPath/${id}`);
                setOtherImages(res.data);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        const fetchVariant = async () => {
            try {
                const res = await axios.get(`${serverUrl}/api/getVariant/${id}`);
                const variants = res.data.variants;
                setVariant(variants);
                setSelectedVariant(variants[0]);  // Set the first variant as default
            } catch (error) {
                console.error("Error in fetching the variants of the product");
            }
        };
        fetchVariant();
        fetchImage();
    }, [id]);

    if (!myName.data) return <h1>Loading........ </h1>;

    const currentProduct = myName.data.find(element => element._id === id);
    if (!currentProduct) return <h1>Product not found</h1>;

    const multipleImages = [currentProduct.image, ...otherImages];

    const handleMinusClick = () => quantity > 1 && setQuantity(quantity - 1);
    const handlePlusClick = () => quantity < selectedVariant?.qty &&  setQuantity(quantity + 1);

    const CustomDot = ({ onClick, index, active }) => (
        <button className={`${active ? "active opacity-60" : "inactive"} mx-1`} onClick={() => onClick()}>
            <LazyLoadImage src={`${serverUrl}/${multipleImages[index]}`} alt="" className='lg:h-[181px] lg:w-[181px] h-[70px] w-[70px]' />
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
    const handleSingleProduct = (product) =>{
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

    return (
        <>
            <div className='flex lg:my-10 flex-col lg:flex-row'>
                <div className='lg:w-[60%] lg:pe-6 lg:ps-14 ps-0 pe-0 w-full'>
                    <div className="pic w-full md:w-[100%] xl:w-[730.08] px-2 sm:px-5 lg:px-10 gap-y-10 flex">
                        <Carousel responsive={responsive} infinite={true} showDots customDot={<CustomDot />} customRightArrow={<CustomRightArrow />} customLeftArrow={<CustomLeftArrow />}
                            className='w-full h-[600px] lg:h-auto'>
                            {multipleImages.map((image, index) => (
                                <div key={index} className='w-full lg:h-[900px] h-auto'>
                                    <LazyLoadImage src={`${serverUrl}/${image}`} alt="" className='lg:h-[631px] h-[350px]' />
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
                            <span>15 sold in last 15 hours</span>
                        </div>
                    </div>

                    <div className='w-full mt-4'>
                        <label htmlFor="variantSelector" className='font-semibold'>Choose a variant:</label>
                        <select id="variantSelector" className="w-full mt-2 border p-2" value={selectedVariant?._id} onChange={handleVariantChange}>
                            {variant.map((v) => (
                                <option key={v._id} value={v._id}>
                                    {`${v.weight}g - Rs. ${v.price}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='w-full text-gray-500 mt-3'>
                        <p>{currentProduct.title}</p>
                    </div>
                    <div className='w-full text-gray-500 mt-3'>
                        <p> Availability: {selectedVariant?.qty} <br /></p>
                        <p className='mt-3 font-bold text-black text-xl'>Rs. {selectedVariant?.price}</p>
                    </div>
                    <div className='flex flex-col w-full mt-4'>
                        <div>
                            <label htmlFor="qyt">Quantity: </label>
                            <div className="flex items-center relative border border-gray-300 w-[120px] py-6 mt-2">
                                <button className="font-bold py-3 px-4 rounded-l absolute -left-2" onClick={handleMinusClick}>
                                    <FaMinus />
                                </button>
                                <input id='qyt' type="number" className="focus:outline-none text-gray-700 py-3 w-[50px] bg-transparent absolute left-1/2" value={quantity}  onChange={(e) => setQuantity(parseInt(e.target.value, 10))} />
                                <button className="text-gray-700 font-bold py-2 px-4 rounded-r absolute -right-2" onClick={handlePlusClick}>
                                    <FaPlus />
                                </button>
                            </div>
                            <p className='mt-2 text-gray-500'>Subtotal: <span className='text-black font-semibold text-lg'>Rs. {selectedVariant?.price * quantity}</span></p>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='flex items-center justify-between'>
                            <NavLink to={"/addtocart"} className={"w-3/4"} onClick={() => handleAddToCart(currentProduct)}>
                                <button className='w-full text-base uppercase hover:border-2 hover:border-black py-[12px] mt-3 font-bold bg-[#4b7422] shadow-[5px_6px_rgb(166,222,205,1)] text-blue-50 hover:bg-white hover:text-black hover:shadow-black hover:antialiased'>Add to Cart</button>
                            </NavLink>
                            <CiHeart className='border border-gray-500 rounded-full p-2 h-10 w-10 lg:h-14 lg:w-14 cursor-pointer' />
                            <GoShareAndroid className='h-7 w-7 cursor-pointer' />
                        </div>
                        <a href="https://wa.me/919256432475">
                            <div className='text-center text-base uppercase hover:border-none border-2 border-gray-600 py-[12px] font-bold shadow-[5px_6px_rgb(166,222,205,1)] hover:text-blue-50 bg-white hover:bg-black text-black w-full mt-10'>
                                Buy Bulk
                            </div>
                        </a>
                        <div className='text-center text-base uppercase hover:border-none border-2 border-gray-600 py-[12px] font-bold shadow-[5px_6px_rgb(166,222,205,1)] hover:text-blue-50 bg-white hover:bg-black text-black w-full mt-10'>
                            { selectedVariant && selectedVariant.length != 0 ? (
                                <Link to={`/paymentDetailSummary/${id}/${selectedVariant._id}`} onClick={() => handleSingleProduct(currentProduct)}>Buy it Now</Link>
                            ) : (
                                <p>Selected variant nhi dala </p>
                            )

                            }
                        </div>
                    </div>
                    <div className="w-full flex items-center mt-10 gap-5">
                        <FaRegEye className='w-5 h-5' />
                        <p className='text-gray-500'>165 customers are viewing this product</p>
                    </div>
                    <div className="w-full mt-3">
                        <div className='flex items-end gap-3'>
                            <p className='text-green-700 mt-3 font-pawan font-semibold'>Free Shipping</p>
                            <FaQuestionCircle className='w-5 h-5 text-gray-300' />
                        </div>
                        <p className='text-gray-500 mt-2'>Free standard shipping on all orders</p>
                        <p className='text-gray-500 mt-2'>Estimated to be delivered on: 6-7 Days</p>
                    </div>

                </div>
            </div>
            <div className='text-center font-semibold text-3xl mx-10 border-b-2 italic text-gray-700 border-black pb-5'>
                This is your Description
            </div>
            <div className='px-10  pt-14'
                dangerouslySetInnerHTML={{ __html: currentProduct.description }}
            />
        </>
    );
}

export default ProductDetailWhole;

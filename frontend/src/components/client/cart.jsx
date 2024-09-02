import React, { useState, useEffect, useCallback, useRef } from "react";
import '../../Cart.css';

import { Link, NavLink } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { GoChevronDown } from "react-icons/go";
import { BiFilterAlt } from "react-icons/bi";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;
// add to cart products
import { useDispatch } from "react-redux"
import { addProductInCart } from "../../features/AddToCartSlice"
export default function Cart(props) {
    const [gridCart, setGridCart] = useState(window.innerWidth < 1024 ? 'grid-cols-2' : 'grid-cols-4');  // gird images
    const [image, setImage] = useState(' w-full  h-[218px]'); // image size on grid 
    const [selectedOption, setSelectedOption] = useState('10');
    const options = [
        { value: '3' },
        { value: '10' },
        { value: '15' },
        { value: '20' },
        { value: '25' },
        { value: '30' },
        { value: '50' }
    ]
    const [selectedOptionForSort, setSelectedOptionForSort] = useState();
    const optionsForSort = [
        { value: 'featured', label: 'Featured' },
        { value: 'bestSelling', label: 'Best Selling' },
        { value: 'aToz', label: 'Alphabetically,A-Z' },
        { value: 'zToa', label: 'Alphabetically,Z-A' },
        { value: 'lToh', label: 'Price, low to high' },
        { value: 'hTol', label: 'Price, high to low' }
    ]

    const [selectedVariant, setSelectedVariant] = useState(null);
    const gridCartValue = (x) => { // image size on grid 
        //  setGridCart('grid-cols-' + x);
        if (x === 4) {
            setImage(' w-full h-[218px]');
            setGridCart('grid-cols-4');
        }
        else if (x === 3) {
            setImage(' w-full h-[297px]');
            setGridCart('grid-cols-3');
        }
        else if (x === 2) {
            if (window.innerWidth > 1024) {
                setImage(' w-full h-[455px]');
            }
            else {
                setImage(`w-[${window.innerWidth * 0.477}px] h-[${window.innerWidth * 0.477}px] `);
            }
            setGridCart('grid-cols-2');
        }
        else {
            setImage(' w-[225px] h-[225px]');
            setGridCart('grid-cols-1');
        }
    }


    // make a copy of the data

    const [currentData, setCurrentData] = useState(props.data);

    // how many page require for show products
    const [currentPage, setCurrentPage] = useState(1);
    let recordsPerPage = selectedOption;
    let lastIndex = currentPage * recordsPerPage;
    let firstIndex = lastIndex - recordsPerPage;
    // make copy of the data
    let records = currentData.slice(firstIndex, lastIndex);
    let npage = Math.ceil(currentData.length / recordsPerPage);
    let numbers = [...Array(npage + 1).keys()].slice(1);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    // onclick Arrow 

    const onclickArrow = (which) => {
        if (which === 'right') {
            setCurrentPage(currentPage + 1);
        }
        else {
            setCurrentPage(currentPage - 1);
        }
    }

    // this is the left part of the container

    // for dropdowns 
    const [dropDownArray, setDropDownArray] = useState([true, true, true, true, true]);
    const togglePrice = (number) => {
        const newArray = [...dropDownArray];
        newArray[number] = !newArray[number];
        setDropDownArray(newArray);
    };


    // for range of price 
    const [inputFrom, setInputFrom] = useState(props.min);
    const [inputTo, setInputTo] = useState(props.max);
    const [rightPosition, setRightPosition] = useState(0);
    const [leftPosition, setLeftPosition] = useState(0);
    const right = () => {
        let range = (props.max - inputTo) * 100 / props.max;
        setRightPosition(parseInt(range));
        document.getElementById('rightValueSetOnBox').value = inputTo;
    }
    const left = () => {
        let range = 100 - parseInt((props.max - inputFrom) * 100 / props.max);
        setLeftPosition(range);
        document.getElementById('leftValueSetOnBox').value = inputFrom;
    }

    const rightValeRangeSetOnInput = (price) => {
        let range = parseInt((props.max - price) * 100 / props.max);
        setRightPosition(range);
        document.getElementById('rightValueSetOnRange').value = price;

    }
    const leftValeRangeSetOnInput = (price) => {
        let range = 100 - parseInt((props.max - price) * 100 / props.max);
        setLeftPosition(range);
        document.getElementById('leftValueSetOnRange').value = price;
    }



    // maintain the use effect for sorting the cart
    const sortData = useCallback((sortType) => {
        if (sortType === 'aToz') {
            let newData = [...currentData].sort((a, b) => a.name.localeCompare(b.name));
            setCurrentData(newData);
        } else if (sortType === 'zToa') {
            let newData = [...currentData].sort((a, b) => b.name.localeCompare(a.name));
            setCurrentData(newData);
        }
        else if (sortType === 'lToh') {
            const sortingProduct = (a, b) => a.price - b.price
            let newData = [...currentData].sort(sortingProduct);
            setCurrentData(newData);
        }
        else if (sortType === 'hTol') {
            const sortingProduct = (a, b) => b.price - a.price
            let newData = [...currentData].sort(sortingProduct);
            setCurrentData(newData);
        }
    }, [currentData]);

    // this useEffect use for SortData on when change the selected option 
    useEffect(() => {
        if (selectedOptionForSort !== prevSelectedOptionForSort.current) {
            sortData(selectedOptionForSort);
            prevSelectedOptionForSort.current = selectedOptionForSort;
        }
    }, [sortData, selectedOptionForSort]);

    // productTypeChange
    // use for show the selected check box in the toasts form 
    const prevSelectedOptionForSort = useRef(selectedOptionForSort);

    const [selected, setSelected] = useState([]);
    const productTypeChange = (e, index) => {

        const activeCheck = document.getElementById(index).checked;
        if (activeCheck) {
            setSelected(oldData => [...oldData, e.target.value]);
        }
        else {
            setSelected(selected.filter(values => values !== e.target.value))
        }
    }
    // useEffect for filter the products on the baseics of which product type choose
    useEffect(() => {
        if (selected.length > 0) {
            let mergeData = [];
            for (let name of selected) {
                const tempData = props.data.filter(checks => checks.subCategroies === name);
                mergeData = mergeData.concat(tempData);
            }
            setCurrentData(mergeData);
        }
        else {
            setCurrentData(props.data);
        }
    }, [props.data, selected])

    // useEffect for the show products on selected product range
    // some problem*
    const sortProdutByRange = () => {
        const tempData = props.data.filter(check => (check.price >= inputFrom && check.price <= inputTo));
        setCurrentData(tempData);
    };


    // make a offcanvas from bottom on mobile screen for the sort


    const [offcanvasUse, setOffcanvasUse] = useState(false);

    // offcanvas is open or close check

    const [isOffcanvasOpen, setOffcanvas] = useState([false, false]);

    const offcanvasOpenAndClose = (number) => {
        const newArray = [...isOffcanvasOpen];
        newArray[number] = !newArray[number];
        setOffcanvas(newArray);
    };

    // useEffect for detect when offcanvas use or not
    useEffect(() => {
        if (window.innerWidth < 1280)
            setOffcanvasUse(true);
        else
            setOffcanvasUse(false);
    }, []);

    // send the data to the card page 
    const dispatch = useDispatch();
    const addCartHandler = async (product) => {
        try {
            const res = await axios.get(`${serverUrl}/api/getVariantData/${product.Variant_Id}`);
            const variants = res.data.variantData;

            // Create the productWithVariant object after fetching the variants
            const productWithVariant = {
                ...product,
                selectedVariant: variants[0],
                quantity: 1
            };

            dispatch(addProductInCart(productWithVariant));
        } catch (error) {
            console.error("Error in fetching the variants of the product");
        }
    };


    return (
        <>
            <section className=" mt-14 flex mx-2 lg:mx-3 xl:mx-0 xl:container">
                <div className={` ${offcanvasUse ? (isOffcanvasOpen[0] ? 'fixed h-full w-full  bg-black/50 backdrop-blur-sm top-0 right-0 z-50' : ' hidden') : 'flex flex-col items-end justify-start pe-10 w-1/4'}   `}>
                    {/* for price dropdown  */}
                    <div className={`${isOffcanvasOpen[0] ? 'text-black bg-white absolute left-0 top-0 h-screen p-8 gap-8 z-50 flex flex-col overflow-y-auto w-80' : 'w-3/4'}`}>
                        <div className={`${isOffcanvasOpen[0] ? 'flex justify-between' : 'hidden'}`}>
                            <p>Sidebar</p>
                            <IoCloseOutline onClick={() => offcanvasOpenAndClose(0)} className=" text-2xl " />
                        </div>
                        <div className={`${selected.length > 0 ? "flex flex-col w-full" : "hidden"}`}>
                            <div className="flex  justify-between">
                                <div className=" text-base tracking-wide font-bold">REFINED BY</div>
                                <div><span className="cursor-pointer underline underline-offset-1">Clear All</span></div>
                            </div>
                            <div className="relative">
                                {
                                    selected.map((a, i) =>
                                        <div key={i} >
                                            <span>{a}</span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className={`${props.max === 0 ? 'hidden' : ''} w-full`}>
                            <div className=" border-b pb-2 border-black  flex justify-between items-center " onClick={() => togglePrice(0)}>
                                <div className=" text-sm tracking-wide font-bold">PRICE</div>
                                <div className="text-gray-600">
                                    <span className={`arrow`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`${dropDownArray[0] ? "rotate-[-180deg]" : ""} transition duration-1000 bi bi-chevron-down`} viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                    </svg></span>
                                </div>
                            </div>
                            <div className={`${dropDownArray[0] ? " grid-rows-[1fr] opacity-100" : "grid-rows-[0fr]"} overflow-hidden grid duration-1000 ease-in-out transition-all`}>
                                <div className=" overflow-hidden">
                                    <div className="my-3 ">
                                        <div className=" h-[6px] relative bg-slate-300 rounded-sm w-full">
                                            <span className={`h-full absolute bg-black  rounded-sm`} style={{
                                                right: `${rightPosition}% `,
                                                left: `${leftPosition}% `
                                            }}></span>

                                        </div>

                                        <div className="w-full relative">
                                            <input type="range" onChange={(e) => { setInputFrom(e.target.value); left() }} className=" h-1 w-full -top-1   pointer-events-none  absolute " min={props.min} max={props.max} step={props.step} defaultValue={props.min} id="leftValueSetOnRange" />
                                            <input type="range" onChange={(e) => { setInputTo(e.target.value); right() }} className=" h-1 w-full -top-1   pointer-events-none  absolute " min={props.min} max={props.max} step={props.step} defaultValue={props.max} id="rightValueSetOnRange" />
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mb-4 ">
                                        <div className=" text-base border  px-2 py-3 "><span>₹</span><input onInput={(event) => leftValeRangeSetOnInput(event.target.value)} type="number" className=" placeholder:text-black border-none outline-none w-14 " dir="rtl" placeholder={props.min} id="leftValueSetOnBox" min={props.min} max={props.max} /></div>
                                        <div className="text-base text-black ">to</div>
                                        <div className=" text-base border  px-2 py-3 "><span>₹</span><input onInput={(event) => rightValeRangeSetOnInput(event.target.value)} type="number" className=" placeholder:text-black border-none outline-none w-14 " dir="rtl" placeholder={props.max} id="rightValueSetOnBox" min={props.min} max={props.max} /></div>
                                    </div>
                                    <button onClick={() => sortProdutByRange()} className="bg-[#4b7422] text-gray-50 font-bold w-full h-14 hover:text-black hover:bg-white hover:border-2 hover:duration-100 hover:border-black ">
                                        APPLY
                                    </button>
                                </div>
                            </div>
                        </div>


                        {/* for product type dropdown  */}
                        <div className="pt-5 w-full">
                            <div className=" border-b pb-2 border-black  flex justify-between items-center " onClick={() => togglePrice(1)}>
                                <div className=" text-base tracking-wide font-bold">PRODUCTE TYPE</div>
                                <div className="text-gray-600">
                                    <span className={`arrow`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`${dropDownArray[1] ? "rotate-[-180deg]" : ""} transition duration-1000 bi bi-chevron-down`} viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                    </svg></span>
                                </div>
                            </div>
                            <div className={`${dropDownArray[1] ? " pt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr]"} overflow-hidden grid duration-1000 ease-in-out transition-all`}>
                                <div className=" overflow-hidden">
                                    {
                                        props.productTypes.map((product, i) => (
                                            <div key={i}>
                                                <input type="checkbox" value={product.subcategory} id={i} onChange={(e) => productTypeChange(e, i)} />
                                                <span className="ps-3 ">{product.subcategory} {`(${product.count})`}</span>
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                        </div>
                        <div className="pt-5 w-full">
                            <div className=" border-b pb-2 border-black  flex justify-between items-center " onClick={() => togglePrice(2)}>
                                <div className=" text-sm tracking-wide font-bold">FEATURED PRODUCTS</div>
                                <div className="text-gray-600">
                                    <span className={`arrow`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`${dropDownArray[2] ? "rotate-[-180deg]" : ""} transition duration-1000 bi bi-chevron-down`} viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                    </svg></span>
                                </div>
                            </div>
                            <div className={`${dropDownArray[2] ? " pt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr]"} overflow-hidden grid duration-1000 ease-in-out transition-all`}>
                                <div className=" overflow-hidden">
                                    <p>Featured products carousel</p>

                                </div>
                            </div>
                        </div>
                        <div className="pt-5 w-full">
                            <div className=" border-b pb-2 border-black  flex justify-between items-center " onClick={() => togglePrice(3)}>
                                <div className=" text-sm tracking-wide font-bold">ABOUT OUR PRODUCTS</div>
                                <div className="text-gray-600">
                                    <span className={`arrow`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`${dropDownArray[3] ? "rotate-[-180deg]" : ""} transition duration-1000 bi bi-chevron-down`} viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                    </svg></span>
                                </div>
                            </div>
                            <div className={`${dropDownArray[3] ? " pt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr]"} overflow-hidden grid duration-1000 ease-in-out transition-all`}>
                                <div className=" overflow-hidden">
                                    <p>Our products are 100% natural, chemical free & we use Steam sterilized herbs, handmade , clean ingredients, zero sulphate & paraben , GMO free , No additive, No preservative, No added Colours and No synthetic Fragrance</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div> {/* fillter */}
                <div className=" flex flex-col xl:w-3/4 w-full"> {/* container */}
                    <div className="w-full flex flex-col">
                        <div className="w-full h-auto overflow-hidden cursor-pointer ">
                            <LazyLoadImage src={`/${props.image}`} alt="" className=" w-full  transition-transform object-cover duration-700 hover:scale-110 " style={window.innerWidth < 1280 ? { height: `${window.innerWidth * 0.484}px` } : { height: '465px' }} />
                        </div> {/* banner */}
                        <div className="uppercase font-bold text-2xl border-b-2 py-4 w-[100%]">skin care</div>
                    </div>
                    <div className="w-full flex mt-4 justify-between pb-6">
                        <div className="lg:hidden flex items-center gap-2">
                            <BiFilterAlt onClick={() => offcanvasOpenAndClose(0)} className=" text-2xl " />
                            <p>Filter</p>
                        </div>
                        <div className="flex justify-center items-center"> {/* images lgani hai line wali */}
                            <p className="uppercase font-medium pr-5 hidden lg:block">view as</p>
                            <button className="mx-2 " onClick={() => gridCartValue(1)}><LazyLoadImage src="/images/A.webp" alt="" className="w-7 h-7" /> </button>
                            <button className="mx-2 " onClick={() => gridCartValue(2)}><LazyLoadImage src="/images/B.webp" alt="" className="w-7 h-7" /></button>
                            <button className="mx-2 hidden lg:block" onClick={() => gridCartValue(3)}><LazyLoadImage src="/images/C.webp" alt="" className="w-7 h-7" /></button>
                            <button className="mx-2 hidden lg:block" onClick={() => gridCartValue(4)}><LazyLoadImage src="/images/D.webp" alt="" className="w-7 h-7" /></button>
                        </div>
                        <div className="flex gap-12 ">
                            <div className="hidden lg:block">
                                <label htmlFor="perPage" className="uppercase font-semibold pr-2">items per page</label>
                                <select
                                    id="perPage"
                                    value={selectedOption}
                                    onChange={(event) => setSelectedOption(event.target.value)}
                                    className="border-1 border-gray-500 outline-none px-4 py-2 cursor-pointer "
                                >
                                    {options.map((option) => (
                                        <option key={option.value} value={option.value} className=" hover:underline underline-offset-1 hover:bg-red-500">
                                            {option.value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div >
                                <div className={`${offcanvasUse ? 'flex items-center gap-2 justify-center' : 'hidden'}`}>
                                    <p>Sort</p>
                                    <GoChevronDown onClick={() => offcanvasOpenAndClose(1)} />
                                </div>
                                <div className={`${offcanvasUse ? ' hidden' : ''}`}>
                                    <label htmlFor="sortBy" className="uppercase font-semibold pr-2">sort by</label>
                                    <select
                                        id="sortBy"
                                        value={selectedOptionForSort}
                                        onChange={(event) => setSelectedOptionForSort(event.target.value)}
                                        className="border-1 border-gray-500 outline-none px-4 py-2 cursor-pointer "
                                    >
                                        {optionsForSort.map((option) => (
                                            <option key={option.value} value={option.value} className=" hover:underline underline-offset-1 hover:bg-red-500">
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* on mobile screen show the sort on offcanvas  */}
                            <div className={`${isOffcanvasOpen[1] ? 'block' : 'hidden'}`}>
                                <div className={`${offcanvasUse ? 'fixed h-full w-full  bg-black/50 backdrop-blur-sm bottom-0 left-0 z-50' : ''}`}>
                                    <div className={`${offcanvasUse ? "text-black bg-white absolute left-0 bottom-0 text-start w-full " : ''}`}>
                                        <div className="flex justify-between border-b py-3 px-3 ">
                                            <p className="font-medium text-xl">Sort By : </p>
                                            <IoCloseOutline onClick={() => offcanvasOpenAndClose(1)} className=' mt-0 text-3xl cursor-pointer ' />

                                        </div>
                                        {optionsForSort.map((option) => (
                                            <option key={option.value} onClick={(event) => {
                                                setSelectedOptionForSort(event.target.value);
                                                offcanvasOpenAndClose(1)
                                            }} value={option.value} className="py-2 active:font-bold active:bg-gray-500 px-3">
                                                {option.label}
                                            </option>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div> {/* cutomize grid */}
                    <div className={`w-full grid gap-2 lg:gap-4 mt-5  ${gridCart}`}> {/* carts */}

                        {
                            records.map((data, i) => (
                                <div key={i} className="    hover:-translate-y-5 transition ease-in-out duration-500 mt-10 ">
                                    <Link className="overflow-hidden" to={{
                                        pathname: `/productDetail/${data._id}`
                                    }}
                                    >
                                        <LazyLoadImage alt={`${serverUrl} + hello + ${data.image}`} className={`object-cover object-center block ${window.innerWidth > 1024 ? image : ''}`} style={window.innerWidth < 1024 ? { height: `${window.innerWidth * 0.477}px`, width: `${window.innerWidth * 0.477}px` } : {}} src={`${serverUrl}/${data.image}`} />
                                    </Link>
                                    <div className=" mt-4 text-center  pt-3 ">
                                        <h3 className=" text-green-700 font-bold  title-font mb-1">Yumi mehendi</h3>
                                        <p className=" text-base">{data.title}</p>
                                        <p className="font-bold mt-1">Rs. {data.Variant_Price}</p>
                                        <div >
                                            <NavLink to={"/addtocart"} >
                                                <button onClick={() => addCartHandler(data)} className="   mb-4 border border-gray-400 w-full py-[12px] mt-3 bg-gray-50 hover:bg-gray-100 font-semibold rounded-md text-black ">
                                                    Add To Cart
                                                </button>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className={`flex my-14 justify-center flex-col ${records.length > 0 ? "" : "hidden"} ${numbers.length === 1 ? 'hidden' : ''}`}>
                        <div className="flex justify-center items-center flex-col ">
                            <p className=" text-gray-600 text-base font-normal "> Showing {firstIndex + 1 + " - " + Math.min(lastIndex, props.data.length) + " of " + props.data.length + " total"}</p>
                            <div className=" w-48 h-1 bg-slate-100 rounded-sm my-2">
                                <p className="h-full bg-blue-500  rounded-sm" style={{
                                    width: `${(Math.min(lastIndex, props.data.length) / props.data.length) * 100}%`
                                }}></p>
                            </div>



                        </div>
                        <div className={`  flex justify-center`}>
                            <button className={`${currentPage === 1 ? 'hidden' : ''}`} onClick={() => { onclickArrow('left') }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                            </svg> </button>
                            <ul className="flex items-center justify-center ">
                                {
                                    numbers.map((number) => (
                                        <li key={number} onClick={() => {
                                            handlePageChange(number);
                                        }} className={`w-10 h-10 mx-2 flex items-center justify-center ${currentPage === number ? 'border' : ''} ${numbers.length === 1 ? 'hidden' : ''}    border-black rounded-full hover:border hover:border-black hover:rounded-full`}><span>{number}</span></li>
                                    ))
                                }
                            </ul>
                            <button className={`${currentPage === numbers.length ? 'hidden' : ''} `} onClick={() => { onclickArrow('right') }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                            </svg></button>
                        </div>
                    </div>
                    <div className={`${records.length > 0 ? "hidden" : ""} my-10 `}>
                        <p className=" font-pawan text-3xl font-semibold text-center capitalize">No Product found</p>
                    </div>
                </div>
            </section>
        </>
    )
}
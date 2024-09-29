import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../features/productsFileHairSlice.js";
import { Link } from 'react-router-dom'; // Assuming Link is from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IoCloseOutline } from "react-icons/io5";

const serverUrl = import.meta.env.VITE_SERVER_URL;

function Search(props) {
    const dispatch = useDispatch();
    const myName = useSelector((state) => state.ProductHairReducer);

    const [searchKeyword, setSearchKeyword] = useState(props?.keyword || "");

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (myName.data === null) {
        return null; // Return null to avoid rendering if data is null
    }

    // If `props.showFull` is true, show the full screen layout with search input
    const handleSearchInput = (e) => {
        setSearchKeyword(e.target.value);
    };

    const keyword = searchKeyword.toLowerCase();
    const keywords = keyword.split(" ");

    // Filter products based on the keywords
    const filteredData = myName.data.data?.filter(element => {
        const title = element.title ? element.title.toLowerCase() : "";
        return keywords.every(keyword => title.includes(keyword));
    }).slice(0, 4);

    return (
        <>
            {props.showFull ? (
                // Full-screen version
                <div className={` inset-0 z-50 bg-white flex flex-col p-5`}>
                    <div className="flex justify-between items-center mb-4">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchKeyword}
                            onChange={handleSearchInput}
                            className="border p-2 w-full text-lg rounded-md shadow-md"
                        />
                        <div className='flex justify-end'>
                            <IoCloseOutline onClick={() => {props.openAndClose(3) ; props.mobile_search_handle;}} className='mt-0 text-2xl cursor-pointer' />
                        </div>
                    </div>
                    <div className="flex-grow overflow-y-auto">
                        {filteredData.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {filteredData.map((data, i) => (
                                    <div key={i} className="hover:-translate-y-2 transition ease-in-out duration-300 p-4">
                                        <Link
                                            onClick={() => props.openAndClose(3)}
                                            to={`/productDetail/${data._id}`}
                                            className="block bg-white rounded-lg shadow-lg overflow-hidden"
                                        >
                                            <LazyLoadImage
                                                alt={`${serverUrl}/${data.image}`}
                                                height={150}
                                                width={150}
                                                className="mx-auto"
                                                src={`${serverUrl}/${data.image}`}
                                            />
                                            <div className="p-4 text-center">
                                                <h3 className="text-green-700 font-bold text-lg">{data.title}</h3>
                                                <p className="text-gray-500">Rs. {data.Variant_Price}</p>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-xl mt-4">No results found for <strong>{keyword}</strong>.</div>
                        )}
                    </div>
                </div>
            ) : (
                // Original version
                <div className={`${props.showOrNot(2) ? 'hidden' : ''} absolute top-10 bg-white shadow-2xl right-3 z-50 w-[700px] h-[300px] px-5 py-3`}>
                    <div className='flex justify-end'>
                        <IoCloseOutline onClick={() => props.openAndClose(2)} className='mt-0 text-2xl cursor-pointer' />
                    </div>
                    <div className='h-auto flex'>
                        {filteredData.length > 0 ? (
                            filteredData.map((data, i) => (
                                <div key={i} className="hover:-translate-y-5 transition ease-in-out duration-500 mt-10 w-52 h-[200px]">
                                    <Link
                                        onClick={() => props.openAndClose(2)}
                                        className="overflow-hidden"
                                        to={{
                                            pathname: `/productDetail/${data._id}`
                                        }}
                                    >
                                        <LazyLoadImage
                                            alt={`${serverUrl}/${data.image}`}
                                            height={100}
                                            width={100}
                                            src={`${serverUrl}/${data.image}`}
                                        />
                                        <div className="mt-4 text-center pt-3">
                                            <h3 className="text-green-700 font-bold title-font mb-1">Yumi mehendi</h3>
                                            <p className="text-base">{data.title}</p>
                                            <p className="font-bold mt-1">Rs. {data.Variant_Price}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className='text-center mt-4 text-xl'>No results found for <strong>{keyword}</strong>.</div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Search;

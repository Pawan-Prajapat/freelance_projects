import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../features/productsFileHairSlice.js";
import { Link } from 'react-router-dom'; // Assuming Link is from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IoCloseOutline } from "react-icons/io5";

const serverUrl = import.meta.env.VITE_SERVER_URL;

function Search(props) {
    const dispatch = useDispatch();
    const myName = useSelector((state) => state.ProductHairReducer);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (myName.data === null) {
        return null; // Return null to avoid rendering if data is null
    }

    console.log("probs keyword ", props.key)
    const keyword = props?.keyword || "";
    const keywords = keyword.toLowerCase().split(" ");

    // Check if keyword is empty or not provided
    if (!keyword.trim()) {
        return <div className={` ${props.showOrNot(2) ? 'hidden' : ''} text-center absolute top-10 bg-white shadow-2xl right-3  z-50 w-[700px] h-[300px] px-5 py-3`}> <p> No result found</p>  <IoCloseOutline onClick={() => props.openAndClose(2)} className='mt-0 text-2xl cursor-pointer' /></div>;

    }

    const filteredData = myName.data.filter(element => {
        const title = element.title ? element.title.toLowerCase() : "";

        // Check if all keywords are present in the title
        return keywords.every(keyword => title.includes(keyword));
    }).slice(0, 4);

    return (
        <div className={`${props.showOrNot(2) ? 'hidden' : ''} absolute top-10 bg-white shadow-2xl right-3  z-50 w-[700px] h-[300px] px-5 py-3`}>
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
                    <div className='text-center mt-4  text-xl'>No results found for <strong>{keyword}</strong>.</div>
                )}
            </div>
        </div>
    );
}

export default Search;

import { IoCloseOutline } from "react-icons/io5";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

import React, { useEffect } from 'react'
import { Link } from "react-router-dom"

import { useSelector, useDispatch } from 'react-redux';
import {
  updateProductQuantityDecrease, updateProductQuantityIncrease, removeProductCart
  , calculateTotal
} from "../../features/AddToCartSlice";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const serverUrl = import.meta.env.VITE_SERVER_URL;


function AddToCart() {



  useEffect(() => {

    window.scrollTo(0, 0);
  }, [])

  const AddToCartData = useSelector(state => state.AddToCartReducer.addToCart);
  const dispatch = useDispatch();

  console.log("AddToCartData" , AddToCartData);

  const handleDecreaseQuantity = (variantId, qty) => {
    if (qty > 1) {
      dispatch(updateProductQuantityDecrease(variantId));
    }
  };

  const handleIncreaseQuantity = (variantId, qty, maxQty) => {
    if (qty < maxQty) {
      dispatch(updateProductQuantityIncrease(variantId));
    }
  };

  const handleRemoveProduct = (variantId) => {
    dispatch(removeProductCart(variantId));
  };
  return (
    <>
      <div className={`${AddToCartData.length > 0 ? "flex" : "hidden"} flex-col lg:flex-row my-20`}>
        <div className="w-full lg:w-[70%] px-3 lg:ps-20 lg:pe-10">
          <div className="  lg:mb-9 flex items-center font-bold bg-gray-50 h-12">
            <div className="w-1/2 ps-8 text-start text-base tracking-wider uppercase">
              Product
            </div>
            <div className=" hidden lg:block w-1/4 text-base text-center tracking-wider uppercase">
              Price
            </div>
            <div className=" hidden lg:block w-1/4 text-base text-center tracking-wider uppercase">
              Quantity
            </div>
            <div className=" hidden lg:block w-1/4 text-base text-center tracking-wider uppercase">
              Total
            </div>
          </div>
          {
            AddToCartData.map((data, index) => (

              <div key={index} className={` flex-col ${data.qty === 0 ? dispatch(removeProductCart(index)) : 'flex'}`}>
                <div className="border h-auto mt-5 ">
                  <div className="flex flex-col items-center lg:flex-row">
                    <div className="w-full lg:w-1/2 flex justify-center pe-5">
                      <div className="flex gap-3">
                        <div className="h-24 w-24 ps-5 flex items-center ">
                          <LazyLoadImage src={`${data.image}`} alt="product image" />
                        </div>
                        <div className="w-52 flex items-center font-medium text-lg">
                          <p className="w-52">{data.title}</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full  lg:w-1/4 flex items-center justify-center font-semibold tracking-wider text-xl">Rs. {data.variant.price}</div>
                    <div className="w-full  lg:w-1/4 flex justify-center items-center">
                      <div className=" flex items-center relative border border-gray-300 w-[120px] py-6 mt-2">
                        <button className="font-bold py-3 px-4 rounded-l absolute -left-2" onClick={() => handleDecreaseQuantity(data.variant._id, data.qty)}>
                          <FaMinus />
                        </button>
                        <input
                          id="qyt"
                          type="number"
                          className="focus:outline-none text-gray-700 py-3 w-[50px] bg-transparent absolute left-1/2"
                          value={data.qty}
                          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                          max={data.variant.qty}
                        />
                        <button className="text-gray-700 font-bold py-2 px-4 rounded-r absolute -right-2" onClick={() => handleIncreaseQuantity(data.variant._id, data.qty, data.variant.qty)}>
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                    <div className="w-full  lg:w-1/4 my-2 lg:m-0 flex items-center justify-center gap-5">
                      <span className={`${window.innerWidth > 768 ? 'visible' : 'hidden'} font-semibold tracking-wider text-xl`} >Rs. {data.variant.price * data.qty}</span>
                      <IoCloseOutline onClick={() => handleRemoveProduct(data.variant._id)} className="h-6 w-6 cursor-pointer" />
                    </div>

                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <div className="w-ful lg:w-[30%] px-3 lg:pe-20 mt-20 lg:mt-0">
          <div className="border-b-2 border-black">
            <p className=" font-pawan text-lg tracking-wider font-bold uppercase pb-2">order summary</p>
          </div>
          <div className="flex justify-between py-5 border-b ">
            <p className=" uppercase font-semibold">total</p>
            <p className=" font-bold text-xl">{calculateTotal(AddToCartData)}</p>
          </div>
          <p className=" text-gray-500 mt-5">Tax included and shipping calculated at checkout</p>
          <div className=' text-center  text-base uppercase   hover:border-2  border-black  py-[12px]  font-bold  shadow-[5px_6px_rgb(166,222,205,1)] bg-[#4b7422] hover:text-black  hover:bg-white  text-white  w-full  mt-10 hover:shadow-black'>
            <Link to={`/paymentDetailSummary/addToCartCheckout/all_products`}  >proceed to checkout</Link>
          </div>
          <div className=' text-center  text-base uppercase hover:border-none border-2 border-gray-600  py-[12px]  font-bold hover:shadow-black  shadow-[5px_6px_rgb(166,222,205,1)] hover:text-blue-50  bg-white hover:bg-black text-black  w-full  mt-10'>
            <Link to={"/"}  > Continue Shopping</Link>
          </div>
        </div>
      </div >

      <div className={`${AddToCartData.length > 0 ? "hidden" : "flex"} justify-center my-28 `}>
        <div className=" w-full px-20 xl:px-0 xl:w-1/5 ">
          <p className=" text-gray-500 text-center">Your cart is empty</p>
          <div className='  text-center  text-base uppercase hover:border-none border-2 border-gray-600  py-[12px]  font-bold hover:shadow-black  shadow-[5px_6px_rgb(166,222,205,1)] hover:text-blue-50  bg-white hover:bg-black text-black  w-full  mt-10'>
            <Link to={"/"}  > Continue Shopping</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddToCart
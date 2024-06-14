import React, { useState, useEffect } from 'react'
import axios from "axios";
import logo from '../../img/YumiHerbalProduct.png';

// for current product 
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { calculateTotal } from '../../features/AddToCartSlice'

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { fetchProducts } from "../../features/productsFileHairSlice.js";

const serverUrl = import.meta.env.VITE_SERVER_URL;


function paymentDetailSummary() {


  // for current product 
  const dispatch = useDispatch();
  const param = useParams();
  let AddToCartData;
  const myName = useSelector((state) => state.ProductHairReducer);
  AddToCartData = useSelector(state => state.AddToCartReducer.addToCart);

  // use state top level
  const [inputState, setInputState] = useState({
    email: { visibleCheck: true, upLabel: false },
    countryName: { visibleCheck: true, upLabel: false },
    firstName: { visibleCheck: true, upLabel: false },
    lastName: { visibleCheck: true, upLabel: false },
    address: { visibleCheck: true, upLabel: false },
    city: { visibleCheck: true, upLabel: false },
    phoneNumber: { visibleCheck: true, upLabel: false },
    state: { visibleCheck: true, upLabel: false },
    pincode: { visibleCheck: true, upLabel: false },
  });

  // document se email ki value get nhi ho rhi tho state se karte hai
  const [email, setEmail] = useState('');
  const [mail, setMail] = useState(true);
  const [buyer, setBuyer] = useState({
    email: " ", country: " ", firstName: "", lastName: " ", city: "", state: "", pincode: " ", phone: " ", address: " ", order_id: " "
  })

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);



  const checkUpLabel = (n, inputId) => {
    setInputState(prevState => ({
      ...prevState,
      [inputId]: { visibleCheck: !!n, upLabel: !!n }
    }));

    if (inputId === "email") setEmail(n);
  };


  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setMail(regex.test(email));
  }




  useEffect(() => {
    if (buyer.order_id !== " ") {
      buyerDataStore();
    }
  }, [buyer.order_id]);




// store the buyer data
  let currentProduct;
  if(param.id !== "addToCartCheckout"){
    currentProduct = myName?.data?.data?.filter(element => element._id === param.id); 
  }
    // paise bhejne ka trika 
  const productNamesArray = param.id !== "addToCartCheckout"
    ? myName?.data?.data?.filter(element => element._id === param.id).map(item => ({
      _id: item._id,
      name: item.name,
      qyt: item.qyt
    })) || []
    : AddToCartData.map(item => ({
      _id: item._id,
      name: item.name,
      qyt: item.qyt
    }));






  


  const checkoutHandler = async (amount) => {
    const { data: { key } } = await axios.get(serverUrl + "/api/getkey")
    const { data: { order } } = await axios.post(serverUrl + "/api/checkout", {
      amount, productNamesArray
    })
    setBuyer((buyer) => ({ ...buyer, order_id: order.id }));


    const userFirstName = document.getElementById('firstName').value
    const userLastName = document.getElementById('lastName').value
    const userPhone = document.getElementById('phone').value

    const options = {
      key, // Enter the Key ID generated from the Dashboard
      amount: order.amount,
      currency: "INR",
      name: "Hennakart",
      description: "Test Transaction",
      image: logo,
      order_id: order.id,
      // collback_url important backend me hona chahiye
      callback_url: serverUrl + "/api/paymentVerification",
      prefill: {
        "name": userFirstName + userLastName,
        "email": email,
        "contact": userPhone
      },
      notes: {
        "address": "Razorpay Corporate Office"
      },
      theme: {
        "color": "#3399cc"
      }
    };
    const razor = new window.Razorpay(options);
    razor.open();
  }



  const buyerDataStore = async () => {
   await axios.post(serverUrl + "/api/storeBuyerData", buyer);
  }

 
   // when uesr click then page show on the top every time
   useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  if (myName.data === null) {
    return <h1>Loading........</h1>
  }
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setBuyer({ ...buyer, [name]: value });
  }

  // check all fiel are fill or not 
  const areAllFieldsFilled = () => {
    for (const field in inputState) {
      if (!inputState[field].upLabel) {
        return false;
      }
    }
    return true;
  };

 



  return (

    <div className='mt-14  border'>

      <form className='grid  lg:grid-cols-2 grid-cols-1 '>
        <div className="grid  gap-3 lg:ps-20 lg:pe-10 px-3 pt-14 border-r">
          {/* this is for email */}
          <div>
            <h1 className="text-2xl font-semibold mb-4">Contact</h1>
            <div className='relative'>
              <label htmlFor="email" className={`${inputState.email.upLabel ? 'top-2 text-[12px]' : ' top-[22px] text-sm'} absolute left-4 block   text-gray-700`}>Email or mobile phone number</label>
              <input value={buyer.email} onChange={(e) => { checkUpLabel(e.target.value, "email"); handleInputs(e) }} onBlur={(e) => validateEmail(e.target.value)} name='email' type="email" id="email" className="mt-1 text-base p-4 w-full border rounded-md outline-green-700" required />
              <p className={`text-red-500 text-sm px-4 ${mail ? "hidden" : "visible"}`}>Enter a valid Emaiil</p>
            </div>
          </div>
          {/* this is for Delivery */}
          <div className='grid gap-3'>
            <h1 className="text-2xl font-semibold mb-4">Delivery</h1>


            <div className='relative'>
              <label htmlFor="country" className={`${inputState.countryName.upLabel ? 'top-2 text-[12px]' : 'top-[22px] text-sm'} absolute left-4 block   text-gray-700`}>Country</label>
              <input value={buyer.country} onChange={(e) => { checkUpLabel(e.target.value, "countryName"); handleInputs(e) }} type="text" id="country" name="country" className="mt-1 text-base p-4 w-full border rounded-md outline-green-700" />
            </div>
            <div className='grid grid-cols-2 gap-3'>
              <div className='relative'>
                <label htmlFor="firstName" className={`${inputState.firstName.upLabel ? 'top-2 text-[12px]' : 'top-[22px] text-sm'} absolute left-4 block   text-gray-700`}>First Name</label>
                <input value={buyer.firstName} onChange={(e) => { checkUpLabel(e.target.value, "firstName"); handleInputs(e) }} type="text" id="firstName" name="firstName" className="mt-1 text-base p-4 w-full border rounded-md outline-green-700" />
                <p className={`text-red-500 text-sm  ${inputState.firstName.visibleCheck ? "hidden" : "visible"}`}>Enter first name</p>
              </div>
              <div className='relative'>
                <label htmlFor="lastName" className={`${inputState.lastName.upLabel ? 'top-2 text-[12px]' : 'top-[22px] text-sm'} absolute left-4 block   text-gray-700`}>Last Name</label>
                <input value={buyer.lastName} onChange={(e) => { checkUpLabel(e.target.value, "lastName"); handleInputs(e) }} type="text" id="lastName" name="lastName" className="mt-1 text-base p-4 w-full border rounded-md outline-green-700" />
                <p className={`text-red-500 text-sm  ${inputState.lastName.visibleCheck ? "hidden" : "visible"}`}>Enter last name</p>
              </div>
            </div>

            <div className='relative'>
              <label htmlFor="address" className={`${inputState.address.upLabel ? 'top-2 text-[12px]' : 'top-[22px] text-sm'} absolute left-4 block   text-gray-700`}>Address</label>
              <input value={buyer.address} onChange={(e) => { checkUpLabel(e.target.value, "address"); handleInputs(e) }} type="text" id="address" name="address" className="mt-1 text-base p-4 w-full border rounded-md outline-green-700" />
              <p className={`text-red-500 text-sm  ${inputState.address.visibleCheck ? "hidden" : "visible"}`}>Enter an address</p>
            </div>


            <div className='grid grid-cols-3 gap-3'>
              <div className='relative'>
                <label htmlFor="city" className={`${inputState.city.upLabel ? 'top-2 text-[12px]' : 'top-[22px] text-sm'} absolute left-4 block   text-gray-700`}>City</label>
                <input value={buyer.city} onChange={(e) => { checkUpLabel(e.target.value, "city"); handleInputs(e) }} type="text" id="city" name="city" className="mt-1 text-base p-4 w-full border rounded-md outline-green-700" />
                <p className={`text-red-500 text-sm  ${inputState.city.visibleCheck ? "hidden" : "visible"}`}>Enter city</p>

              </div>
              <div className='relative'>
                <label htmlFor="state" className={`${inputState.state.upLabel ? 'top-2 text-[12px]' : 'top-[22px] text-sm'} absolute left-4 block   text-gray-700`}>State</label>
                <input value={buyer.state} onChange={(e) => { checkUpLabel(e.target.value, "state"); handleInputs(e) }} type="text" id="state" name="state" className="mt-1 text-base p-4 w-full border rounded-md outline-green-700" />
                <p className={`text-red-500 text-sm  ${inputState.state.visibleCheck ? "hidden" : "visible"}`}>Enter state</p>

              </div>
              <div className='relative'>
                <label htmlFor="pincode" className={`${inputState.pincode.upLabel ? 'top-2 text-[12px]' : 'top-[22px] text-sm'} absolute left-4 block   text-gray-700`}>PIN Code</label>
                <input value={buyer.pincode} onChange={(e) => { checkUpLabel(e.target.value, "pincode"); handleInputs(e) }} type="text" id="pincode" name="pincode" className="mt-1 text-base p-4 w-full border rounded-md outline-green-700" />
                <p className={`text-red-500 text-sm  ${inputState.pincode.visibleCheck ? "hidden" : "visible"}`}>Enter pincode / zip code</p>

              </div>
            </div>
            <div className='relative'>
              <label htmlFor="phone" className={`${inputState.phoneNumber.upLabel ? 'top-2 text-[12px]' : 'top-[22px] text-sm'} absolute left-4 block   text-gray-700`}>Phone</label>
              <input value={buyer.phone} onChange={(e) => { checkUpLabel(e.target.value, "phoneNumber"); handleInputs(e) }} type="tel" id="phone" name="phone" className="mt-1 text-base p-4 w-full border rounded-md outline-green-700" />
              <p className={`text-red-500 text-sm  ${inputState.phoneNumber.visibleCheck ? "hidden" : "visible"}`}>Enter a phone number</p>

            </div>
            <div className='flex gap-3'>
              <input type="checkbox" name="saveInfo" id="saveInfo" />
              <label htmlFor="saveInfo">Save the information for the next time</label>
            </div>
          </div>

          {/* this is for shipping address */}
          <div>
            <h1 className="text-2xl font-semibold mb-4">Shipping method</h1>
            <div className='relative'>
              <label htmlFor="shippingAdd" className={`top-[22px] text-sm absolute left-4 block   text-gray-700`}>Enter your shipping address to view available shipping methods</label>
              <input onChange={(e) => checkUpLabel(e.target.value, "shippingAdd")} type="text" id="shippingAdd" className="mt-1 text-base p-4 w-full border rounded-md outline-green-700" readOnly />
            </div>
          </div>
          {/* this is for payment */}
          <div className='mt-5'>
            <h1 className="text-2xl font-semibold mt-2">Payment</h1>
            <p className='mb-3'>All transactions are secure and encrypted</p>
            <div className='border border-gray-200 '>
              <div className=' py-6 px-4 flex gap-3 border border-green-500 bg-gray-50'>
                <div className='flex gap-2'>
                  <input type="radio" name="selectPayment" id="selectPayment" />
                  <label htmlFor="selectPayment">Razorpay Secure (UPI, Cards, Wallets, NetBanking)</label>
                </div>
                <div>

                </div>
              </div>
              <div className=' flex flex-col justify-center items-center bg-gray-100 gap-6 pt-4'>
                <div>
                  <LazyLoadImage src="/images/Hennakart/creditCard.png" alt="" />
                </div>

                <p className='w-1/2 text-center text-sm pb-4'>After clicking “Pay now”, you will be redirected to Razorpay Secure (UPI, Cards, Wallets, NetBanking) to complete your purchase securely.</p>
              </div>
            </div>
          </div>
          {/* pay now button  */}
          <div className={`${window.innerWidth > 778 ? 'visible' : 'hidden'}`}>
            <button type='button' className='  w-full bg-green-800 bg-opacity-50 text-xl text-white rounded-md hover:bg-opacity-70  py-5 font-bold'

              onClick={() => {
                if (areAllFieldsFilled()) {
                  checkoutHandler(param.id === "addToCartCheckout" ? calculateTotal(AddToCartData) : currentProduct[0].price);
                }
              }}
            >Pay Now</button>
          </div>
        </div>

        <div className='lg:ps-10 lg:pe-32 px-3 lg:bg-gray-100 bg-white  pt-6'>
          {param.id === "addToCartCheckout" ? (
            <div>
              {AddToCartData.map((data) => (
                <div key={data._id} className={`flex  justify-between items-center mt-5`}>
                  <div className='relative'>
                    <LazyLoadImage className=' h-16 w-20 border border-gray-400 rounded-lg' src={`${serverUrl}/${data.image}`} alt="" />
                    <p className=" absolute -top-3 right-0 rounded-full bg-gray-700 flex justify-center items-center text-white w-5  h-5"> {data.qyt} </p>
                  </div>
                  <div><p className='text-center'>{data.name}</p></div>
                  <div>Rs. {data.price}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`flex  justify-between items-center`}>
              <div >
                <LazyLoadImage className=' h-16 w-20 border border-gray-400 rounded-lg' src={`${serverUrl}/${currentProduct[0].image}`} alt="" />
              </div>
              <div><p className='text-center'>{currentProduct[0].name}</p></div>
              <div>Rs. {currentProduct[0].price}</div>
            </div>
          )}

          <div className='flex justify-center mt-7 gap-4'>
            <input className=' border border-gray-300  rounded-md px-5 py-3 w-3/4' type="text" placeholder='Discount Code' />
            <button className=' border border-gray-300  rounded-md px-5 py-3 bg-gray-200'>Apply</button>
          </div>
          <div className='flex justify-between mt-7'>
            <div className='flex flex-col gap-y-2 '>
              <p className=' text-sm'>Subtotal</p>
              <p className=' text-sm'>Shipping</p>
              <p className='  text-xl'>Total</p>
              <p className=' text-sm text-gray-500'>Including Rs. 53.67 in taxes</p>
            </div>
            <div className='flex flex-col gap-y-2 text-end'>
              <p className='font-semibold'>Rs. {param.id === "addToCartCheckout" ? calculateTotal(AddToCartData) : currentProduct[0].price}</p>
              <p className='text-gray-500'>Enter shipping address</p>
              <p className='text-gray-500'>INR <span className='text-black text-xl font-semibold'>Rs. {param.id === "addToCartCheckout" ? calculateTotal(AddToCartData) : currentProduct[0].price}</span></p>
            </div>
          </div>
          <div className='visible lg:hidden mt-6' >
            <button type='button' className='w-full bg-green-800 bg-opacity-50 text-xl text-white rounded-md hover:bg-opacity-70  py-5 font-bold'
              onClick={() => {
                if (areAllFieldsFilled()) {
                  checkoutHandler(param.id === "addToCartCheckout" ? calculateTotal(AddToCartData) : currentProduct[0].price);
                }
              }}
            >Pay Now</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default paymentDetailSummary

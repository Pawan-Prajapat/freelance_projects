import React, { useState, useEffect } from 'react'
import axios from "axios";
import logo from '../../img/YumiHerbalProduct.png';

// for current product 
import { useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { calculateTotal } from '../../features/AddToCartSlice'

import { LazyLoadImage } from 'react-lazy-load-image-component';

const serverUrl = import.meta.env.VITE_SERVER_URL;


function paymentDetailSummary() {


  // for current product 
  const param = useParams();
  let AddToCartData;
  const myName = useSelector((state) => state.ProductHairReducer);
  AddToCartData = useSelector(state => state.AddToCartReducer.addToCart);
  let SingleProductData = useSelector(state => state.AddToCartReducer.singleProduct);

  console.log("SingleProductData",SingleProductData);

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
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(true); // Default to Razorpay
  const [buyer, setBuyer] = useState({
    "customerDetails": {
      email: "", country: " ", firstName: "", lastName: " ", city: "", state: "", pincode: " ", phone: " ", address: " "
    },
    "orderDetails": {
      "order_items": [],
      "total_amount": null,
      "payment_type": null
    }
  })


  useEffect(() => {
    setBuyer({
      ...buyer,
      orderDetails: {
        ...buyer.orderDetails,
        payment_type: selectedPaymentMethod
      }
    });
  }, [selectedPaymentMethod]);

  const handlePaymentChange = (event) => {
    const value = event.target.value === 'true';
    setSelectedPaymentMethod(value);
  };

  // get the variant data 

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





  // paise bhejne ka trika 
  // store the buyer data
  useEffect(() => {
    let updatedOrderItems = [];

    if (param.id !== "addToCartCheckout") {
      // Single product case
      updatedOrderItems = [
        {
          product_id: SingleProductData?.product_id,
          variant_id: SingleProductData?.variant._id,
          qty: SingleProductData?.qty // or set your desired quantity here
        }
      ];
      console.log("updatedOrderItems", SingleProductData);
    } else {
      // Multiple products case
      updatedOrderItems = AddToCartData.map(item => ({
        product_id: item.product_id,
        variant_id: item.variant._id,
        qty: item.qty
      }));
    }

    // Update the buyer state with the new order items
    setBuyer(prevBuyer => ({
      ...prevBuyer,
      orderDetails: {
        ...prevBuyer.orderDetails,
        order_items: updatedOrderItems,
        total_amount: calculateTotal(AddToCartData)
      }
    }));
  }, [param.id, param.variantId, myName, AddToCartData]);

  // call the checkoutHandler when the payment type  is razorpay 
  const checkoutHandler = async (order_id, amount) => {
    const { data: { key } } = await axios.get(serverUrl + "/api/getkey");
    const options = {
      key, // Enter the Key ID generated from the Dashboard
      amount,
      currency: "INR",
      name: "Hennakart",
      description: "Test Transaction",
      image: logo,
      order_id,
      // collback_url important backend me hona chahiye
      callback_url: serverUrl + "/api/paymentVerification",
      prefill: {
        "name": buyer.customerDetails.firstName + buyer.customerDetails.lastName,
        "email": buyer.customerDetails.email,
        "contact": buyer.customerDetails.phone
      },
      notes: {
        "address": "Razorpay Corporate Office"
      },
      theme: {
        "color": "#3399cc"
      }
    };
    const razor = new Razorpay(options);
    razor.open();
  }



  const buyerDataStore = async () => {
    await axios.post(serverUrl + "/api/storeBuyerData", buyer)
      .then(res => {
        if (res.data.razorpay_order_id != "no")
          checkoutHandler(res.data.razorpay_order_id, res.data.amount);
      })
      .catch(err => {
        console.error(err);
      })
  }


  // when uesr click then page show on the top every time
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  if (SingleProductData === null) {
    return <h1>Loading........</h1>
  }
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setBuyer({
      ...buyer,
      customerDetails: {
        ...buyer.customerDetails,
        [name]: value
      }
    });
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
              <input value={buyer.customerDetails.email} onChange={(e) => { checkUpLabel(e.target.value, "email"); handleInputs(e) }} onBlur={(e) => validateEmail(e.target.value)} name='email' type="email" id="email" className="mt-1 text-base p-4 w-full border rounded-md outline-green-700" required />
              <p className={`text-red-500 text-sm px-4 ${mail ? "hidden" : "visible"}`}>Enter a valid Emaiil</p>
            </div>
          </div>
          {/* this is for Delivery */}
          <div className='grid gap-3'>
            <h1 className="text-2xl font-semibold mb-4">Delivery</h1>


            <div className='relative'>
              <label htmlFor="country" className={`${inputState.countryName.upLabel ? 'top-2 text-[12px]' : 'top-[22px] text-sm'} absolute left-4 block   text-gray-700`}>Country</label>
              <input value={buyer.customerDetails.country} onChange={(e) => { checkUpLabel(e.target.value, "countryName"); handleInputs(e) }} type="text" id="country" name="country" className="mt-1 text-base p-4 w-full border rounded-md outline-green-700" />
            </div>
            <div className='grid grid-cols-2 gap-3'>
              <div className='relative'>
                <label htmlFor="firstName" className={`${inputState.firstName.upLabel ? 'top-2 text-[12px]' : 'top-[22px] text-sm'} absolute left-4 block   text-gray-700`}>First Name</label>
                <input value={buyer.customerDetails.firstName} onChange={(e) => { checkUpLabel(e.target.value, "firstName"); handleInputs(e) }} type="text" id="firstName" name="firstName" className="mt-1 text-base p-4 w-full border rounded-md outline-green-700" />
                <p className={`text-red-500 text-sm  ${inputState.firstName.visibleCheck ? "hidden" : "visible"}`}>Enter first name</p>
              </div>
              <div className='relative'>
                <label htmlFor="lastName" className={`${inputState.lastName.upLabel ? 'top-2 text-[12px]' : 'top-[22px] text-sm'} absolute left-4 block   text-gray-700`}>Last Name</label>
                <input value={buyer.customerDetails.lastName} onChange={(e) => { checkUpLabel(e.target.value, "lastName"); handleInputs(e) }} type="text" id="lastName" name="lastName" className="mt-1 text-base p-4 w-full border rounded-md outline-green-700" />
                <p className={`text-red-500 text-sm  ${inputState.lastName.visibleCheck ? "hidden" : "visible"}`}>Enter last name</p>
              </div>
            </div>

            <div className='relative'>
              <label htmlFor="address" className={`${inputState.address.upLabel ? 'top-2 text-[12px]' : 'top-[22px] text-sm'} absolute left-4 block   text-gray-700`}>Address</label>
              <input value={buyer.customerDetails.address} onChange={(e) => { checkUpLabel(e.target.value, "address"); handleInputs(e) }} type="text" id="address" name="address" className="mt-1 text-base p-4 w-full border rounded-md outline-green-700" />
              <p className={`text-red-500 text-sm  ${inputState.address.visibleCheck ? "hidden" : "visible"}`}>Enter an address</p>
            </div>


            <div className='grid grid-cols-3 gap-3'>
              <div className='relative'>
                <label htmlFor="city" className={`${inputState.city.upLabel ? 'top-2 text-[12px]' : 'top-[22px] text-sm'} absolute left-4 block   text-gray-700`}>City</label>
                <input value={buyer.customerDetails.city} onChange={(e) => { checkUpLabel(e.target.value, "city"); handleInputs(e) }} type="text" id="city" name="city" className="mt-1 text-base p-4 w-full border rounded-md outline-green-700" />
                <p className={`text-red-500 text-sm  ${inputState.city.visibleCheck ? "hidden" : "visible"}`}>Enter city</p>

              </div>
              <div className='relative'>
                <label htmlFor="state" className={`${inputState.state.upLabel ? 'top-2 text-[12px]' : 'top-[22px] text-sm'} absolute left-4 block   text-gray-700`}>State</label>
                <input value={buyer.customerDetails.state} onChange={(e) => { checkUpLabel(e.target.value, "state"); handleInputs(e) }} type="text" id="state" name="state" className="mt-1 text-base p-4 w-full border rounded-md outline-green-700" />
                <p className={`text-red-500 text-sm  ${inputState.state.visibleCheck ? "hidden" : "visible"}`}>Enter state</p>

              </div>
              <div className='relative'>
                <label htmlFor="pincode" className={`${inputState.pincode.upLabel ? 'top-2 text-[12px]' : 'top-[22px] text-sm'} absolute left-4 block   text-gray-700`}>PIN Code</label>
                <input value={buyer.customerDetails.pincode} onChange={(e) => { checkUpLabel(e.target.value, "pincode"); handleInputs(e) }} type="text" id="pincode" name="pincode" className="mt-1 text-base p-4 w-full border rounded-md outline-green-700" />
                <p className={`text-red-500 text-sm  ${inputState.pincode.visibleCheck ? "hidden" : "visible"}`}>Enter pincode / zip code</p>

              </div>
            </div>
            <div className='relative'>
              <label htmlFor="phone" className={`${inputState.phoneNumber.upLabel ? 'top-2 text-[12px]' : 'top-[22px] text-sm'} absolute left-4 block   text-gray-700`}>Phone</label>
              <input value={buyer.customerDetails.phone} onChange={(e) => { checkUpLabel(e.target.value, "phoneNumber"); handleInputs(e) }} type="tel" id="phone" name="phone" className="mt-1 text-base p-4 w-full border rounded-md outline-green-700" />
              <p className={`text-red-500 text-sm  ${inputState.phoneNumber.visibleCheck ? "hidden" : "visible"}`}>Enter a phone number</p>

            </div>
            {/* <div className='flex gap-3'>
              <input type="checkbox" name="saveInfo" id="saveInfo" />
              <label htmlFor="saveInfo">Save the information for the next time</label>
            </div> */}
          </div>

          {/* this is for shipping address */}
          {/* <div>
            <h1 className="text-2xl font-semibold mb-4">Shipping method</h1>
            <div className='relative'>
              <label htmlFor="shippingAdd" className={`top-[22px] text-sm absolute left-4 block   text-gray-700`}>Enter your shipping address to view available shipping methods</label>
              <input onChange={(e) => checkUpLabel(e.target.value, "shippingAdd")} type="text" id="shippingAdd" className="mt-1 text-base p-4 w-full border rounded-md outline-green-700" readOnly />
            </div>
          </div> */}
          {/* this is for payment */}

          <div className='mt-5'>
            <h1 className="text-2xl font-semibold mt-2">Payment</h1>
            <p className='mb-3'>All transactions are secure and encrypted</p>

            <label>
              <div className={`py-6 px-4 flex gap-3 border ${selectedPaymentMethod ? 'border-green-500' : ''}  bg-gray-50`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={true}
                  checked={selectedPaymentMethod === true}
                  onChange={handlePaymentChange}
                />
                <p>Razorpay Secure (UPI, Cards, Wallets, NetBanking)</p>
              </div>
              <div className={`${selectedPaymentMethod ? '' : 'hidden'} flex flex-col justify-center items-center bg-gray-100 gap-6 pt-4`}>
                <div>
                  <LazyLoadImage src="/images/Hennakart/creditCard.png" alt="" />
                </div>

                <p className='w-1/2 text-center text-sm pb-4'>After clicking “Pay now”, you will be redirected to Razorpay Secure (UPI, Cards, Wallets, NetBanking) to complete your purchase securely.</p>
              </div>
            </label>
            <label>
              <div className={`py-6 px-4 flex gap-3 border ${selectedPaymentMethod ? '' : 'border-green-500'}  bg-gray-50`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={false}
                  checked={selectedPaymentMethod === false}
                  onChange={handlePaymentChange}
                />
                <p>Cash on Delivery (COD)</p>
              </div>
            </label>
          </div>


          {/* pay now button  */}
          <div className={`${window.innerWidth > 778 ? 'visible' : 'hidden'}`}>
            <button type='button' className={` w-full bg-green-800 bg-opacity-50 text-xl text-white rounded-md hover:bg-opacity-70  py-5 font-bold ${!areAllFieldsFilled() ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={!areAllFieldsFilled()}
              onClick={() => {
                if (areAllFieldsFilled()) {
                  buyerDataStore();
                }
              }}
            >{selectedPaymentMethod ? (
              <p>pay now</p>
            ) : (
              <p>place order</p>
            )}</button>
          </div>
        </div>

        {/* for mobile */}
        <div className='lg:ps-10 lg:pe-32 px-3 lg:bg-gray-100 bg-white  pt-6'>
          {param.id === "addToCartCheckout" ? (
            <div>
              {AddToCartData.map((data) => (
                <div key={data._id} className={`flex  justify-between items-center mt-5`}>
                  <div className='relative'>
                    <LazyLoadImage className=' h-16 w-20 border border-gray-400 rounded-lg' src={`${serverUrl}/${data.image}`} alt="" />
                    <p className=" absolute -top-3 right-0 rounded-full bg-gray-700 flex justify-center items-center text-white w-5  h-5"> {data.qty} </p>
                  </div>
                  <div><p className='text-center'>{data.title}</p></div>
                  <div>Rs. {data.variant.price}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`flex  justify-between items-center`}>
              <div >
                <LazyLoadImage className=' h-16 w-20  border border-gray-400 rounded-lg' src={`${serverUrl}${SingleProductData?.image}`} alt={`${serverUrl}${SingleProductData?.image}`} />
              </div>
              <div><p className='text-center'>{SingleProductData?.title}</p></div>
              <div>Rs. {SingleProductData?.variant.price}</div>
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
              <p className='font-semibold'>Rs. {param.id === "addToCartCheckout" ? buyer.orderDetails.total_amount : SingleProductData?.variant.price}</p>
              <p className='text-gray-500'>Enter shipping address</p>
              <p className='text-gray-500'>INR <span className='text-black text-xl font-semibold'>Rs. {param.id === "addToCartCheckout" ? buyer.orderDetails.total_amount : SingleProductData?.variant.price}</span></p>
            </div>
          </div>
          <div className='visible lg:hidden mt-6' >
            <button type='button' className='w-full bg-green-800 bg-opacity-50 text-xl text-white rounded-md hover:bg-opacity-70  py-5 font-bold'
              onClick={() => {
                if (areAllFieldsFilled()) {
                  buyerDataStore();
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

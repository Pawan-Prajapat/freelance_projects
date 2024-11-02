import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import logo from '../../img/YumiHerbalProduct.png';
  import { SiWhatsapp } from "react-icons/si";

export default function Footer() {
  const location = useLocation();
  if (location.pathname === '/admin' || location.pathname.startsWith('/admin')) {
    return null;
  }
  return (
    <footer className="bg-[#4b7422]  pt-10 mt-14 mb-3">
      <div className=" mx-auto flex flex-col md:flex-row justify-between px-5">
        <div className="w-full text-white md:w-auto text-center md:text-left">
          <div>
            <img src={logo} alt="" className='bg-white px-5 py-1 mb-6 border-t-[4px] border-b-[6px] border-l-[4px] border-e-[6px] border-orange-500 rounded-lg'  height={50} width={200} />
            <p className='leading-relaxed'>Krins Henna Products</p>
            <p className="leading-relaxed">
              BERA MAYLAT,SOJAT CITY (306104)
              <br />
              PALI RAJASTHAN INDIA.
              <br />
            </p>
            <p className="mt-2">
              Call us: <a href="tel:+919256432475">(+91) 92564-32475 </a> <br />
              Email: <a href="mailto:CAREYUMIMEHANDI@GMAIL.COM">-CAREYUMIMEHANDI@GMAIL.COM</a>
            </p>
          </div>
          <div className='my-6' >
            <h1 className=' uppercase font-bold text-lg py-4'>stay connected</h1>
            <ul className='flex gap-7 my-5 justify-start'>
              <li><a href="https://www.facebook.com/share/AxaBm8gAJd7YEtKL/?mibextid=qi2Omg"><FaFacebookF className='  w-8 h-8' /></a></li>
              <li><a href="https://www.instagram.com/yumimehandi1/"><AiFillInstagram className=' w-10 h-10' /></a></li>
            </ul>
          </div>
        </div>
        <div className="w-full md:w-auto text-center md:text-left mt-5 md:mt-0">
          <p className="text-lg font-bold mb-1  uppercase text-white">Shop</p>
          <ul className="list-unstyled  ">
            <li className="my-3">
              <Link to="/henna/all_henna" className="text-white hover:underline underline-offset-4">
                Henna
              </Link>
            </li>

            <li className="my-3">
              <Link to="/essentialOil/all_oil" className="text-white c hover:underline underline-offset-4">
                Essential Oil
              </Link>
            </li>

            <li className="my-3">
              <Link to="/face_care" className="text-white hover:underline underline-offset-4">
                Face Care
              </Link>
            </li>

            <li className="my-3">
              <Link to="/hair_care" className="text-white hover:underline underline-offset-4">
                Hair Care
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-auto text-center md:text-left mt-5 md:mt-0">
          <h2 className="text-lg font-bold text-white mb-4 uppercase ">quick Link</h2>
          <ul className=" ">

            <li className="my-3">
              <Link to="/About" className="text-white hover:underline underline-offset-4">
                About Us
              </Link>
            </li>

            <li className="my-3">
              <Link to="/faq" className="text-white hover:underline underline-offset-4">
                FAQ
              </Link>
            </li>

            <li className="my-3">
              <a href="#" className="text-white hover:underline underline-offset-4">
                Blog
              </a>
            </li>
            <li className="my-3">
              <Link to="Contact" className="text-white hover:underline underline-offset-4">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-auto text-center md:text-left mt-5 md:mt-0">
          <h2 className="text-lg font-bold text-white mb-4 uppercase">Customer service</h2>
          <ul className="list-unstyled ">
            <li className="my-3">
              <Link to="/Tearms_Service" className=" text-white hover:underline underline-offset-4">
                Terms and Conditions
              </Link>
            </li>
            <li className="my-3">
              <Link to="/privacy_policy" className=" text-white hover:underline underline-offset-4">
                Privacy Policy
              </Link>
            </li>
            <li className="my-3">
              <Link to="/Refund_Return" className=" text-white hover:underline underline-offset-4">
                Refund & Return Policy
              </Link>
            </li>
            <li className="my-3">
              <Link to="/Shipping_Policy" className=" text-white hover:underline underline-offset-4">
                Shipping Policy
              </Link>
            </li>

          </ul>
        </div>
        <div className=" md:w-80 text-center md:text-left w-full mt-5 md:mt-0">
          <h2 className="text-lg font-bold text-white mb-4 uppercase">Newsletter sign up</h2>
          <p className='text-white'>Receive  our latest updates about our products and promotions.</p>
          <div className="flex justify-center flex-col">
            <input
              type="email"
              placeholder="Enter your email"
              className="   border-2 border-gray-400 outline-none  py-3 px-4 w-full mt-3 mb-5"
            />
            <button className="bg-black font-bold text-lg hover:bg-white hover:text-black text-gray-50  py-3 px-4 mb-5  w-full">
              SUBMIT
            </button>
          </div>
        </div>
      </div>
      <div className='bg-green-600 w-12 h-12 fixed bottom-5 right-5 rounded-full flex justify-center items-center'>
        <a href="https://wa.me/919256432475"><SiWhatsapp className=' text-white w-8 h-8' /></a>
      </div>
      <div className=" text-left text-white text-base mt-16 px-3">
        &copy; {new Date().getFullYear()} Yumi mehendi India.
      </div>
    </footer>
  )
}
import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { GrPinterest } from "react-icons/gr";
import { AiFillYoutube } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  if(location.pathname === '/admin' || location.pathname.startsWith('/admin')){
    return null ;
  }
  return (
    <footer className="bg-white mt-24 mb-3">
      <div className=" mx-auto flex flex-col md:flex-row justify-between px-5">
        <div className="w-full md:w-auto text-center md:text-left">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-green-700 ">Yumi mehendi</h2>
            <p className="leading-relaxed">
              grow with organic <br />
              Kile Ghati, Near Rajput Hostel <br />
              Sojat, RJ 306104, <br />
              India
            </p>
            <p className="mt-2">
              Call us: (+91)-98274-62558 <br />
              Email: support@Yumi mehendistore.com
            </p>
          </div>
          <div className='my-6' >
            <h1 className='text-green-800 uppercase font-bold text-lg py-4'>stay connected</h1>
            <ul className='flex gap-7 my-5 justify-center'>
              <li><Link to="/"><FaFacebookF className=' text-green-900 w-8 h-8' /></Link></li>
              <li><Link to="/"><AiFillInstagram className='text-green-900 w-10 h-10' /></Link></li>
              <li><Link to="/"><GrPinterest className='text-green-900 w-8 h-8' /></Link></li>
              <li><Link to="/"><AiFillYoutube className='text-green-900 w-10 h-10' /></Link></li>
              <li><Link to="/"><BsTwitter className=' text-green-900 w-10 h-10' /></Link></li>
            </ul>
          </div>
        </div>
        <div className="w-full md:w-auto text-center md:text-left mt-5 md:mt-0">
          <p className="text-lg font-bold mb-1  uppercase text-green-700">Shop</p>
          <ul className="list-unstyled  ">
            <li className="my-3">
              <a href="#" className="text-gray-800 hover:underline underline-offset-4">
                All Products
              </a>
            </li>

            <li className="my-3">
              <a href="#" className="text-gray-800 hover:underline underline-offset-4">
                Hennas
              </a>
            </li>

            <li className="my-3">
              <a href="#" className="text-gray-800 hover:underline underline-offset-4">
                Free Trial
              </a>
            </li>

            <li className="my-3">
              <a href="#" className="text-gray-800 hover:underline underline-offset-4">
                New Launched
              </a>
            </li>
            <li className="my-3">
              <a href="#" className="text-gray-800 hover:underline underline-offset-4">
                Brands
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-auto text-center md:text-left mt-5 md:mt-0">
          <h2 className="text-lg font-bold text-green-700 mb-4 uppercase ">quick Link</h2>
          <ul className=" ">

            <li className="my-3">
              <a href="#" className=" text-gray-800  hover:underline underline-offset-4">
                About Us
              </a>
            </li>

            <li className="my-3">
              <a href="#" className="text-gray-800 hover:underline underline-offset-4">
                FAQ
              </a>
            </li>

            <li className="my-3">
              <a href="#" className="text-gray-800 hover:underline underline-offset-4">
                Blog
              </a>
            </li>
            <li className="my-3">
              <a href="#" className="text-gray-800 hover:underline underline-offset-4">
                Careers
              </a>
            </li>
            <li className="my-3">
              <a href="#" className="text-gray-800 hover:underline underline-offset-4">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-auto text-center md:text-left mt-5 md:mt-0">
          <h2 className="text-lg font-bold text-green-700 mb-4 uppercase">Customer service</h2>
          <ul className="list-unstyled ">
            <li className="my-3">
              <a href="#" className=" text-gray-800 hover:underline underline-offset-4">
                Search
              </a>
            </li>
            <li className="my-3">
              <a href="#" className=" text-gray-800 hover:underline underline-offset-4">
                Terms Of Service
              </a>
            </li>
            <li className="my-3">
              <a href="#" className=" text-gray-800 hover:underline underline-offset-4">
                Privacy Policy
              </a>
            </li>
            <li className="my-3">
              <a href="#" className=" text-gray-800 hover:underline underline-offset-4">
                Refund & Return Policy
              </a>
            </li>
            <li className="my-3">
              <a href="#" className=" text-gray-800 hover:underline underline-offset-4">
                Shipping Policy
              </a>
            </li>

          </ul>
        </div>
        <div className=" md:w-80 text-center md:text-left w-full mt-5 md:mt-0">
          <h2 className="text-lg font-bold text-green-700 mb-4 uppercase">Newsletter sign up</h2>
          <p>Receive  our latest updates about our products and promotions.</p>
          <div className="flex justify-center flex-col">
            <input
              type="email"
              placeholder="Enter your email"
              className="   border-2 border-gray-400 outline-none  py-3 px-4 w-full mt-3 mb-5"
            />
            <button className="bg-[#4b7422] font-bold text-lg hover:bg-white hover:text-black text-gray-50  py-3 px-4 mb-5  w-full">
              SUBMIT
            </button>
          </div>
        </div>
      </div>
      <div className=" text-left text-green-700 text-base mt-16 px-3">
        @ {new Date().getFullYear()} Yumi mehendi India. Powered By
        Sociallab Pro.
      </div>
    </footer>
  )
}
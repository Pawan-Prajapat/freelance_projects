
import React, { useRef, useState } from "react";
import { MdEmail } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import emailjs from "@emailjs/browser";
import { MdClose } from "react-icons/md";


const ContactPage = () => {
    const form = useRef();
    const [showSuccess, setShowSuccess] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_6yw7bno', 'template_z24ahlp', form.current, {
                publicKey: 'EwA8429R1OGBLMzD_',
            })

            .then(
                () => {
                    setShowSuccess(true); // Show success message
                    form.current.reset(); // Reset the form fields
                    setTimeout(() => setShowSuccess(false), 3000); // Hide after 3 seconds
                },
                (error) => {
                    console.log("FAILED...", error.text);
                }
            );
    };

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between mx-auto max-w-6xl mt-6 p-6 ">
                <div className="w-full md:w-1/2">
                    <h2 className="text-2xl font-semibold font-serif mb-4">CONTACT</h2>
                    <p className="mb-4 text-gray-500">Have a question?</p>
                    <form ref={form} onSubmit={sendEmail}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="user_name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="phone">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="user_phone"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="email">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="user_email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="comment">
                                Comment <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="comment"
                                rows="4"
                                name="message"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-orange-800 text-white font-medium hover:bg-orange-900 focus:outline-none"
                        >
                            Submit Contact
                        </button>
                    </form>

                    {/* Success message */}
                    {showSuccess && (
                        <div className="mt-4 fixed z-[1002] bg-white shadow-xl top-28 gap-3 h-14 px-6 text-center flex items-center rounded-md border-t-4 border-green-600 right-16 text-green-600">
                            <p>Email has been sent successfully!</p>
                            <MdClose className=" text-black h-6 w-6 hover:cursor-pointer" onClick={() => setShowSuccess(false)}/>
                        </div>
                    )}
                </div>

                <div className="w-full md:w-1/3 mt-8 md:mt-0 flex flex-col  justify-center">
                    <h3 className="text-lg font-semibold mb-4">Get in Touch!</h3>
                    <p className="mb-4 text-gray-600">
                        We'd love to hear from you - please use the form to send us your
                        message or ideas. Or simply pop in for a cup of fresh tea and a
                        cookie:
                    </p>
                    <ul className="mb-4">
                        <li className="flex items-center mb-2">
                            <IoIosCall className="h-5 w-5" />
                            <span className="font-medium mx-2">CALL:</span>
                            <a href="tel:+919256432475">(+91) 92564-32475</a>
                        </li>
                        <li className="flex items-center mb-2">
                            <MdEmail className=" h-5 w-5" />
                            <span className="font-medium mx-2">EMAIL:</span>
                            <a href="mailto:CAREYUMIMEHANDI@GMAIL.COM">CAREYUMIMEHANDI@GMAIL.COM</a>
                        </li>
                    </ul>
                    <address className="mb-4 not-italic ">
                        <p> BERA MAYLAT,SOJAT CITY (306104)</p>
                        <p>PALI RAJASTHAN INDIA.</p>
                    </address>
                    <div>
                        <h4 className="font-medium">Opening Hours:</h4>
                        <p>MON to SAT: 9:00AM - 10:00PM</p>
                        <p>SUN: 10:00AM - 6:00PM</p>
                    </div>
                </div>
            </div>

            {/* map  */}
            <div className="w-full lg:h-[500px] h-[300px]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14352.474958962832!2d73.6705953!3d25.9313257!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3969e97724f821d3%3A0x5f77cff10a3d6254!2sYumi%20Mehandi%20-%20Manufacturer%20%26%20Henna%20Exporter!5e0!3m2!1sen!2sin!4v1723209626898!5m2!1sen!2sin"
                    className="w-full h-full"
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
        </>
    );
};

export default ContactPage;

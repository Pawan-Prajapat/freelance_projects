import React, { startTransition , useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { useNavigate , useParams } from "react-router-dom";
import { FaCopy } from 'react-icons/fa';

export default function Congratulation() {
    const { width, height } = useWindowSize();
    const navigate = useNavigate();

    const { Order_Id } = useParams();

    const handleClick = () => {
        startTransition(() => {
            navigate("/");
        });
    };

    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(Order_Id);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset the copied status after 2 seconds
    };

    return (
        <div className='relative flex flex-col items-center justify-center h-screen bg-gradient-to-r from-lime-50 to-green-100'>
            <Confetti
                width={width}
                height={height}
            />
            <div className="absolute top-1/3 text-center p-4 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-lg max-w-lg w-full">
                <p className="text-3xl md:text-4xl font-bold text-lime-900">
                    Your order was successfully placed!
                </p>
                <p className="text-lg md:text-xl text-gray-700">
                    Thank you for choosing <button className="underline text-lime-700" onClick={handleClick}>Hennakart</button>
                </p>
                <button
                    onClick={handleClick}
                    className='mt-4 px-6 py-3 bg-lime-900 text-white text-lg md:text-xl font-bold rounded-full hover:bg-lime-800 transition duration-300'
                >
                    Continue Shopping
                </button>
            </div>
            <div className="absolute top-28 lg:top-16  p-4 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-lg max-w-lg w-full flex items-center justify-center">
                <div className="px-4 py-2 flex  items-center justify-center font-semibold text-xl" >{Order_Id}</div>
                <button
                    className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    onClick={copyToClipboard}
                >
                    <FaCopy className="mr-2" />
                    {copied ? 'Copied!' : 'Copy Order ID'}
                </button>
            </div>
        </div>
    );
}

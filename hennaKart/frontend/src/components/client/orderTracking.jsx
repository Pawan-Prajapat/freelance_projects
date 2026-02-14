
import React, { useState } from 'react';
import axios from 'axios';

const serverUrl = import.meta.env.VITE_SERVER_URL;

const OrderTracking = () => {
    const [orderId, setOrderId] = useState('');
    const [error, setError] = useState('');
    const [showOrderMessage, setShowOrderMessage] = useState(false);
    const [trackingType, setTrackingType] = useState('order_id'); // default tracking type

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors

        if (!orderId) {
            setError('Please enter an Order ID or AWB Code');
            return;
        }

        try {
            if (trackingType === 'awb_code') {
                console.log("trackingType");
                window.location.href = `https://yumimehandi.shiprocket.co/tracking/${orderId}`;
            } else {
                const response = await axios.get(`${serverUrl}/api/order_exist/${orderId}`);
                if (response.status === 201) {
                    setShowOrderMessage(true);
                } else if (response.status === 202) {
                    window.location.href = `https://yumimehandi.shiprocket.co/tracking/order/${orderId}`;
                } else if (response.data.awb_code) {
                    window.location.href = `https://yumimehandi.shiprocket.co/tracking/${response.data.awb_code}`;
                }
            }
        } catch (err) {
            setError('Order ID or AWB Code not found');
        }
    };

    return (
        <div className="flex justify-center items-center flex-col py-9 gap-4 bg-gray-100">
            <div className={`${showOrderMessage ? '' : 'hidden'} font-semibold text-2xl`}>
                Your Order Created...
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-semibold mb-4">Track your Order</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Search By:</label>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                                <input 
                                    type="radio" 
                                    name="trackingType" 
                                    value="order_id" 
                                    checked={trackingType === 'order_id'} 
                                    onChange={() => setTrackingType('order_id')} 
                                    className="mr-2" 
                                /> 
                                Order ID
                            </label>
                            <label className="flex items-center">
                                <input 
                                    type="radio" 
                                    name="trackingType" 
                                    value="awb_code" 
                                    checked={trackingType === 'awb_code'} 
                                    onChange={() => setTrackingType('awb_code')} 
                                    className="mr-2" 
                                /> 
                                AWB Code
                            </label>
                        </div>
                    </div>

                    <div className="mb-4">
                        <input
                            type="text"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            placeholder={`Enter your ${trackingType === 'order_id' ? 'Order ID' : 'AWB Code'}`}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OrderTracking;

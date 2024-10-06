import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const serverUrl = import.meta.env.VITE_SERVER_URL;

function OrderWithCustomerDetail() {
    const param = useParams();
    const token = useSelector((state) => state.TokenReducer.token);
    const [customer, setCustomer] = useState(null);
    const [showInputs, setShowInputs] = useState(false);
    const [formData, setFormData] = useState({
        length: '',
        breadth: '',
        height: '',
        weight: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        axios.get(`${serverUrl}/api/customerData/${Number(param.order_number)}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                setCustomer(response.data);
            })
            .catch(error => console.error(error));
    }, [param.order_number, token]);

    if (!customer) return <div className="text-center mt-20 text-gray-500">Loading...</div>;

    const { modified_order, customer: customerDetails, prevOrders } = customer;

    const handle_shiprocket_order = () => {
        const order_number = param.order_number;
        axios.post(`${serverUrl}/api/fullfilment`, {
            order_number,
            ...formData
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                // Handle success
            })
            .catch(error => {
                // Handle error
            });
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-5xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {/* Current Order Box */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-bold mb-4 text-indigo-600">Current Order</h2>
                    <p className="mb-2 text-gray-700"><strong>Order Number:</strong> {modified_order.order_number}</p>
                    <p className="mb-2 text-gray-700"><strong>Status:</strong> {modified_order.status}</p>
                    <p className="mb-2 text-gray-700"><strong>Payment Status:</strong> {modified_order.payment_status}</p>
                    <p className="mb-2 text-gray-700"><strong>Payment Type:</strong> {modified_order.payment_type === "true" ? "Razorpay" : "Cod"}</p>
                    <p className="mb-2 text-gray-700"><strong>Total Amount:</strong> ₹{modified_order.total_amount}</p>
                    <p className="mb-2 text-gray-700"><strong>Discount Amount:</strong> ₹{modified_order.discount_amount}</p>
                    <p className="mb-2 text-gray-700"><strong>Discount Cupon:</strong> {modified_order.discount_cupon}</p>
                    <p className="mb-2 text-gray-700"><strong>Final Amount:</strong> {modified_order.total_amount - modified_order.discount_amount}</p>
                    <div className="mt-4">
                        <h3 className="font-semibold text-gray-800">Items:</h3>
                        <ul className="list-disc list-inside ml-4 text-gray-700">
                            {modified_order.order_items.map((item, index) => (
                                <li key={index} className="mb-1">
                                    Product ID: {item.product_name} | Qty: {item.qty} | Total: ₹{item.qty * item.variant_price} 
                                     | Product weight : {item.variant_weight} gm
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button
                        onClick={() => setShowInputs(true)}
                        className="bg-indigo-600 text-white rounded-lg px-4 py-2 mt-4 hover:bg-indigo-700 transition-colors duration-300"
                    >
                        Fulfillment Order
                    </button>

                    {showInputs && (
                        <div className="mt-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Length (in CMs must be more than 0.5)</label>
                                <input
                                    type="text"
                                    name="length"
                                    value={formData.length}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Breadth (in CMs must be more than 0.5)</label>
                                <input
                                    type="text"
                                    name="breadth"
                                    value={formData.breadth}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Height (in CMs must be more than 0.5)</label>
                                <input
                                    type="text"
                                    name="height"
                                    value={formData.height}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Weight (in KGs must be more than 0)</label>
                                <input
                                    type="text"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <button
                                onClick={handle_shiprocket_order}
                                className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 transition-colors duration-300"
                            >
                                Submit Fulfillment
                            </button>
                        </div>
                    )}
                </div>

                {/* Customer Details Box */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-bold mb-4 text-indigo-600">Customer Details</h2>
                    <p className="mb-2 text-gray-700"><strong>Name:</strong> {customerDetails.firstName} {customerDetails.lastName}</p>
                    <p className="mb-2 text-gray-700"><strong>Email:</strong> {customerDetails.email}</p>
                    <p className="mb-2 text-gray-700"><strong>Phone:</strong> {customerDetails.phone}</p>
                    <p className="mb-2 text-gray-700"><strong>Address:</strong> {customerDetails.address}</p>
                    <p className="mb-2 text-gray-700"><strong>Pincode:</strong> {customerDetails.pincode}</p>
                    <p className="mb-2 text-gray-700"><strong>City:</strong> {customerDetails.city}</p>
                    <p className="mb-2 text-gray-700"><strong>State:</strong> {customerDetails.state}</p>
                    <p className="mb-2 text-gray-700"><strong>Country:</strong> {customerDetails.country}</p>
                </div>

                {/* Previous Orders Box */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-bold mb-4 text-indigo-600">Previous Orders</h2>
                    {prevOrders.length > 0 ? (
                        <ul className="list-disc list-inside ml-4 text-gray-700">
                            {prevOrders.map((order, index) => (
                                <li key={index} className="mb-2">
                                    <strong>Date:</strong> {order.createdAt} - <strong>Items:</strong> {order.items.map(item => `${item.product_name} (${item.qty} x ₹${item.price})`).join(', ')}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No previous orders.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OrderWithCustomerDetail;

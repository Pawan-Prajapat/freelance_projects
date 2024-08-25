import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const serverUrl = import.meta.env.VITE_SERVER_URL;

function OrderWithCustomerDetail() {
    const param = useParams();
    const token = useSelector((state) => state.TokenReducer.token);
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        axios.get(`${serverUrl}/api/customerData/${Number(param.order_number)}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                setCustomer(response.data);
                console.log("response.data" , response.data);
            })
            .catch(error => console.error(error));
    }, [param.order_number, token]);

    if (!customer) return <div>Loading...</div>;

    const { current_order, customer: customerDetails, prevOrders } = customer;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-5xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {/* Current Order Box */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Current Order</h2>
                    <p className="mb-2"><strong>Order Number:</strong> {current_order.order_number}</p>
                    <p className="mb-2"><strong>Status:</strong> {current_order.status}</p>
                    <p className="mb-2"><strong>Payment Status:</strong> {current_order.payment_status}</p>
                    <p className="mb-2"><strong>Payment Type:</strong> {current_order.payment_type ? <p>Razorpay</p> : <p>Cod</p> }</p>
                    <p className="mb-2"><strong>Total Amount:</strong> ₹{current_order.total_amount}</p>
                    <div className="mt-4">
                        <h3 className="font-semibold">Items:</h3>
                        <ul className="list-disc list-inside">
                            {current_order.order_items.map((item, index) => (
                                <li key={index}>
                                    {item.product_id}: {item.qty} x ₹{item.variant_id} = ₹{item.qty * item.variant_id}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Customer Details Box */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Customer Details</h2>
                    <p className="mb-2"><strong>Name:</strong> {customerDetails.firstName} {customerDetails.lastName}</p>
                    <p className="mb-2"><strong>Email:</strong> {customerDetails.email}</p>
                    <p className="mb-2"><strong>Phone:</strong> {customerDetails.phone}</p>
                    <p className="mb-2"><strong>Address:</strong> {customerDetails.address}</p>
                    <p className="mb-2"><strong>Pincode:</strong>  {customerDetails.pincode}</p>
                    <p className="mb-2"><strong>City:</strong> {customerDetails.city}</p>
                    <p className="mb-2"><strong>State:</strong> {customerDetails.state}</p>
                    <p className="mb-2"><strong>Country:</strong>{customerDetails.country}</p>
                </div>

                {/* Previous Orders Box */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Previous Orders</h2>
                    {prevOrders.length > 0 ? (
                        <ul className="list-disc list-inside">
                            {prevOrders.map((order, index) => (
                                <li key={index} className="mb-2">
                                    <strong>Date:</strong> {order.createdAt} - <strong>Items:</strong> {order.items.map(item => `${item.product_name} (${item.qty} x ₹${item.price})`).join(', ')}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No previous orders.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OrderWithCustomerDetail;

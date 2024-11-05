import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

const serverUrl = import.meta.env.VITE_SERVER_URL;

function Order() {
    const [data, setData] = useState([]);
    const token = useSelector((state) => state.TokenReducer.token);

    useEffect(() => {
        axios.get(`${serverUrl}/api/orderData`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setData(response.data.reverse());
            })
            .catch((error) => console.error(error));
    }, [token]);

    function formatDate(mongoDateStr) {
        const date = new Date(mongoDateStr);
        const options = {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        return date.toLocaleString('en-US', options).replace(',', ' at');
    }


    return (
        <div className="flex flex-col p-4 bg-gray-100">
            <div className="overflow-x-auto">
                <div className="py-4 align-middle inline-block min-w-full">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 bg-white">
                            <thead className="bg-gray-200">
                                <tr>
                                    {['Order', 'Date', 'Customer', 'Total', 'Payment Status', 'Fulfillment Status', 'Items', 'Delivery Status'].map((heading) => (
                                        <th
                                            key={heading}
                                            scope="col"
                                            className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider"
                                        >
                                            {heading}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.length > 0 ? (
                                    data.map((user, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-gray-100 transition duration-300 ease-in-out"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700">
                                                <Link to={`/admin/orderDetail/${user.order_number}`} className="text-blue-600 hover:underline">
                                                    {`#${user.order_number}`}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700">
                                                {formatDate(user.createdAt)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700">
                                                {user.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700">
                                                {user.total_amount}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700">
                                                {user.payment_status}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700">
                                                {user.status}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700">
                                                {user.order_items.length}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700">
                                                {user.delivery_status}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                                            No orders available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;

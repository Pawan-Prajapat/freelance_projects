import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

const serverUrl = import.meta.env.VITE_SERVER_URL;

function Order() {
    const [data, setData] = useState([]);
    const token = useSelector((state) => state.TokenReducer.token);
    useEffect(() => {
        axios.get(serverUrl + "/api/orderData",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(response => {
                setData(response.data)
            })
            .catch(error => console.error(error));
    }, []);

    function formatDate(mongoDateStr) {
        const date = new Date(mongoDateStr);
        const options = {
            month: 'short', // Abbreviated month (e.g., "Aug")
            day: 'numeric', // Day of the month (e.g., "20")
            hour: 'numeric', // Hour (e.g., "3")
            minute: 'numeric', // Minute (e.g., "46")
            hour12: true, // 12-hour clock (true for AM/PM)
        };

        const formattedDate = date.toLocaleString('en-US', options);
        return formattedDate.replace(',', ' at'); // Replace comma with " at"
    }

    return (
        <div className={`flex flex-col`}>
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="ps-3 py-3 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Order
                                    </th>
                                    <th
                                        scope="col"
                                        className="ps-3 py-3 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Date
                                    </th>
                                    <th
                                        scope="col"
                                        className="ps-3 py-3 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Customer
                                    </th>
                                    <th
                                        scope="col"
                                        className="ps-3 py-3 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Total
                                    </th>
                                    <th
                                        scope="col"
                                        className="ps-3 py-3 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Payment status
                                    </th>
                                    <th
                                        scope="col"
                                        className="ps-3 py-3 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Fulfillment status
                                    </th>
                                    <th
                                        scope="col"
                                        className="ps-3 py-3 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Items
                                    </th>
                                    <th
                                        scope="col"
                                        className="ps-3 py-3 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Delivery status
                                    </th>

                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data &&
                                    data.map((user, index) => (
                                        <Link to={`/admin/orderDetail/${user.order_number}`}>
                                            <tr key={index} >
                                                <td className="ps-3 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                                                    <div className="text-sm leading-5">{`#${user.order_number}`}</div>
                                                </td>
                                                <td className="ps-3 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                                                    <div className="text-sm leading-5">{formatDate(user.createdAt)}</div>
                                                </td>
                                                <td className="ps-3 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                                                    <div className="text-sm leading-5">{user.name}</div>
                                                </td>
                                                <td className="ps-3 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                                                    <div className="text-sm leading-5">{user.total_amount}</div>
                                                </td>
                                                <td className="ps-3 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                                                    <div className="text-sm leading-5">{user.payment_status}</div>
                                                </td>
                                                {/* yha fulfilment ka karna hai      */}
                                                <td className="ps-3 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                                                    <div className="text-sm leading-5">{user.status}</div>
                                                </td>
                                                <td className="ps-3 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                                                    <div className="text-sm leading-5">{user.order_items.length}</div>
                                                </td>
                                                {/* yeh bhi shiproket ki tafse karna hai  */}
                                                <td className="ps-3 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                                                    <div className="text-sm leading-5">{user.status}</div>
                                                </td>

                                            </tr>
                                        </Link>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order
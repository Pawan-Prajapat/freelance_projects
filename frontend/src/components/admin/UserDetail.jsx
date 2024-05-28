import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const serverUrl = import.meta.env.VITE_SERVER_URL;

function UserDetail() {
    const [data, setData] = useState(null);
    const token = useSelector((state) => state.TokenReducer.token);
    useEffect(() => {
        axios.get(serverUrl + "/api/checkPaymentStatus",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(response => {
                setData(response.data)
                console.log(response.data)
            })
            .catch(error => console.error(error));
    }, []);
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
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="ps-3 py-3 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="ps-3 py-3 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Address
                                    </th>
                                    <th
                                        scope="col"
                                        className="ps-3 py-3 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Pincode
                                    </th>
                                    <th
                                        scope="col"
                                        className="ps-3 py-3 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        City
                                    </th>
                                    <th
                                        scope="col"
                                        className="ps-3 py-3 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        State
                                    </th>
                                    <th
                                        scope="col"
                                        className="ps-3 py-3 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Country
                                    </th>
                                    <th
                                        scope="col"
                                        className="ps-3 py-3 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Phone
                                    </th>
                                    <th
                                        scope="col"
                                        className="ps-3 py-3 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Order Id
                                    </th>
                                    <th
                                        scope="col"
                                        className="ps-3 py-3 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Payment Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data &&
                                    data.map((user, index) => (
                                        <tr key={index}>
                                            <td className="ps-3 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                                                <div className="text-sm leading-5">{user.firstName + " " + user.lastName}</div>
                                            </td>
                                            <td className="ps-3 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                                                <div className="text-sm leading-5">{user.email}</div>
                                            </td>
                                            <td className="ps-6 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                                                <div className="text-sm leading-5">{user.address}</div>
                                            </td>
                                            <td className="ps-3 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                                                <div className="text-sm leading-5">{user.pincode}</div>
                                            </td>
                                            <td className="ps-3 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                                                <div className="text-sm leading-5">{user.city}</div>
                                            </td>
                                            <td className="ps-3 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                                                <div className="text-sm leading-5">{user.state}</div>
                                            </td>
                                            <td className="ps-3 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                                                <div className="text-sm leading-5">{user.country}</div>
                                            </td>
                                            <td className="ps-3 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                                                <div className="text-sm leading-5">{user.phone}</div>
                                            </td>
                                            <td className="ps-3 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                                                <div className="text-sm leading-5">{user.order_id}</div>
                                            </td>
                                            <td className="ps-3 py-4 text-center whitespace-no-wrap border-b border-gray-200">
                                                <div className="text-sm leading-5">{user.payment_data.length > 0 ? 'Done' : 'Pendding'}</div>
                                            </td>

                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetail
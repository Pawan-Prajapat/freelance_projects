import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
const serverUrl = import.meta.env.VITE_SERVER_URL;
function UserPaymentDetail() {
  const token = useSelector((state)=> state.TokenReducer.token)
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get(serverUrl + "/api/getPaymentDetails",
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
                    className="ps-10 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Order id
                  </th>
                  <th
                    scope="col"
                    className="ps-10 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Payment id
                  </th>

                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data &&
                  data.map((user, index) => (
                    <tr key={index}>

                      <td className="ps-10 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="text-sm leading-5">{user.razorpay_order_id}</div>
                      </td>
                      <td className="ps-10 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="text-sm leading-5">{user.razorpay_payment_id
                        }</div>
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

export default UserPaymentDetail
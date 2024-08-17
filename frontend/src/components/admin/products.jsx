import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const serverUrl = import.meta.env.VITE_SERVER_URL;

function Users() {
  const [data, setData] = useState(null);
  const [refreshOnAnyOperation, setRefreshOnAnyOperation] = useState(true);
  const token = useSelector((state) => state.TokenReducer.token);
  useEffect(() => {
    axios.get(serverUrl + "/api/getAllProductData",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response => setData(response.data.data))
      .catch(error => console.error(error));
  }, [refreshOnAnyOperation]);

  const deleteProduct = async (id) => {
    await axios.delete(serverUrl + "/api/deleteProductData",
      {
        data: { id }
      }).then(res => {
        setRefreshOnAnyOperation(!refreshOnAnyOperation);
        console.log("Delete successfully");
      })
      .catch(err => {
        console.log(err);
      });
  }
  const [_id, set_id] = useState('');
  const [updateDisplay, setUpdateDisplay] = useState(false);



  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [subCategroies, setsubCategroies] = useState('');
  const [categroies, setcategroies] = useState('');
  const [qyt, setQyt] = useState('');



  return (
    <>
      <div className={`flex flex-col ${updateDisplay ? ' blur-lg' : ''}`}>
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
                      title
                    </th>

                    <th
                      scope="col"
                      className="ps-3 py-3 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Categories
                    </th>
                    <th
                      scope="col"
                      className="ps-3 py-3 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Subcategories
                    </th>

                    <th
                      scope="col"
                      className=" py-3  text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                    >
                      total stock
                    </th>
                    <th
                      scope="col"
                      className="ps-3 py-3 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                    >

                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data &&
                    data.map((product, index) => (
                      <tr key={index}>
                        <td className=" text-center ps-3 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5">{product.title}</div>
                        </td>
                        <td className=" text-center ps-3 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5">{product.category}</div>
                        </td>
                        <td className=" text-center ps-3 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5">{product.subCategory}</div>
                        </td>
                        <td className=" text-left ps-10 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5">{product.qty}</div>
                        </td>
                        <td className="pe-3 py-4 whitespace-no-wrap gap-5 flex border-gray-200">
                          <div className="text-sm cursor-pointer leading-5"><Link to={`/admin/ProductFormForUpdate/${product._id}`}>
                            <MdEdit className='w-5 h-5' />
                          </Link></div>
                          <div onClick={() => deleteProduct(product._id)} className="text-sm leading-5 cursor-pointer"><RiDeleteBin6Line className='  w-5 h-5' /></div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Users;
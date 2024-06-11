import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';


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
    await axios.post(serverUrl + "/api/deleteProductData",
      { id }).then(res => {
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
  const setProductIdUpdate = async (id) => {
    set_id(id);
    await axios.post(serverUrl + "/api/getSingleProductData", {
      _id: id
    }).then(res => {
      const product = res.data.data;
      setName(product.name); setDescription(product.description); setPrice(product.price); setsubCategroies(product.subCategroies); setcategroies(product.categroies); setQyt(product.qyt);
    })
    setUpdateDisplay(true);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const intPrice = parseInt(price.toString() + '.0');
    const intQyt = parseInt(qyt.toString() + '.0');
    await axios.post(serverUrl + "/api/updateProductData", {
      _id,
      name,
      price: intPrice,
      subCategroies,
      image,
      categroies,
      qyt: intQyt,
      description
    })
      .then(res => {
        setRefreshOnAnyOperation(!refreshOnAnyOperation);
        setName(''); setDescription(''), setPrice(''); setsubCategroies(''); setImage(''); setcategroies(''); setQyt('');
      })
      .catch(err => {
        console.log(err);
      });
  }
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
                      Name
                    </th>
                    <th
                      scope="col"
                      className="ps-3 py-3 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="ps-3 py-3 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
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
                      className="ps-3 py-3 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="ps-3 py-3 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantity
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
                          <div className="text-sm leading-5">{product.name}</div>
                        </td>
                        <td className=" text-center ps-3 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5">{product.description}</div>
                        </td>
                        <td className=" text-center ps-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5">{product.price}</div>
                        </td>
                        <td className=" text-center ps-3 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5">{product.categroies}</div>
                        </td>
                        <td className=" text-center ps-3 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5">{product.subCategroies}</div>
                        </td>
                        <td className=" text-center ps-3 py-4 whitespace-no-wrap border-b border-gray-200">
                          <img src={`http://localhost:4000/${product.image}`} alt={product.name} className="h-10 w-10" />
                        </td>
                        <td className=" text-left ps-10 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5">{product.qyt}</div>
                        </td>
                        <td className="pe-3 py-4 whitespace-no-wrap gap-5 flex border-gray-200">
                          <div onClick={() => setProductIdUpdate(product._id)} className="text-sm cursor-pointer leading-5"><MdEdit className='  w-5 h-5' /></div>
                          <div onClick={() => deleteProduct(product.id)} className="text-sm leading-5 cursor-pointer"><RiDeleteBin6Line className='  w-5 h-5' /></div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className={`w-[500px] absolute top-[120px] left-[40%] ${updateDisplay ? 'visible overflow-auto' : 'hidden'}`}>
        <div className=' cursor-pointer flex justify-end' onClick={() => setUpdateDisplay(false)}>
          <IoCloseOutline className='h-8 w-8' />
        </div>
        <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Price
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="number" value={price} onChange={e => setPrice(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subCategroies">
              Sub categroies
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="subCategroies" type="text" value={subCategroies} onChange={e => setsubCategroies(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categroies">
              categroies
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="categroies" type="text" value={categroies} onChange={e => setcategroies(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="qyt">
              Qyt
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="qyt" type="number" value={qyt} onChange={e => setQyt(e.target.value)} />
          </div>
          <div className="flex items-center justify-between">
            <button onClick={() => setUpdateDisplay(false)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Users;
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategroies } from '../../features/categroiesSubCategroiesSlice.js';
import axios from 'axios';
const serverUrl = import.meta.env.VITE_SERVER_URL;
function insertProducts() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [subCategroies, setsubCategroies] = useState('');
    const [image, setImage] = useState('');
    const [categroies, setcategroies] = useState([]);
    const [qyt, setQyt] = useState('');
    // see categroies options on click
    const [showCategroies , setShowCategroies] = useState(0);

    const showTheSubmenuOnHoverFunc = () => {
        setShowCategroies(!showCategroies);
    }


    // for the categroies and subcategroies 
    const dispatch = useDispatch();
    const myName = useSelector((state) => state.CategroiesReducer);

    useEffect(() => {
        dispatch(fetchCategroies());
    }, [dispatch]);

    let categroiesFromSlice;
    let subcategroiesFromSlice;
    let count = 0;
    let count1 = 0;
    if (myName.data) {
        categroiesFromSlice = myName.data.data.filter((element) => element.which === "categroies");
        subcategroiesFromSlice = myName.data.data.filter((element) => element.which === "subCategroies");
        count = subcategroiesFromSlice.length;
        count1 = categroiesFromSlice.length;
    }
    // get the token for authorization
    const token = useSelector((state) => state.TokenReducer.token);
    const onSubmit = async (e) => {
        e.preventDefault();
        const intPrice = parseInt(price.toString() + '.0');
        const intQyt = parseInt(qyt.toString() + '.0');

        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', intPrice)
        formData.append('subCategroies', subCategroies)
        formData.append('image', image)
        formData.append('categroies', categroies)
        formData.append('qyt', intQyt)
        formData.append('description', description)
        await axios.post(serverUrl + "/api/storeProductData", formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
            .then(res => {
                setName(''); setDescription(''), setPrice(''); setsubCategroies(''); setImage(''); setcategroies([]); setQyt('');
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
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
                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="subCategroies" value={subCategroies} onChange={e => setsubCategroies(e.target.value)}>
                    {
                        count !== 0 && (
                            <option value="" disabled> choose the subcategroies</option>
                        )
                    }
                    {
                        count > 0 ? (
                            subcategroiesFromSlice.map((subcategroy, index) => (
                                <option key={index} value={subcategroy.value}>
                                    {subcategroy.value}
                                </option>
                            ))) : (
                            <option value="" disabled> add the subcategroies</option>
                        )
                    }
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                    Image
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image" type="file" onChange={e => setImage(e.target.files[0])} />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categroies">
                    categroies
                </label>
                <div className="relative">
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="categroies"
                        value={categroies.join(', ')}
                        readOnly
                        onClick={() => showTheSubmenuOnHoverFunc()}
                    />
                    <div className={`absolute top-0 right-0 px-2 py-1 bg-gray-200 rounded`}>
                        {categroies.map((categroy, index) => (
                            <span key={index} className="mr-2">
                                {categroy}
                                <button
                                    type="button"
                                    className="ml-1 text-gray-600 hover:text-gray-900"
                                    onClick={() => {
                                        const newCategroies = categroies.filter(item => item !== categroy);
                                        setcategroies(newCategroies);
                                    }}
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                    <ul className={`${showCategroies ? '' : 'hidden'} absolute h-44 overflow-y-auto  left-0 w-full bg-white shadow-md`}>
                        {count1 > 0 ? (
                            categroiesFromSlice.map((categroy, index) => (
                                <li key={index} className="px-4 py-2 hover:bg-gray-100">
                                    <button
                                        type="button"
                                        className="w-full text-left"
                                        onClick={() => {
                                            const newCategroies = [...categroies, categroy.value];
                                            setcategroies(newCategroies);
                                        }}
                                    >
                                        {categroy.value}
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-2">No categroies available</li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="mb-4 ">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="qyt">
                    Qyt
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="qyt" type="number" value={qyt} onChange={e => setQyt(e.target.value)} />
            </div>
            <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Submit
                </button>
            </div>
        </form>
    );
}

export default insertProducts
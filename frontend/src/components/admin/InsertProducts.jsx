import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
const serverUrl = import.meta.env.VITE_SERVER_URL;
function insertProducts() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [subCategroies, setsubCategroies] = useState('');
    const [image, setImage] = useState('');
    const [categroies, setcategroies] = useState('');
    const [qyt, setQyt] = useState('');

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
                setName(''); setDescription(''), setPrice(''); setsubCategroies(''); setImage(''); setcategroies(''); setQyt('');
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
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="subCategroies" type="text" value={subCategroies} onChange={e => setsubCategroies(e.target.value)} />
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
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="categroies" type="text" value={categroies} onChange={e => setcategroies(e.target.value)} />
            </div>
            <div className="mb-4">
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
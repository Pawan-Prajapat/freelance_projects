import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategroies } from '../../features/categroiesSubCategroiesSlice.js';
import axios  from 'axios';
const serverUrl = import.meta.env.VITE_SERVER_URL;

function Categories() {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const myName = useSelector((state) => state.CategroiesReducer);
    const token = useSelector((state) => state.TokenReducer.token);

    useEffect(() => {
        dispatch(fetchCategroies());
    }, [dispatch ]);

    if (myName.data === null) {
        return <div>Loading...</div>;
    }

    const selectedcategroiesData = myName.data.data.filter((element) => element.which === "categroies");



    const addCategryHandler = async (e) => {
        e.preventDefault();
        const data = {
            which: 'categroies',
            value: input
          };
        
        await axios.post(serverUrl + "/api/storeCategroiesData", JSON.stringify(data),
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(res => {
                setInput('');
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
    };
    const removeCategryHandler = async (_id) => {
        const data = {
            _id
          };
        
        await axios.post(serverUrl + "/api/deleteCategroiesData", JSON.stringify(data),
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(res => {
                setInput('');
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <>
            <form onSubmit={addCategryHandler}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categroies">
                        categroies
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="categroies"
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
            <div>Categroies</div>
            <div>
                {selectedcategroiesData.length > 0 ? (
                    selectedcategroiesData.map((categry) => (
                        <li key={categry._id}>
                            {categry.value}
                            <button onClick={() => removeCategryHandler(categry._id)}> X </button>
                        </li>
                    ))
                ) : (
                    <div>No categroies Add categroies</div>
                )}
            </div>
        </>
    );
}

export default Categories;
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh








import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const userAuthentication = createAsyncThunk('userAuthentication',async()=>{ 
    try {
        const response = await fetch(serverUrl + "/api/user",{
            method : "GET",
            headers : {
                Authorization : `Bearer ${token}`,
            }
        });
        if(response.ok){
            const data = await response.json();
            
        }
        
    } catch (error) {
        console.error("Error fetching  user data");
    }
})


const setTokenFunc = (token) => {
    localStorage.setItem("HennaKartToken", token);
};

const tokenFeatureSlice = createSlice({
    name: "Token",
    initialState: {
        token: localStorage.getItem("HennaKartToken") || "",
    },
    reducers: {
        addTokenOnLocal: (state, action) => {
            const token = action.payload;
            state.token = token; // Update state.token
            setTokenFunc(token);
        },
        removeTokenOnLocal: (state) => {
            state.token = ""; // Clear state.token
            localStorage.removeItem("HennaKartToken");
        },
    },
});

export const { addTokenOnLocal, removeTokenOnLocal } = tokenFeatureSlice.actions;
export default tokenFeatureSlice.reducer;


// for remove the free return tag from product whole  page 


import { IoShieldHalfSharp } from "react-icons/io5";

{/* <div className="w-full">
                    <div className='flex items-end gap-3 mt-3'>
                        <IoShieldHalfSharp className='w-6 h-6' />
                        <p className='text-green-700 mt-3 font-pawan font-semibold'>Free Returns</p>
                        <FaQuestionCircle className='w-5 h-5 text-gray-300' />
                    </div>
                    <p className='text-gray-500 mt-2'>Learn More.</p>
                </div> */}

remove the review 

import { IoIosStar } from "react-icons/io";
 <div className='flex items-center gap-2'>
                        <p className='flex text-gray-200 gap-1'>
                            {Array.from({ length: 5 }, (_, i) => (
                                <IoIosStar key={i} />
                            ))}
                        </p>
                        <span className='text-gray-400'>No Review</span>
                    </div>







insert product 

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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="multipleImages">
                    Multiple Images
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="multipleImages" type="file" multiple onChange={handleMultipleImagesChange} />
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="qty">
                    Qyt
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="qty" type="number" value={qty} onChange={e => setQyt(e.target.value)} />
            </div>
            <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Submit
                </button>
            </div>
        </form>















        // check this code and select in porduct form jsx file 
        const handleFormSubmit = (e) => {
        e.preventDefault();

        const productData = new FormData();
        productData.append('title', titleRef.current.value);
        productData.append('description', desc_content);
        productData.append('subCategory', categoryRef.current.value);
        productData.append('category', categroies);

        variants.forEach((variant, index) => {
            productData.append(`variants[${index}][sku]`, variant.sku);
            productData.append(`variants[${index}][price]`, variant.price);
            productData.append(`variants[${index}][qty]`, variant.qty);
            productData.append(`variants[${index}][weight]`, variant.weight);
            if(isEditMode){
                productData.append(`variants[${index}][_id]` , variant._id);
            }
        });

        media.forEach((file, index) => {
            productData.append(`media`, file);
        });
        if (isEditMode) {
            productData.append('_id', productId);

            axios.patch(`${serverUrl}/api/product`, productData)
                .then(response => {
                    console.log('Success: update the product');
                })
                .catch(error => {
                    console.error('Error:', error.response?.data || error.message);
                });

        } else {
            axios.post(`${serverUrl}/api/product`, productData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }
    };


and compare with 

const handleFormSubmit = (e) => {
        e.preventDefault();

        // Validation checks
        if (!titleRef.current.value.trim()) {
            setErrorMessage('Please fill out the title.');
            return;
        }

        if (categroies.length === 0) {
            setErrorMessage('Please select at least one category.');
            return;
        }

        if (!categoryRef.current.value) {
            setErrorMessage('Please select a subcategory.');
            return;
        }

        if (variants.length === 0) {
            setErrorMessage('Please add at least one variant.');
            return;
        }

        setErrorMessage('');

        const productData = new FormData();
        productData.append('title', titleRef.current.value);
        productData.append('description', desc_content);
        productData.append('subCategory', categoryRef.current.value);
        productData.append('category', categroies);

        variants.forEach((variant, index) => {
            productData.append(`variants[${index}][sku]`, variant.sku);
            productData.append(`variants[${index}][price]`, variant.price);
            productData.append(`variants[${index}][qty]`, variant.qty);
            productData.append(`variants[${index}][weight]`, variant.weight);
            if (isEditMode) {
                productData.append(`variants[${index}][_id]`, variant._id);
            }
        });

        media.forEach((file, index) => {
            productData.append(`media`, file);
        });

        const submitRequest = isEditMode
            ? axios.patch(`${serverUrl}/api/product`, productData)
            : axios.post(`${serverUrl}/api/product`, productData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

        submitRequest
            .then(response => {
                setSuccessMessage(isEditMode ? 'Product updated successfully!' : 'Product created successfully!');
                setButtonShow(false);
            })
            .catch(error => {
                console.error('Error:', error.response?.data || error.message);
                setErrorMessage('An error occurred while submitting the form.');
            });
    };
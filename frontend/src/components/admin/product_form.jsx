import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategroies } from '../../features/categroiesSubCategroiesSlice.js';
import Description_image_upload from './description_image_upload';
import JoditEditor from 'jodit-react';
import axios from 'axios';
const serverUrl = import.meta.env.VITE_SERVER_URL;
import { useParams } from 'react-router-dom';
function ProductForm() {
    const { productId } = useParams();
    const [product, setProduct] = useState([]);
    const [isEditMode, setEditMode] = useState(false);
    useEffect(() => {
        // Fetch data using productId and set to state
        const fetchProduct = async () => {
            await axios.post(serverUrl + "/api/getSingleProductData", {
                _id: productId
            }).then(res => {
                setProduct(res.data.data);
                setEditMode(true);
            })
        };
        if (productId) {
            fetchProduct();
        }

    }, [productId]);
    const titleRef = useRef(null);
    const categoryRef = useRef(null);
    const editor = useRef(null);
    const [variants, setVariants] = useState([]);
    const [media, setMedia] = useState([]);
    const [desc_content, setDesc_Content] = useState('');
    const [buttonShow, setButtonShow] = useState(true);

    const [categroies, setcategroies] = useState([]);
    const [showCategroies, setShowCategroies] = useState(false);

    // Determine if the form is in create or update mode

    // Fetch categories and subcategories using Redux
    const dispatch = useDispatch();
    const myName = useSelector((state) => state.CategroiesReducer);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchCategroies());
        };
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if (isEditMode) {
            titleRef.current.value = product.title;
            categoryRef.current.value = product.category;
            console.log("category check kro " , categoryRef.current.value);
            console.log("category check kro " , product.category);
            console.log("title check kro " , titleRef.current.value);
            setDesc_Content(product.description || '');
            setVariants(product.variants || []);
            setMedia(product.media || []);
        }
    }, [isEditMode, product]);

    let categroiesFromSlice = [];
    let subcategroiesFromSlice = [];
    if (myName.data) {
        categroiesFromSlice = myName.data.data.filter((element) => element.which === "categroies");
        subcategroiesFromSlice = myName.data.data.filter((element) => element.which === "subCategroies");
    }

    // Get the token for authorization
    const token = useSelector((state) => state.TokenReducer.token);

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

    const handleVariantChange = (index, event) => {
        const { name, value } = event.target;
        const newVariants = [...variants];
        newVariants[index] = { ...newVariants[index], [name]: value };
        setVariants(newVariants);
    };

    const addVariant = () => {
        setVariants([...variants, { sku: '', price: '', qty: '', weight: '' }]);
    };

    const removeVariant = (index) => {
        setVariants(variants.filter((_, i) => i !== index));
    };

    const handleMediaChange = (e) => {
        const files = Array.from(e.target.files);
        setMedia([...media, ...files]);
    };

    const removeMedia = (index) => {
        setMedia(media.filter((_, i) => i !== index));
    };

    const handleCategoryClick = (category) => {
        if (!categroies.includes(category)) {
            setcategroies([...categroies, category]);
        }
        setShowCategroies(false);
    };

    const handleCategoryRemove = (category) => {
        setcategroies(categroies.filter((cat) => cat !== category));
    };

    const config = useMemo(() => ({
        readonly: false,
        placeholder: 'Write your description which helps to grow your business...',
        toolbarSticky: false,
        buttons: [
            'bold', 'italic', 'underline', 'strikethrough', 'eraser', 'ul', 'ol', '|',
            'image', '|',
            'align', 'undo', 'redo', '|',
            'hr', 'eraser', 'fullsize'
        ]
    }), []);

    return (
        <form onSubmit={handleFormSubmit} className="space-y-8 p-8 bg-white shadow-lg rounded-lg">
            {/* Product Title */}
            <div className="space-y-2">
                <label className="block text-gray-700 text-sm font-semibold" htmlFor="title">
                    Title
                </label>
                <input
                    type="text"
                    name="title"
                    ref={titleRef}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {/* Product Category */}
            <div className="space-y-2">
                <label className="block text-gray-700 text-sm font-semibold" htmlFor="category">
                    Category
                </label>
                <div className="relative">
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                        value={categroies.join(', ')}
                        readOnly
                        onClick={() => setShowCategroies(!showCategroies)}
                    />
                    <ul className={`absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto ${showCategroies ? '' : 'hidden'}`}>
                        {categroiesFromSlice.length > 0 ? (
                            categroiesFromSlice.map((category, index) => (
                                <li key={index} className="hover:bg-gray-100">
                                    <button
                                        type="button"
                                        className="w-full px-4 py-2 text-gray-700 text-left"
                                        onClick={() => handleCategoryClick(category.value)}
                                    >
                                        {category.value}
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-2 text-gray-600">No categories available</li>
                        )}
                    </ul>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                    {categroies.map((category, index) => (
                        <span key={index} className="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                            {category}
                            <button
                                type="button"
                                className="ml-2 text-gray-600 hover:text-gray-900"
                                onClick={() => handleCategoryRemove(category)}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            {/* Product Subcategory */}
            <div className="space-y-2">
                <label className="block text-gray-700 text-sm font-semibold" htmlFor="subcategory">
                    Subcategory
                </label>
                <select
                    name="subcategory"
                    ref={categoryRef}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="" disabled>Select a subcategory</option>
                    {subcategroiesFromSlice.length > 0 ? (
                        subcategroiesFromSlice.map((subcategroy, index) => (
                            <option key={index} value={subcategroy.value}>
                                {subcategroy.value}
                            </option>
                        ))
                    ) : (
                        <option value="" disabled>No subcategories available</option>
                    )}
                </select>
            </div>

            {/* Product Media */}
            <div className="space-y-2">
                <label className="block text-gray-700 text-sm font-semibold" htmlFor="media">
                    Media
                </label>
                <input
                    type="file"
                    name="media"
                    multiple
                    onChange={handleMediaChange}
                    className="w-full text-sm text-gray-500 border border-gray-300 rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 file:py-2 file:px-4 file:rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                    {media.map((file, index) => (
                        <div key={index} className="relative">
                            {/* <img
                                src={URL.createObjectURL(file)}
                                alt={`media-preview-${index}`}
                                className="w-24 h-24 object-cover rounded-lg"
                            /> */}
                            <button
                                type="button"
                                onClick={() => removeMedia(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Variants */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Variants</h3>
                {variants.map((variant, index) => (
                    <div key={index} className="p-4 border border-gray-300 rounded-lg shadow-sm space-y-2">
                        <label className="block text-gray-700 text-sm font-semibold">
                            Variant SKU
                            <input
                                type="text"
                                name="sku"
                                value={variant.sku}
                                onChange={(event) => handleVariantChange(index, event)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </label>
                        <label className="block text-gray-700 text-sm font-semibold">
                            Variant Price
                            <input
                                type="text"
                                name="price"
                                value={variant.price}
                                onChange={(event) => handleVariantChange(index, event)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </label>
                        <label className="block text-gray-700 text-sm font-semibold">
                            Variant Qty
                            <input
                                type="text"
                                name="qty"
                                value={variant.qty}
                                onChange={(event) => handleVariantChange(index, event)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </label>
                        <label className="block text-gray-700 text-sm font-semibold">
                            Variant Weight
                            <input
                                type="text"
                                name="weight"
                                value={variant.weight}
                                onChange={(event) => handleVariantChange(index, event)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </label>
                        <button
                            type="button"
                            onClick={() => removeVariant(index)}
                            className="text-red-500 hover:text-red-700"
                        >
                            Remove Variant
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addVariant}
                    className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
                >
                    Add Variant
                </button>
            </div>

            {/* Description Image Upload */}
            <Description_image_upload />

            {/* Product Description */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">Description</h2>
                <JoditEditor
                    className='h-64'
                    ref={editor}
                    value={desc_content}
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) => setDesc_Content(newContent)}
                    onChange={(newContent) => { setDesc_Content(newContent) }}
                />
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex justify-center">
                <button
                    className={`bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-700 ${buttonShow ? '' : 'hidden'}`}
                    onClick={() => setButtonShow(!buttonShow)}
                    type="submit"
                >
                    {isEditMode ? 'Update Product' : 'Create Product'}
                </button>
            </div>
        </form>
    );
}

export default ProductForm;

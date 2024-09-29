import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategroies } from '../../features/categroiesSubCategroiesSlice.js';
import Description_image_upload from './description_image_upload';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const serverUrl = import.meta.env.VITE_SERVER_URL;

function ProductForm() {
    const { productId } = useParams();
    const [product, setProduct] = useState([]);
    const [isEditMode, setEditMode] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [imageUrl, setImageUrl] = useState(''); // State to handle input value


    useEffect(() => {
        const fetchProduct = async () => {
            await axios.post(serverUrl + "/api/getSingleProductData", {
                _id: productId
            }).then(res => {
                setProduct(res.data.data);
                setEditMode(true);
            });
        };
        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    useEffect(() => {
        if (errorMessage || successMessage) {
            const timer = setTimeout(() => {
                setErrorMessage('');
                setSuccessMessage('');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage, successMessage])

    const titleRef = useRef(null);
    const codRef = useRef(null);
    const categoryRef = useRef(null);
    const editor = useRef(null);
    const [variants, setVariants] = useState([]);
    const [media, setMedia] = useState([]);
    const [desc_content, setDesc_Content] = useState('');
    const [buttonShow, setButtonShow] = useState(true);

    const [categroies, setcategroies] = useState([]);
    const [showCategroies, setShowCategroies] = useState(false);

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
            codRef.current.value = product.cod ? "Allow" : "Not Allow";
            categoryRef.current.value = product.subCategory;
            setDesc_Content(product.description || '');
            setVariants(product.variants || []);
            setMedia(product.media || []);
            setcategroies(product.category || []);
        }
    }, [isEditMode, product]);

    let categroiesFromSlice = [];
    let subcategroiesFromSlice = [];
    if (myName.data) {
        categroiesFromSlice = myName.data.data.filter((element) => element.which === "categroies");
        subcategroiesFromSlice = myName.data.data.filter((element) => element.which === "subCategroies");
    }

    const token = useSelector((state) => state.TokenReducer.token);
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
        categroies.forEach((category, index) => {
            productData.append(`category[${index}]`, category); // Use `media[${index}]` as the key
        });

        variants.forEach((variant, index) => {
            productData.append(`variants[${index}][sku]`, variant.sku);
            productData.append(`variants[${index}][price]`, variant.price);
            productData.append(`variants[${index}][qty]`, variant.qty);
            productData.append(`variants[${index}][weight]`, variant.weight);
            if (isEditMode) {
                productData.append(`variants[${index}][_id]`, variant._id);
            }
        });
        // Append media
        media.forEach((url, index) => {
            productData.append(`media[${index}]`, url); // Use `media[${index}]` as the key
        });

        productData.append('cod', codRef.current.value);


        if (isEditMode) {
            productData.append('_id', productId);

            axios.patch(`${serverUrl}/api/product`, productData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    setSuccessMessage('Product updated successfully!');
                    setButtonShow(false);
                })
                .catch(error => {
                    setErrorMessage('Server error on product update!');
                });

        } else {
            axios.post(`${serverUrl}/api/product`, productData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    setSuccessMessage('Product created successfully!');
                    setButtonShow(false);
                })
                .catch(err => {
                    setErrorMessage('Server error on product created!');
                });
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

    // Handle URL input change
    const handleUrlChange = (e) => {
        setImageUrl(e.target.value);
    };
    const handleAddUrl = () => {
        if (imageUrl) {
            setMedia([...media, imageUrl]);
            setImageUrl('');
        }
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
            {errorMessage && (
                <div className="bg-red-500 text-white p-3 rounded-lg fixed top-7 right-5 z-20">
                    {errorMessage}
                </div>
            )}
            {successMessage && (
                <div className="bg-green-500 text-white p-3 rounded-lg fixed top-7 right-5 z-20">
                    {successMessage}
                </div>
            )}

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
                        <span key={index} className="inline-flex items-center px-3 py-1 bg-indigo-500 text-white text-sm rounded-full">
                            {category}
                            <button type="button" className="ml-2 text-white" onClick={() => handleCategoryRemove(category)}>
                                &times;
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            {/* Product Subcategory */}
            <div className="space-y-2">
                <label className="block text-gray-700 text-sm font-semibold" htmlFor="subCategory">
                    Subcategory
                </label>
                <select
                    name="subCategory"
                    ref={categoryRef}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="">Select Subcategory</option>
                    {subcategroiesFromSlice.map((subcategory, index) => (
                        <option key={index} value={subcategory.value}>
                            {subcategory.value}
                        </option>
                    ))}
                </select>
            </div>

            {/* Cod or not */}
            <div className="space-y-2">
                <label className="block text-gray-700 text-sm font-semibold" htmlFor="cod">
                    Cod
                </label>
                <select
                    name="cod"
                    ref={codRef}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="Allow">Allow</option>
                    <option value="Not Allow">Not Allow</option>
                </select>
            </div>

            {/* Product Variants */}
            <div className="space-y-4">
                <label className="block text-gray-700 text-sm font-semibold">Variants</label>
                {variants.map((variant, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 items-end">
                        <input
                            type="text"
                            name="sku"
                            value={variant.sku}
                            onChange={(e) => handleVariantChange(index, e)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="SKU"
                        />
                        <input
                            type="number"
                            name="price"
                            value={variant.price}
                            onChange={(e) => handleVariantChange(index, e)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Price"
                        />
                        <input
                            type="number"
                            name="qty"
                            value={variant.qty}
                            onChange={(e) => handleVariantChange(index, e)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Quantity"
                        />
                        <input
                            type="text"
                            name="weight"
                            value={variant.weight}
                            onChange={(e) => handleVariantChange(index, e)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Weight"
                        />
                        <button
                            type="button"
                            onClick={() => removeVariant(index)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addVariant}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                    Add Variant
                </button>
            </div>


            {/* Image and Video Upload */}
            <div className=' flex flex-col gap-5 border py-5 px-10 border-gray-700'>
                <h2 className='font-sans text-xl font-semibold text-gray-800'>Upload the image and get the url  to insert in the description and media </h2>
                <Description_image_upload />
            </div>

            {/* Product Media */}
            <div className="p-4">
                {/* Note and Upload Media Section */}
                <p>
                    <span className='text-red-500'>*</span>Note: Get the url then insert in the media (means product photos for clien).
                </p>

                <div className="space-y-2">
                    <label className="block text-gray-700 text-sm font-semibold">Upload Media</label>

                    {/* URL Input Field */}
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={handleUrlChange}
                            placeholder="Enter image URL"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            type="button"
                            onClick={handleAddUrl}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Add Image
                        </button>
                    </div>

                    {/* Display Added Images */}
                    <div className="mt-2 flex flex-wrap gap-2">
                        {media.map((url, index) => (
                            <div
                                key={index}
                                className="relative group"
                                style={{ width: '200px', height: '200px' }} // Set the size of the image container
                            >
                                <img
                                    src={url}
                                    alt={`media-${index}`}
                                    className="w-full h-full object-cover rounded-lg"
                                    style={{ width: '200px', height: '200px' }} // Set the size of the image
                                />
                                {/* Remove button only shows on hover */}
                                <button
                                    type="button"
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => removeMedia(index)}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>



            {/* Product Description */}
            <div className="space-y-2">
                <label className="block text-gray-700 text-sm font-semibold">Description</label>
                <JoditEditor
                    ref={editor}
                    value={desc_content}
                    config={config}
                    onBlur={newContent => setDesc_Content(newContent)}
                />
            </div>

            {buttonShow && (
                <div className="space-y-4">
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        {isEditMode ? 'Update Product' : 'Create Product'}
                    </button>
                </div>
            )}
        </form>
    );
}

export default ProductForm;

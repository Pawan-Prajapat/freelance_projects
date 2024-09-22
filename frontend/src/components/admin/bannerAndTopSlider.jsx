import React, { useState, useEffect } from 'react';
import axios from 'axios';

const serverUrl = import.meta.env.VITE_SERVER_URL;

function BannerAndTopSlider() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [redirectLink, setRedirectLink] = useState('');
  const [banners, setBanners] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [topSlideText, setTopSlideText] = useState('');
  const [discounts, setDiscounts] = useState([]);
  const [discountText, setDiscountText] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');

  useEffect(() => {


    // Fetch top slide data
    const fetchTopSlide = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/marquee`);
        setTopSlideText(response.data.topSlide || '');
        console.log("banner and top slider jsx", topSlideText);
      } catch (error) {
        console.error('Error fetching top slide:', error);
      }
    };

    // Fetch discounts
    const fetchDiscounts = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/get_discount`);
        setDiscounts(response.data.discount || []);
      } catch (error) {
        console.error('Error fetching discounts:', error);
      }
    };


    fetchTopSlide();
    fetchDiscounts();
  }, []);

  useEffect(() => {
    // Fetch existing banners
    const fetchBanners = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/get_banner`);
        setBanners(response.data.banner || []);

      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };
    fetchBanners();
  }, [banners])

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle link input change
  const handleLinkChange = (event) => {
    setRedirectLink(event.target.value);
  };

  // Handle form submission
  const handleUpload = async () => {
    if (!selectedFile || !redirectLink) {
      setUploadStatus('Please select a file and enter a link before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('redirectLink', redirectLink);

    try {
      const response = await axios.post(`${serverUrl}/api/add_banner`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Update the banner list
      const newBanner = {
        imageUrl: response.data.banner, // Adjust according to your response
        redirectLink: redirectLink,
      };
      setBanners((prevBanners) => [...prevBanners, newBanner]);
      setUploadStatus('Banner uploaded successfully.');
      setSelectedFile(null);
      setRedirectLink('');
      setShowForm(false);
    } catch (error) {
      setUploadStatus('Image upload failed.');
      console.error('Error uploading image:', error);
    }
  };

  // Handle delete banner
  const handleDeleteBanner = async (id) => {
    try {
      await axios.delete(`${serverUrl}/api/delete_banner`, {
        data: { _id: id },
      });

      // Remove the banner from the list
      setBanners(banners.filter(banner => banner._id !== id));
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  };

  // Handle top slide update
  const handleTopSlideUpdate = async () => {
    try {
      await axios.patch(`${serverUrl}/api/update_topSlide`, { slideText: topSlideText });
      alert('Top slide updated successfully');
    } catch (error) {
      console.error('Error updating top slide:', error);
    }
  };

  // Handle discount submission
  const handleDiscountSubmit = async () => {
    try {
      await axios.post(`${serverUrl}/api/add_discount`, { discoutText: discountText, discoutAmount: discountAmount });
      // Fetch updated discounts
      const response = await axios.get(`${serverUrl}/api/get_discount`);
      setDiscounts(response.data.discount || []);
      setDiscountText('');
      setDiscountAmount('');
    } catch (error) {
      console.error('Error adding discount:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Banner and Top Slide Management</h1>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {showForm ? 'Cancel' : 'Add Banner with Link'}
      </button>

      {showForm && (
        <div className="mb-4 p-4 border border-gray-300 rounded">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2"
          />
          <input
            type="text"
            placeholder="Enter redirect link"
            value={redirectLink}
            onChange={handleLinkChange}
            className="mb-2 p-2 border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={handleUpload}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Done
          </button>
          {uploadStatus && <p className="text-red-500">{uploadStatus}</p>}
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-xl font-bold">Added Banners:</h3>
        {banners.length === 0 && <p>No banners added yet.</p>}
        <ul className="list-none p-0">
          {banners.map((banner) => (
            <li key={banner._id} className="flex items-center mb-4">
              <img src={serverUrl + banner.banner} alt={"banner"} width={100} className="mr-4" />
              <a
                href={banner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mr-4 text-blue-500 underline"
              >
                Visit Link
              </a>
              <button
                onClick={() => handleDeleteBanner(banner._id)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4 p-4 border border-gray-300 rounded ">
        <p><span className=' text-red-500'>*</span>Note for use fire Icon use [Icon]</p>
        <h3 className="text-xl font-bold mb-2">Update Top Slide</h3>
        <input
          type="text"
          value={topSlideText}
          onChange={(e) => setTopSlideText(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded w-3/4"
        />
        <button
          type="button"
          onClick={handleTopSlideUpdate}
          className="px-4 py-2 bg-blue-500 text-white rounded mx-3"
        >
          Update Top Slide
        </button>
      </div>

      <div className="mb-4 p-4 border border-gray-300 rounded">
        <h3 className="text-xl font-bold mb-2">Add Discount</h3>
        <input
          type="text"
          placeholder="Discount Text"
          value={discountText}
          onChange={(e) => setDiscountText(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Discount Amount"
          value={discountAmount}
          onChange={(e) => setDiscountAmount(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <button
          type="button"
          onClick={handleDiscountSubmit}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Add Discount
        </button>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-2">Added Discounts:</h3>
        {discounts.length === 0 && <p>No discounts added yet.</p>}
        <ul className="list-none p-0">
          {discounts.map((discount, index) => (
            <li key={index} className="mb-2">
              <span className="font-bold">{discount.discoutText}:</span> {discount.discoutAmount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BannerAndTopSlider;

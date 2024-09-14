import React, { useState, useEffect } from 'react';
import axios from 'axios';
const serverUrl = import.meta.env.VITE_SERVER_URL;

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState('');
  const [images, setImages] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const [hoveredImage, setHoveredImage] = useState(null);

  // Fetch all images when component mounts
  const fetchImages = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/all_images`);
      setImages(response.data.images);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImages(); // Fetch images on component mount
  }, []);

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file before uploading.');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < selectedFile.length; i++) {
      formData.append('images', selectedFile[i]); // Use the same key for all files
    }


    try {
      const response = await axios.post(`${serverUrl}/api/upload_images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadUrl(serverUrl + response.data.url);
      setUploadStatus('Image uploaded successfully.');

      // Refresh images after upload
      fetchImages();
    } catch (error) {
      setUploadStatus('Image upload failed.');
      console.error('Error uploading image:', error);
    }
  };

  // Copy image URL to clipboard
  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    setUploadStatus('Image URL copied to clipboard!');
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-6">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="border rounded p-2"
        />
        <button
          type='button'
          onClick={() => handleUpload()}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Upload
        </button>
        {uploadStatus && <p className="mt-2 text-green-500">{uploadStatus}</p>}
      </div>

      <div className=' w-full'>
        <h3 className="text-xl font-semibold mb-4">Uploaded Images:</h3>
        <div className="image-gallery grid grid-cols-6 gap-4 overflow-y-auto" style={{ maxHeight: '300px' }}>
          {images?.length > 0 ? (
            images.map((image, index) => {
              const imageUrl = `${serverUrl}${image.photo}`;
              return (
                <div
                  key={index}
                  className="relative group border rounded overflow-hidden w-full"
                  onMouseEnter={() => setHoveredImage(index)}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  <img
                    src={imageUrl}
                    alt={`Uploaded ${index}`}
                    className="w-40 h-40 object-cover"
                  />
                  {hoveredImage === index && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                      <button
                        type='button'
                        onClick={() => handleCopyUrl(imageUrl)}
                        className="bg-white text-gray-700 px-4 py-2 rounded shadow hover:bg-gray-200"
                      >
                        Copy Link
                      </button>
                    </div>
                  )}
                  {hoveredImage === index && (
                    <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-xs p-2 text-center truncate">
                      {imageUrl}
                    </p>
                  )}
                </div>
              );
            })
          ) : (
            <p>No images found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;

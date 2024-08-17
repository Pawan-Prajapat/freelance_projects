import React, { useState } from 'react';
import axios from 'axios';
const serverUrl = import.meta.env.VITE_SERVER_URL;

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState('');

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadUrl('Please select a file before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post(serverUrl + '/api/des_media', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadUrl(serverUrl + response.data.url);
    } catch (error) {
      setUploadStatus('Image upload failed.');
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button type='button' onClick={handleUpload}>Upload</button>
      {uploadUrl && <p>{uploadUrl}</p>}
    </div>
  );
};

export default ImageUpload;


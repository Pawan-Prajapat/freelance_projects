import { useEffect, useState } from 'react';
import axios from 'axios';

const serverUrl = import.meta.env.VITE_SERVER_URL;
const SitemapHTML = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    axios.get(`${serverUrl}/api/sitemap`)
      .then((res) => setUrls(res.data.urls))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1 className=' text-center text-2xl text-gray-500 my-4 font-medium'>Helpful Links</h1>
      <ul className=' flex flex-col justify-center items-center mx-[10%] my-4'>
        {urls.map((url, index) => {
          const extracted = url.split('/').pop() || "home";
          const formatted = extracted.replace(/[_-]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
          return (
            <li key={index} className=' border border-gray-200 w-full my-2 shadow-sm px-3 py-3'>
              <a href={url} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                {formatted}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default SitemapHTML;

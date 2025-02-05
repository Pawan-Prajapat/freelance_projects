import { useEffect, useState } from 'react';
import axios from 'axios';

console.log(" lvajlvkd lkjlkfa site map xml ");

const serverUrl = import.meta.env.VITE_SERVER_URL;

const SitemapXML = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    axios.get(`${serverUrl}/api/sitemap`)
      .then((res) => setUrls(res.data.urls))
      .catch((err) => console.error(err));
  }, []);

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map((url) => `<url><loc>${url}</loc></url>`).join('\n\t')}
  </urlset>`;

  return <pre>{xmlContent}</pre>; 
};

export default SitemapXML;

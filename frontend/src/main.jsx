

import React, { useEffect } from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {Provider} from "react-redux"
import {store} from "./app/store.js"
function Main() {
    useEffect(() => {
      const sitemapLink = document.getElementById("sitemap-link");
      if (sitemapLink) {
        sitemapLink.href = `${import.meta.env.VITE_SERVER_URL}/sitemap.xml`;
      }
    }, []);
  
    return <App />;
  }
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Main />
    </Provider>
);



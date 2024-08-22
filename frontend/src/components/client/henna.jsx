import React, { useEffect } from "react";
import Cart from "./cart.jsx";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../features/productsFileHairSlice.js";

import { useParams } from "react-router-dom";

export default function Henna() {
  const dispatch = useDispatch();
  const param = useParams();
  const myName = useSelector((state) => state.ProductHairReducer);
  // Scroll to top when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch products data when the component is mounted
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (!myName.data) {
    return null;
  }


  // Select products with category "combopack"

  const selectedHennaData = myName.data.filter((element) =>
    (param.subHenna !== 'all_henna') ? (
      element.category && element.category.split(',').some(cat => cat.trim() === param.subHenna)
    ) : (
      element.category && ['baq_henna', 'herbal_henna', 'natural_henna', 'henna_based_hair_color'].some(combo => element.category.split(',').includes(combo))
    )
  );
  // Count occurrences of each subcategory
  const subcategoryCounts = selectedHennaData.reduce((acc, current) => {
    const subcategory = current.subCategories;
    if (acc[subcategory]) {
      acc[subcategory]++;
    } else {
      acc[subcategory] = 1;
    }
    return acc;
  }, {});

  // Create an array of subcategories with counts
  const uniqueArray = Object.entries(subcategoryCounts).map(([subcategory, count]) => ({
    subcategory,
    count
  }));

  // Find the maximum price in the selected data
  let max = Math.max(...selectedHennaData.map((item) => item.price));
  if (max === -Infinity) {
    max = 0;
  }

  return (
    <>
      <Cart
        min={0}
        max={max}
        step={1}
        data={selectedHennaData}
        productTypes={uniqueArray}
        image="images/Hennakart/natural_essiensital_oil.jpg"
      />
    </>
  );
}

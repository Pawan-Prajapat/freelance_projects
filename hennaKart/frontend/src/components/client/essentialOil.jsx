import React, { useEffect } from "react";
import Cart from "./cart.jsx";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../features/productsFileHairSlice.js";

import { useParams } from "react-router-dom";

export default function Essential() {
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

  const selectedEssentialData = myName.data?.data.filter((element) =>
    (param.subEssentialOil !== 'all_oil') ? (
      element.category && element.category.some(cat => cat.trim() === param.subEssentialOil)
    ) : (
      element.category && ['eucalyptus_oil', 'lavender_oil', 'tea_tree_oil', 'mehandi_oil','clove_oil','cajeput_oil'].some(combo => element.category.includes(combo))
    )
  );
  // Count occurrences of each subcategory
  const subcategoryCounts = selectedEssentialData.reduce((acc, current) => {
    const subcategory = current.subCategory;
    if (acc[subcategory]) {
      acc[subcategory]++;
    } else {
      acc[subcategory] = 1;
    }
    return acc;
  }, {});

  // Create an array of subcategory with counts
  const uniqueArray = Object.entries(subcategoryCounts).map(([subcategory, count]) => ({
    subcategory,
    count
  }));

  // Find the maximum price in the selected data
  let max = Math.max(...selectedEssentialData.map((item) => item.Variant_Price));
  if (max === -Infinity) {
    max = 0;
  }

  return (
    <>
      <Cart
        min={0}
        max={max}
        step={1}
        data={selectedEssentialData}
        productTypes={uniqueArray}
        image="images/Hennakart/natural_essiensital_oil.jpg"
      />
    </>
  );
}

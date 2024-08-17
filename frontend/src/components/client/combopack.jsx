import React, { useEffect } from "react";
import Cart from "./cart.jsx";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../features/productsFileHairSlice.js";

export default function Combopack(props) {
  const dispatch = useDispatch();
  const myName = useSelector((state) => state.ProductHairReducer);

  console.log("pawan myName ko check kro", myName);

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
  const selectedComboData = myName.data.filter((element) =>
    element.category && element.category === "combopack"
  );

  console.log("pawan selectedComboData ko check kro", selectedComboData);

  // Count occurrences of each subcategory
  const subcategoryCounts = selectedComboData.reduce((acc, current) => {
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
  let max = Math.max(...selectedComboData.map((item) => item.price));
  if (max === -Infinity) {
    max = 0;
  }

  return (
    <>
      <Cart
        min={0}
        max={max}
        step={1}
        data={selectedComboData}
        productTypes={uniqueArray}
        image="images/Hennakart/natural_essiensital_oil.jpg"
      />
    </>
  );
}

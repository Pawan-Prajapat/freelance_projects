import React, { useEffect } from "react";
import Cart from "./cart.jsx";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../features/productsFileHairSlice.js";

export default function Newlaunches() {
  const dispatch = useDispatch();
  const myName = useSelector((state) => state.ProductHairReducer);


  // when uesr click then page show on the top every time
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (myName.data === null) {
    return
  }
  let selectedComboData;
  if (myName.data !== null) {
    selectedComboData = myName.data.data.filter(element => element.categroies && element.categroies.indexOf("newLaunches") !== -1);
  }

  const subcategoryCounts = selectedComboData.reduce((acc, current) => {
    const subcategory = current.subCategroies;
    if (acc[subcategory]) {
      acc[subcategory]++;
    } else {
      acc[subcategory] = 1;
    }
    return acc;
  }, {});

  const uniqueArray = Object.entries(subcategoryCounts).map(([subcategory, count]) => ({ subcategory, count }));
  let max = Math.max(...selectedComboData.map(item => item.price));
  if (max === -Infinity) {
    max = 0;
  }
  return (
    <>
      <Cart min={0} max={max} step={1} data={selectedComboData} productTypes={uniqueArray} image="images/Hennakart/natural_essiensital_oil.jpg" />
    </>
  );
}
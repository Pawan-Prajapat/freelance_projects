import React, { useEffect } from "react";
import Cart from "./cart.jsx";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../features/productsFileHairSlice.js";

export default function Deals(props) {
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
  if (props.under === 100) {
    selectedComboData = myName.data.filter(element => element.price <= 100);
  } else if (props.under === 200) {
    selectedComboData = myName.data.filter(element => element.price > 100 && element.price <= 200);
  } else if (props.under === 300) {
    selectedComboData = myName.data.filter(element => element.price > 200 && element.price <= 300);
  }
  else {
    selectedComboData = myName.data.data;
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
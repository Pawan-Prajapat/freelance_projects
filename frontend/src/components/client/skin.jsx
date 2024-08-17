import React, { useEffect } from "react";
import Cart from "./cart.jsx";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../features/productsFileHairSlice.js";

export default function Skin(props) {
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
    return <h1>Loading........ </h1>
  }

  let selectedHariData;
  if (props.which === "skin") {
    selectedHariData = myName.data.filter(element => element.categroies && element.categroies.indexOf("skin") !== -1);
  } else if (props.which === "facePowder") {
    selectedHariData = myName.data.filter(element => element.categroies && element.categroies.indexOf("facePowder") !== -1);
  } else if (props.which === "facePack") {
    selectedHariData = myName.data.filter(element => element.categroies && element.categroies.indexOf("facePack") !== -1);
  } else if (props.which === "faceEssentialOil") {
    selectedHariData = myName.data.filter(element => element.categroies && element.categroies.indexOf("faceEssentialOil") !== -1);
  } else if (props.which === "faceSheet") {
    selectedHariData = myName.data.filter(element => element.categroies && element.categroies.indexOf("faceSheet") !== -1);
  }
  else {
    selectedHariData = myName.data.filter(element => element.categroies && (element.categroies.indexOf("skin") !== -1 || element.categroies.indexOf("faceSheet") !== -1 || element.categroies.indexOf("facePack") !== -1 || element.categroies.indexOf("faceEssentialOil") !== -1) || (element.categroies.indexOf("facePowder") !== -1));
  }

  const subcategoryCounts = selectedHariData.reduce((acc, current) => {
    const subcategory = current.subCategroies;
    if (acc[subcategory]) {
      acc[subcategory]++;
    } else {
      acc[subcategory] = 1;
    }
    return acc;
  }, {});

  const uniqueArray = Object.entries(subcategoryCounts).map(([subcategory, count]) => ({ subcategory, count })); let max = Math.max(...selectedHariData.map(item => item.price));
  if (max === -Infinity) {
    max = 0;
  }
  return (
    <>
      <Cart min={0} max={max} step={1} data={selectedHariData} productTypes={uniqueArray} image="images/Hennakart/natural_essiensital_oil.jpg"
       />
    </>
  );
}
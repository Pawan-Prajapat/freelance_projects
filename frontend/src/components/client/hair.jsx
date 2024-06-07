import React, { useEffect } from "react";
import Cart from "./cart.jsx";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../features/productsFileHairSlice.js";

export default function Hair(props) {
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
  let selectedHariData;
  if (props.which === "hair") {
    selectedHariData = myName.data.data.filter(element => element.categroies && element.categroies.indexOf("hair") !== -1);
    console.log(selectedHariData);
  } else if (props.which === "hennas") {
    selectedHariData = myName.data.data.filter(element => element.categroies && element.categroies.indexOf("hennas") !== -1);
  } else if (props.which === "hairMask") {
    selectedHariData = myName.data.data.filter(element => element.categroies && element.categroies.indexOf("hairMask") !== -1);
  } else if (props.which === "hairEssentialOil") {
    selectedHariData = myName.data.data.filter(element => element.categroies && element.categroies.indexOf("hairEssentialOil") !== -1);
  } else {
    selectedHariData = myName.data.data.filter(element => element.categroies && (element.categroies.indexOf("hair") !== -1 || element.categroies.indexOf("hennas") !== -1 || element.categroies.indexOf("hairMask") !== -1 || element.categroies.indexOf("hairEssentialOil") !== -1));
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

  const uniqueArray = Object.entries(subcategoryCounts).map(([subcategory, count]) => ({ subcategory, count }));
  // const  = Array.from(new Set(selectedHariData));
  let max = Math.max(...selectedHariData.map(item => item.price));
  if (max === -Infinity) {
    max = 0;
  }

  return (
    <>
      <Cart min={0} max={max} step={1} data={selectedHariData} productTypes={uniqueArray} />
    </>
  );
}
import React, { useEffect } from "react";
import Cart from "./cart.jsx";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../features/productsFileHairSlice.js";

export default function Skin() {
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
  const selectedHariData = myName.data.data.filter(element => element.categroies === "face");

  const uniqueArray = Array.from(new Set(selectedHariData));

  return (
    <>
      <Cart min={0} max={199} step={1} data={selectedHariData} productTypes={uniqueArray} />
    </>
  );
}
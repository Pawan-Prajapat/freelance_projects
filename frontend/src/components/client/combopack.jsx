import React, { useEffect } from "react";
import Cart from "./cart.jsx";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../features/productsFileHairSlice.js";

export default function Combopack() {
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
  const selectedComboData = myName.data.data.filter(element => element.categroies === "combopack");

  const uniqueArray = Array.from(new Set(selectedComboData));

  return (
    <>
      <Cart min={0} max={199} step={1} data={selectedComboData}  productTypes={uniqueArray} />
    </>
  );
}
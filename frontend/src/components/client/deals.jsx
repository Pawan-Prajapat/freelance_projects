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
  let  selectedComboData;
  if(props.under === 100){
    selectedComboData = myName.data.data.filter(element => element.price <= 100);
  }else if(props.under === 200){
    selectedComboData = myName.data.data.filter(element => element.price > 100 && element.price <= 200);
  }else{
    selectedComboData = myName.data.data.filter(element => element.price > 200 && element.price <= 300); 
  }

  const uniqueArray = Array.from(new Set(selectedComboData));

  return (
    <>
      <Cart min={0} max={199} step={1} data={selectedComboData}  productTypes={uniqueArray} />
    </>
  );
}
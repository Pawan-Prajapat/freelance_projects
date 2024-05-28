import React,{useEffect} from "react";
import Cart from "./cart.jsx";

export default function Combopack() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Cart min={0} max={199} step={1} data={0} />
    </>
  );
}
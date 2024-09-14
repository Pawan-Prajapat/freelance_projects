import React, { useEffect } from "react";
import Cart from "./cart.jsx";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../features/productsFileHairSlice.js";


export default function BestSellers() {
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
    const selectedHairData = myName.data?.data.filter(element =>
        element.category && element.category.some(cat => cat.trim() === "hair_care")
    );
    const subcategoryCounts = selectedHairData.reduce((acc, current) => {
        const subcategory = current.subCategory;
        if (acc[subcategory]) {
            acc[subcategory]++;
        } else {
            acc[subcategory] = 1;
        }
        return acc;
    }, {});

    const uniqueArray = Object.entries(subcategoryCounts).map(([subcategory, count]) => ({ subcategory, count }));
    let max = Math.max(...selectedHairData.map(item => item.Variant_Price));
    if (max === -Infinity) {
        max = 0;
    }


    return (
        <>
            <Cart min={0} max={max} step={1} data={selectedHairData} productTypes={uniqueArray} image="images/Hennakart/natural_essiensital_oil.jpg" />
        </>
    );
}
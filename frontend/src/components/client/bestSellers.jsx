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
    const selectedHariData = myName.data.data.filter(element => element.categroies && element.categroies.indexOf("bestSellers") !== -1);
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
    const max = Math.max(...selectedHariData.map(item => item.price));

    return (
        <>
            <Cart min={0} max={max} step={1} data={selectedHariData} productTypes={uniqueArray} />
        </>
    );
}
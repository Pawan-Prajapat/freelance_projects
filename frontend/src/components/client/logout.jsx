import React, { useEffect } from 'react'
import { useDispatch , useSelector } from "react-redux";
import { removeTokenOnLocal } from "../../features/tokenFeatureSlice";
import { Navigate } from 'react-router-dom';
function logout() {
    const dispatch = useDispatch();
    dispatch(removeTokenOnLocal());
    const token = useSelector((state) => state.TokenReducer.token || "");

    // Add a small delay to ensure the token is removed before redirecting
    if(!token){
        return <Navigate to={"/home"}/>;
    }
    return <p>Loading......</p>; // Return null to avoid rendering anything
}

export default logout
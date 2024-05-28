import React,{useEffect} from 'react'
import { useDispatch } from "react-redux";
import { removeTokenOnLocal } from "../../features/tokenFeatureSlice";
import { Navigate } from 'react-router-dom';
function logout() {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(removeTokenOnLocal());
    },[removeTokenOnLocal()])
    return (
        <Navigate to={"/"}/>
    )
}

export default logout
import { configureStore } from '@reduxjs/toolkit';
import AddToCartReducer from '../features/AddToCartSlice';
import ProductHairReducer from '../features/productsFileHairSlice';
import TokenReducer from '../features/tokenFeatureSlice';
import CategroiesReducer from '../features/categroiesSubCategroiesSlice';

export const store = configureStore({
    reducer: {
        AddToCartReducer:AddToCartReducer,
        ProductHairReducer : ProductHairReducer,
        TokenReducer : TokenReducer,
        CategroiesReducer : CategroiesReducer,
    }
})
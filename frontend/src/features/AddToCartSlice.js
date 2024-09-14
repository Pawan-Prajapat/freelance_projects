import { createSlice } from "@reduxjs/toolkit";

const cartItems = localStorage.getItem('HennaKartCart') !== null ? JSON.parse(localStorage.getItem('HennaKartCart')) : []
const singleItems = localStorage.getItem('HennaKartSingleProduct') !== null ? JSON.parse(localStorage.getItem('HennaKartSingleProduct')) : null

const setItemFunc = (item) => {
    localStorage.setItem('HennaKartCart', JSON.stringify(item));
}
const setSingleItemFunc = (item) => {
    localStorage.setItem('HennaKartSingleProduct', JSON.stringify(item));
}
const initialState = {
    addToCart: cartItems,
    singleProduct: singleItems,
    total: 0
}

export const AddToCartSlice = createSlice({
    name: 'AddToCart',
    initialState,
    reducers: {
        singleProduct: (state, action) => {
            const product = action.payload;
            const newProductCartData = {
                product_id: product._id,
                variant: product.selectedVariant,
                qty: product.quantity || 1,
                image: product.images[0],
                title: product.title
            }
            state.singleProduct = newProductCartData;
            setSingleItemFunc(state.singleProduct);
        },
        addProductInCart: (state, action) => {
            const product = action.payload;
            const checkExist = state.addToCart.find((check) => check.product_id === action.payload.product_id && check.variant._id === action.payload.variant._id);
            if (checkExist) {
                checkExist.qty = checkExist.qty + 1;
            } else {
                const newProductCartData = {
                    product_id: product._id,
                    variant: product.selectedVariant,
                    qty: product.quantity || 1,
                    image: product.images[0],
                    title: product.title
                }
                state.addToCart.push(newProductCartData);
            }
            setItemFunc(state.addToCart.map(item => item));
        },
        updateProductQuantityIncrease: (state, action) => {
            const _id = action.payload;
            const product = state.addToCart.find((p) => p.variant._id === _id);
            if (product) {
                product.qty = product.qty + 1;
            }
            setItemFunc(state.addToCart.map(item => item));
        },
        updateProductQuantityDecrease: (state, action) => {
            const _id = action.payload;
            const product = state.addToCart.find((p) => p.variant._id === _id);
            if (product && product.qty > 0) {
                product.qty = product.qty - 1;
            }
            setItemFunc(state.addToCart.map(item => item));
        },
        removeProductCart: (state, action) => {
            state.addToCart = state.addToCart.filter((product) => product.variant._id !== action.payload);
            setItemFunc(state.addToCart.map(item => item));
        },
        clearCart: (state) => {
            state.addToCart = [];
            setItemFunc(state.addToCart); // Clear localStorage
        }
    }
})

export const { singleProduct, addProductInCart, updateProductQuantityIncrease, updateProductQuantityDecrease, removeProductCart, clearCart } = AddToCartSlice.actions;
export default AddToCartSlice.reducer

export function calculateTotal(cart) {
    return cart.reduce((total, product) => total + product.variant.price * product.qty, 0);
}


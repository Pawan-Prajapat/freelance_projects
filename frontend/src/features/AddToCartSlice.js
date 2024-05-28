import { createSlice } from "@reduxjs/toolkit";

const cartItems = localStorage.getItem('HennaKartCart') !== null ? JSON.parse(localStorage.getItem('HennaKartCart')) : []

const setItemFunc = (item) => {
    localStorage.setItem('HennaKartCart', JSON.stringify(item));
}
const initialState = {
    addToCart: cartItems,
    total: 0
}

export const AddToCartSlice = createSlice({
    name: 'AddToCart',
    initialState,
    reducers: {
        addProductInCart: (state, action) => {
            const product = action.payload;
            const checkExist = state.addToCart.find((check) => check.id === action.payload.id);
            if (checkExist) {
                checkExist.qyt = checkExist.qyt + 1;
            } else {
                const newProductCartData = {
                    id: product.id,
                    name: product.name,
                    image: product.image,
                    description: product.description,
                    price: product.price,
                    qyt: product.qyt,
                    subCategroies: product.subCategroies,
                    categroies: product.categroies
                }
                state.addToCart.push(newProductCartData);
            }
            setItemFunc(state.addToCart.map(item => item));
        },
        updateProductQuantityIncrease: (state, action) => {
            const id = action.payload;
            const product = state.addToCart.find((p) => p.id === id);
            if (product) {
                product.qyt = product.qyt + 1;
            }
            setItemFunc(state.addToCart.map(item => item));
        },
        updateProductQuantityDecrease: (state, action) => {
            const id = action.payload;
            const product = state.addToCart.find((p) => p.id === id);
            if (product && product.qyt > 0) {
                product.qyt = product.qyt - 1;
            }
            setItemFunc(state.addToCart.map(item => item));
        },
        removeProductCart: (state, action) => {
            state.addToCart = state.addToCart.filter((product) => product.id !== action.payload);
            setItemFunc(state.addToCart.map(item => item));
        }
    }
})

export const { addProductInCart, updateProductQuantityIncrease, updateProductQuantityDecrease, removeProductCart } = AddToCartSlice.actions;
export default AddToCartSlice.reducer

export function calculateTotal(cart) {
    return cart.reduce((total, product) => total + product.price * product.qyt, 0);
}


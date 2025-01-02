import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    cartId: "",
    products: [],
    totalPrice: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        initCart(s, a) {
            s.cartId = a.payload
        },
        pushProduct(s, a) {
            s.products.push(a.payload)
            s.totalPrice += a.payload.price
        },
        removeProduct(s,a) {
            s.products = s.products.filter(obj=>obj.id !== a.payload)

        },
        clearProducts(s) {
            s.products = []
        }
    },
})

//  actions === reducers
export const { initCart, pushProduct, removeProduct, clearProducts } = cartSlice.actions

export default cartSlice.reducer
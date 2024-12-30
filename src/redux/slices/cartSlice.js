import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    products: [],
    totalPrice: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
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
export const { pushProduct, removeProduct, clearProducts } = cartSlice.actions

export default cartSlice.reducer
import { configureStore } from '@reduxjs/toolkit'
import filter from "./slices/filterSlice"
import cart from "./slices/cartSlice"
import potatoList from "./slices/potatoListSlice"

export const store = configureStore({
  reducer: {
    filter,
    cart,
    potatoList,
  }
})
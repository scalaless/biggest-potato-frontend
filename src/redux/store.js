import { configureStore } from '@reduxjs/toolkit'
import catRed from './slices/categorySlice'

export const store = configureStore({
  reducer: { counter: catRed },
})
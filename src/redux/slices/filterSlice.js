import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    category: 
        { id: "0", title: "Все категории" },
    sort:
        { name: "популярности", v: "Rating" },
}

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setCategory(s, a) {
            s.category = a.payload
        },
        setSort(s,a) {
            s.sort = a.payload
        },
    },
})

//  actions === reducers
export const { setCategory, setSort } = filterSlice.actions

export default filterSlice.reducer
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    items: [],
    totalPages: 0,
    loadingStatus: "loading",
};

export const fetchPotatoList = createAsyncThunk(
    'potatoList/fetchPotatoListStatus',
    async (ps) => {
        const { currentCategory, sort, currentPage } = ps;

        const params = {};
        if (currentCategory.id !== '0') params.category = currentCategory.id;
        if (sort.name !== 'популярности') params.sort = sort.v;
        params.page = currentPage;

        const { data } = await axios.get(
            'http://95.142.35.105:54870/potatoes/list',
            { params },
        );
        const { potatoes, totalPages } = data;

        return { potatoes, totalPages };
    },
);

const potatoListSlice = createSlice({
    name: 'potatoList',
    initialState,
    reducers: {
        setItems(s, a) {
            s.items = a.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPotatoList.pending, (s) => {
            s.loadingStatus = "loading"
            s.items = []
        });

        builder.addCase(fetchPotatoList.fulfilled, (s, a) => {
            s.items = a.payload.potatoes;
            s.totalPages = a.payload.totalPages;
            s.loadingStatus = "success"
        });

        builder.addCase(fetchPotatoList.rejected, (s, a) => {
            // s.items = a.payload.potatoes;
            // s.totalPages = a.payload.totalPages;
            s.items = []
            s.loadingStatus = "rejected"
            console.error("potatos list not available. ", s)
        });
    },
});

export const { setItems } = potatoListSlice.actions;

export default potatoListSlice.reducer;
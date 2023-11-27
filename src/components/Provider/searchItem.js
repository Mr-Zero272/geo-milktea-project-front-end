import { createSlice } from '@reduxjs/toolkit';

const searchItems = createSlice({
    name: 'items',
    initialState: {
        itemsInfo: [],
        isShowItem: false,
    },
    reducers: {
        addItems: (state, action) => {
            state.itemsInfo = action.payload;
            state.isShowItem = true;
        },
    },
});

export const { addItems } = searchItems.actions;
export default searchItems.reducer;

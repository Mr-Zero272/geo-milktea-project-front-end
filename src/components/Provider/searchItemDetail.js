import { createSlice } from '@reduxjs/toolkit';

const searchItemDetail = createSlice({
    name: 'itemDetail',
    initialState: {
        itemInfo: [],
        isShowDetailItem: false,
    },
    reducers: {
        updateItemDetail: (state, action) => {
            state.itemInfo = action.payload;
            state.isShowDetailItem = true;
        },
    },
});

export const { updateItemDetail } = searchItemDetail.actions;
export default searchItemDetail.reducer;

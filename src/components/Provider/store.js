import { configureStore } from '@reduxjs/toolkit';
import locationSlice from './locationSlice';
import searchItemDetail from './searchItemDetail';
import searchItem from './searchItem';
const store = configureStore({
    reducer: {
        location: locationSlice,
        Itemdetail: searchItemDetail,
        ItemIfor: searchItem,
    },
});
export default store;

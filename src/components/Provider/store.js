import locationSlice from './locationSlice';
import { configureStore } from '@reduxjs/toolkit';
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

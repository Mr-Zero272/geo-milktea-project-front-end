import { configureStore } from '@reduxjs/toolkit';
import drawGeoSlice from './draw-geo-slice';

const store = configureStore({
    reducer: {
        drawGeoState: drawGeoSlice.reducer,
    },
});

export default store;

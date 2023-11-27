import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
    name: 'location',
    initialState: { latitude: 0, longitude: 0 },
    reducers: {
        setUserLocation: (state, action) => {
            const { latitude, longitude } = action.payload;
            state.latitude = latitude;
            state.longitude = longitude;
        },
    },
});

export const { setUserLocation } = locationSlice.actions;
export default locationSlice.reducer;

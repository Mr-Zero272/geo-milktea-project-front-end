import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const addToDistinctArray = (array, value) => {
    let temp = [];
    if (array.some((item) => item.id === value.id)) {
        temp = array.filter((it) => it.id !== value.id);
        temp = [...temp, value];
    } else {
        temp = [...array, value];
    }
    return temp;
};

const findById = (listPoints, id) => {
    return listPoints.find((item) => item.id === id);
};

const temp = {
    id: 0,
    name: '',
    description: '',
    address: '',
    openTime: '',
    closeTime: '',
    phoneNumber: '',
    positionWkt: '',
    belongTo: 0,
};

const temp2 = {
    id: 0,
    name: '',
    positionWkt: '',
};

const drawGeoSlice = createSlice({
    name: 'drawGeoStore',
    initialState: {
        isDrawPoint: false,
        isDrawLineString: false,
        listPoints: [],
        listLineStrings: [],
        activePointInfo: temp,
        activeLineStringInfo: temp2,
        isShowFormAdd: false,
    },
    reducers: {
        setDrawPointState(state, action) {
            let tempState;

            if (action.payload) {
                tempState = {
                    ...state,
                    isDrawPoint: action.payload,
                    isDrawLineString: !action.payload,
                };
            } else {
                tempState = {
                    ...state,
                    isDrawPoint: action.payload,
                };
            }

            return tempState;
        },
        createPoint(state, action) {
            const tempListPoints = addToDistinctArray(state.listPoints, action.payload);
            return {
                ...state,
                listPoints: tempListPoints,
                activePointInfo: findById(tempListPoints, action.payload.id),
            };
        },
        updatePoint(state, action) {
            return {
                ...state,
                listPoints: addToDistinctArray(state.listPoints, action.payload),
                activePointInfo: findById(state.listPoints, action.payload.id),
            };
        },
        setActivePointInfo(state, action) {
            return {
                ...state,
                activePointInfo: findById(state.listPoints, action.payload),
            };
        },
        edit(state, action) {
            let editPoint = findById(state.listPoints, action.payload.id);
            let editLineString;
            let tempState;
            if (editPoint === undefined) {
                editLineString = state.listLineStrings.find((item) => item.id === action.payload.id);
                tempState = {
                    ...state,
                    listLineStrings: addToDistinctArray(state.listLineStrings, {
                        ...editLineString,
                        positionWkt: action.payload.positionWkt,
                    }),
                };
            } else {
                tempState = {
                    ...state,
                    listPoints: addToDistinctArray(state.listPoints, {
                        ...editPoint,
                        positionWkt: action.payload.positionWkt,
                    }),
                };
            }
            return tempState;
        },
        delete(state, action) {
            let editPoint = findById(state.listPoints, action.payload);
            let editLineString;
            let tempState;
            console.log('delete');
            if (editPoint === undefined) {
                editLineString = state.listLineStrings.find((item) => item.id === action.payload);
                tempState = {
                    ...state,
                    listLineStrings: state.listLineStrings.filter((item) => item.id !== action.payload),
                    isDelete: false,
                };
            } else {
                tempState = {
                    ...state,
                    listPoints: state.listPoints.filter((item) => item.id !== action.payload),
                    isDelete: false,
                };
                console.log('test2');
            }
            return tempState;
        },
        setDrawLineStringState(state, action) {
            let tempState;

            if (action.payload) {
                tempState = {
                    ...state,
                    isDrawLineString: action.payload,
                    isDrawPoint: !action.payload,
                };
            } else {
                tempState = {
                    ...state,
                    isDrawLineString: action.payload,
                };
            }

            return tempState;
        },
        createLineString(state, action) {
            const tempListLineStrings = addToDistinctArray(state.listLineStrings, action.payload);
            return {
                ...state,
                listLineStrings: tempListLineStrings,
                activeLineStringInfo: findById(tempListLineStrings, action.payload.id),
            };
        },
        updateLineString(state, action) {
            return {
                ...state,
                listLineStrings: addToDistinctArray(state.listLineStrings, action.payload),
                activeLineStringInfo: findById(state.listLineStrings, action.payload.id),
            };
        },
        setActiveLineStringsInfo(state, action) {
            return {
                ...state,
                activeLineStringInfo: findById(state.listLineStrings, action.payload),
            };
        },
    },
});

export const drawGeoActions = drawGeoSlice.actions;
export default drawGeoSlice;

import {
    LOAD_WEATHER,
} from "../types";

const initialState = {
    data: null
}

export const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_WEATHER:
            return {
                ...state,
                data: action.data
            }
        default:
            return state;
    }
}

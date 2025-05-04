import {
    LOAD_DISPLAY_ON,
    LOAD_DISPLAY_OFF,
} from "../types";

const initialState = {
    loading: false,
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_DISPLAY_ON:
            return {
                ...state,
                loading: false,
            }
        case LOAD_DISPLAY_OFF:
            return {
                ...state,
                loading: true,
            }
        default:
            return state;
    }
}
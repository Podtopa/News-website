import {
    GET_CONFIGURATIONS,
    SET_CONFIGURATIONS,
} from "../types";

const initialState = {
    configurations: {},
    categories: {},
}

export const configurationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CONFIGURATIONS:
            return {
                ...state,
                configurations: action.data.configurations,
                categories: action.data.categories,
                currencies: action.data.currencies
            }
        case SET_CONFIGURATIONS:
            return {
                ...state,
                configurations: action.data.configurations,
                categories: action.data.categories,
                currencies: action.data.currencies
            }
        default:
            return state;
    }
}

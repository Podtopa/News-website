import { GET_LOCALSTORAGE_DATA, SET_LOCALSTORAGE_DATA } from "../types";

const initialState = {
    name: '',
    data: ''
}

export const localStorageReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LOCALSTORAGE_DATA:
            return {
                ...state,
                name: action.name,
                data: action.data
            }
        case SET_LOCALSTORAGE_DATA:
            return {
                ...state,
                name: action.name,
                data: action.data
            }
        default:
            return state;
    }
}

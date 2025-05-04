import {
    LOAD_CURRENCY_RATES,
} from "../types";

const initialState = {
    base: "eur",
    currencies: [],
}

export const currencyReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CURRENCY_RATES:
            return {
                ...state,
                base: action.base,
                currencies: action.currencies
            }
        default:
            return state;
    }
}

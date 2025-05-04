import {
    CHOOSE_COUNTRY,
    CHOOSE_CATEGORY,
    INPUT_QUERY,
    LOAD_NEWS, SET_DATE
} from "../types";

const languages = {
    ua: "uk",
    us: "en",
    ru: "ru"
}

const initialState = {
    country: "ua",
    language: "uk",
    category: "general",
    query: "",
    date: new Date().toISOString(),
    articles: [],
    responseError: false
}

export const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHOOSE_COUNTRY:
            return {
                ...state,
                country: action.country,
                language: languages[action.country],
                category: "general",
                query: "",
            }
        case CHOOSE_CATEGORY:
            return {
                ...state,
                category: action.category,
                query: "",
            }
        case INPUT_QUERY:
            return {
                ...state,
                query: action.query,
            }
        case SET_DATE:
            return {
                ...state,
                date: action.date,
            }
        case LOAD_NEWS:
            return {
                ...state,
                articles: action.articles,
                responseError: action.responseError,
                language: action.language
            }
        default:
            return state;
    }
}

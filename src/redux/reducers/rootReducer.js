import {combineReducers} from "redux";
import {newsReducer} from "./newsReducer";
import {appReducer} from "./appReducer";
import {currencyReducer} from "./currencyReducer";
import {localStorageReducer} from "./localStorageReducer";
import { weatherReducer } from "./weatherReducer";
import { configurationsReducer } from "./configurationsReducer";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({
    currencyReducer,
    newsReducer,
    appReducer,
    localStorageReducer,
    weatherReducer,
    configurationsReducer,
    authReducer
});

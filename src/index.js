import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'

import {createStore, compose, applyMiddleware} from "redux";
import {rootReducer} from "./redux/reducers/rootReducer";
import {Provider} from "react-redux";

import "./i18n"

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const store = createStore(rootReducer, compose(
    applyMiddleware(
        thunk,
    )
));

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();

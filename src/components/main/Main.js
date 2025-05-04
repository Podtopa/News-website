//Imports
import React, {useRef, useState} from 'react';
import { chooseCountry, getConfigurations, loadNews, loginByToken } from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Routes, Route, Navigate, useLocation} from "react-router-dom";

//Components
import MainBar from "./MainBar";
import NewsContainer from "./NewsContainer";
import RecommendationWidget from "./Widgets/RecommendationWidget";
import CurrencyWidget from "./Widgets/CurrencyWidget";
import i18next from "i18next";
import WeatherWidget from "./Widgets/WeatherWidget";
import Account from "./Account";
import DateWidget from "./Widgets/DateWidget";

const localisation = {
    "ua": "uk",
    "us": "en"
}

const countries = {
    "uk": "ua",
    "en": "us"
}

//Component
function Main() {
    const [start, setStart] = useState(false);

    //Redux
    const data = useSelector(state => {
        return state.newsReducer
    })

    const dispatch = useDispatch();

    //Router & i18n
    const location = useLocation();

    const country = location.pathname.replace("/", "") || countries[i18next.language];

    //Test
    useEffect(() => {
        if (localisation.hasOwnProperty(country)) {
            dispatch(chooseCountry(country));
            setStart(true);
        }
    }, [country])


    useEffect(() => {
        if (start || country === "ua") {
            //i18next.changeLanguage(localisation[country])
            dispatch(loadNews(data))
        }
    }, [data.country, data.category, data.query, data.date]);

    useEffect(() => {
        dispatch(getConfigurations())

        const accessToken = localStorage.getItem('access_token');

        if (accessToken) {
            dispatch(loginByToken(accessToken));
        }
    }, []);

    //Scrolling
    let leftColumn = useRef();
    let rightColumn = useRef();

    const calcTop = (height, add) => `${-height + add > height ? height : -height + add}px`;

    useEffect(() => {
        let leftColumnHeight = leftColumn.current?.clientHeight;
        leftColumn.current.style.top = calcTop(leftColumnHeight, 700);

        let rightColumnHeight = rightColumn.current?.clientHeight;
        rightColumn.current.style.top = calcTop(rightColumnHeight, 700);
    }, []);

    return (<main className="main">
        <div className="main__container">
            <MainBar/>
            <div className="main__content-container">
                <div className="column left__column">
                    <div className="left__column-container" ref={leftColumn}>
                        <DateWidget/>
                        <CurrencyWidget/>
                    </div>
                </div>
                <div className="column news__column">
                    <Routes>
                        <Route exact path="/" element={<Navigate replace to={`/${countries[i18next.language]}`}/>}/>
                        <Route path="/account" element={<Account/>}/>
                        <Route path="/:country" element={<NewsContainer country={country} data={data}/>}/>
                        <Route path="*" element={<Navigate replace to={`/ua`}/>}/>
                    </Routes>
                </div>
                <div className="column right__column">
                    <div className="right__column-container" ref={rightColumn}>
                        <WeatherWidget/>
                    </div>
                </div>
            </div>
        </div>
    </main>);
}

export default Main;

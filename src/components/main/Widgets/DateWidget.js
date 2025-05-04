//Imports
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Calendar from 'react-calendar';
import { setNewsDate } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { newsReducer } from "../../../redux/reducers/newsReducer";

//Component
function DateWidget() {
    const [date, setDateState] = useState(new Date());
    let dispatch = useDispatch();
    const onChangeDate = (event) => {
        setDateState(event);
        const date = new Date(event);
        date.setDate(date.getDate() + 1)
        dispatch(setNewsDate(date.toISOString()));
    }

    const newsReducer = useSelector(state => {
        return state.newsReducer;
    })

    //Localisation
    const {t} = useTranslation();

    return (
        <div className="exchange__widget">
            <div className="widget__header">
                <span className="widget__title">{t("date-widget.title")}</span>
            </div>
            <div className="widget__items">
                <Calendar onChange={onChangeDate} value={date} locale={newsReducer.language}/>
            </div>
        </div>
    )
}

export default DateWidget;

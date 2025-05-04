import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

function MainBar() {

    const data = useSelector(state => {
        return state.newsReducer
    })

    //Localisation
    const {i18n} = useTranslation();

    //Get Format date
    function getTime() {
        return new Date().toLocaleString(`${i18n.language}`, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: "numeric",
            minute: "numeric"
        }).split(" ")
            .map((e) => !parseInt(e) && e.length > 3 ? e[0].toUpperCase() + e.slice(1) : e)
            .join(" ").replace(".,", ".");
    }

    useEffect(() => setTime(getTime), [data.articles])

    //State Format date
    const [time, setTime] = useState(getTime);

    //Update Format date
    setInterval(() => setTime(getTime), 1000);

    return (
        <div className="row main__bar">
            <span className="bar-item time">{time}</span>
        </div>
    )
}

export default MainBar;
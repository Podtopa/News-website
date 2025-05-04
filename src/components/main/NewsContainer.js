import React, { memo } from 'react';
//Components
import SingleNews from "./SingleNews";
import Message from "./Message";
import { useSelector } from "react-redux";

const localisation = {
    "ua": "uk",
    "ru": "ru",
    "us": "en"
}

function NewsContainer({data, country}) {
    //Redux
    const configData = useSelector(state => {
        return state.configurationsReducer
    })

    return (
        <>
            {
                data.articles.length && localisation.hasOwnProperty(country) ? data.articles.slice(0, configData.configurations.news_amount).map(res => {
                    return <SingleNews data={res} key={res.id}/>
                }) : < Message data={data} wrongLocal={localisation.hasOwnProperty(country)}/>
            }
        </>
    )
}

export default memo(NewsContainer);

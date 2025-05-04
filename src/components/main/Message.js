//Imports
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation, faMagnifyingGlass, faFaceFrown} from "@fortawesome/free-solid-svg-icons";
import {Trans, useTranslation} from "react-i18next";

//Component
function Message({data, wrongLocal}) {
    const {t} = useTranslation();
    let {articles, responseError, query} = data
    if (responseError) {
        //When fetch error
        return (
            <span className="news__message">
                <FontAwesomeIcon icon={faCircleExclamation}/><br/>
                    <Trans i18nKey="messages.error-message">
                        Oops, something went wrong...<br/>Please try again later!
                    </Trans>
             </span>
        )
    } else if (!articles.length && query) {
        //When article.length === 0
        return (
            <span className="news__message">
                <FontAwesomeIcon icon={faMagnifyingGlass}/><br/>
                {t("messages.empty-message")}
             </span>
        )
    } else if (!wrongLocal) {
        //Local != countries
        return (
            <span className="news__message">
                <FontAwesomeIcon icon={faFaceFrown}/> <span
                style={{"fontSize": "90px", "fontWeight": "500"}}>404</span><br/>
                {t("messages.page-message")}
             </span>
        )
    } else {
        return (<></>)
    }

}

export default Message;
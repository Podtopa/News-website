import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";

function RecommendationWidget() {

    const {t} = useTranslation();

    return (
        <div className="recommendation__widget">
            <div className="widget__header">
                <span className="widget__title">{t("recommendation-widget.title")}</span>
            </div>
            <div className="widget__items">
                <div className="widget__item">
                    <a className="item__title"
                       href="https://neim4n.github.io/Thrivetalk-Page/">Thrivetalk <FontAwesomeIcon icon={faLink}
                                                                                                    className="item__link"/></a>
                </div>
                <div className="widget__item">
                    <a className="item__title" href="https://neim4n.github.io/Bussines-Travel/">Bussines
                        Travel <FontAwesomeIcon icon={faLink} className="item__link"/></a>
                </div>
                <div className="widget__item">
                    <a className="item__title" href="https://neim4n.github.io/Restaurant-Landing-Page/">Veggie
                        Restaurant <FontAwesomeIcon icon={faLink} className="item__link"/></a>
                </div>
                <div className="widget__item">
                    <a className="item__title" href="https://neim4n.github.io/Startup-Landing-Page/">Startup
                        Page <FontAwesomeIcon icon={faLink} className="item__link"/></a>
                </div>
            </div>
        </div>
    )
}

export default RecommendationWidget;
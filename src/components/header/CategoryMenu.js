//Imports
import React, { useEffect } from "react";
import { chooseCategory, getConfigurations, loadNews } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {useTranslation} from "react-i18next";
import "../../i18n";
import { configurationsReducer } from "../../redux/reducers/configurationsReducer";

//Component
function CategoryMenu({categoryMenuRef, toggleMenu}) {

    const dispatch = useDispatch();
    //MenuHandler - click event
    const categoryHandler = (event) => {
        if (!event.target.closest(".menu__item") && !event.target.closest(".category__menu")) {
            toggleMenu();
        }
        if (event.target.closest(".menu__item")) {
            toggleMenu();
            dispatch(chooseCategory(event.target.id));
        }
    }

    //Redux
    const data = useSelector(state => {
        return state.configurationsReducer
    })

    //Localisation
    const {t} = useTranslation();

    return (
        <div className="header__category" onClick={categoryHandler} ref={categoryMenuRef}>
            <ul className="category__menu">
                {/*{data.categories.length && data.categories.map((category) => {*/}
                {/*    return category.category_status ?*/}
                {/*        <li className="menu__item"*/}
                {/*            key={category.id_category}*/}
                {/*            id={category.category_name}>{t(`category_menu.${category.category_name}`)}</li> :*/}
                {/*        <></>*/}
                {/*})}*/}
                <li className="menu__item" id="general">{t("category_menu.general")}</li>
                <li className="menu__item" id="business">{t("category_menu.business")}</li>
                <li className="menu__item" id="entertainment">{t("category_menu.entertainment")}</li>
                <li className="menu__item" id="health">{t("category_menu.health")}</li>
                <li className="menu__item" id="science">{t("category_menu.science")}</li>
                <li className="menu__item" id="sports">{t("category_menu.sports")}</li>
                <li className="menu__item" id="technology">{t("category_menu.technology")}</li>
            </ul>
        </div>
    )
}

export default CategoryMenu;

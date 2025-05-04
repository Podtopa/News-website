//Imports
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { chooseCategory, logout, setNewsDate } from "../../redux/actions";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

//Components
import CountrySelector from "./CountrySelector";
import CategoryMenu from "./CategoryMenu";
import SearchForm from "./SearchForm";
import DisplayLoader from "./DisplayLoader";

//Component
function Header() {
    //Refs
    let categoryMenuRef = React.createRef();
    let openMenuButton = React.createRef();
    let headerNavigation = React.createRef();
    let mobileSearchButton = React.createRef();

    //ToggleMenu - click event
    function toggleMenu(event) {
        openMenuButton.current.classList.toggle("active");
        categoryMenuRef.current.classList.toggle("active");
        mobileSearchButton.current.classList.toggle("non-active");
        mobileSearchButton.current.classList.remove("opened");
        setTimeout(() => setIcon(faMagnifyingGlass), 150);
        headerNavigation.current.classList.remove("open__mobile-search");
        document.body.classList.toggle("lock");
    }

    //Mobile Search Button handler - click event
    const [icon, setIcon] = useState(faMagnifyingGlass);

    function mobileSearchHandler(e) {
        if (!categoryMenuRef.current.classList.contains("active")) {
            mobileSearchButton.current.classList.toggle("opened");
            setTimeout(() => setIcon(icon === faMagnifyingGlass ? faXmark : faMagnifyingGlass), 150);
            headerNavigation.current.classList.toggle("open__mobile-search");
        }
    }

    const navigate = useNavigate();

    //Default Button
    let dispatch = useDispatch();

    function defaultButtonHandler() {
        navigate('/')
        dispatch(chooseCategory("breaking-news"));//general
    }

    //Localisation
    const {t} = useTranslation();

    //Scroll to top
    function scrollUp() {
        window.scroll(0, 0);
    }

    const [date, setDateState] = useState(new Date());
    const onChangeDate = (event) => {
        setDateState(event);
        const date = new Date(event);
        date.setDate(date.getDate() + 1)
        dispatch(setNewsDate(date.toISOString()));
    }

    return (
        <header className="header">
            <div className="header__container">
                <nav className="header__navigation" ref={headerNavigation}>
                    <ul className="header__menu">
                        <li className="menu__item title" onClick={scrollUp}>News</li>
                        <li className="menu__item chose-category">
                            <div onClick={toggleMenu} ref={openMenuButton} className="burger-menu"><span/></div>
                        </li>
                        <li className="menu__item load-default hovered"
                            onClick={defaultButtonHandler}>{t("header.load-default")}</li>
                        <li className="menu__item mobile-search-news" onClick={mobileSearchHandler}
                            ref={mobileSearchButton}>
                            <FontAwesomeIcon icon={icon}/>
                        </li>
                        <li className="menu__item search-news">
                            <SearchForm headerNavigation={headerNavigation} setIcon={setIcon}
                                        mobileSearchButton={mobileSearchButton}
                                        placeholder={t("header.input-placeholder")}/>
                        </li>
                        <li className="menu__item user">
                            <AccountButton/>
                        </li>
                        <li className="menu__item change-country">
                            <CountrySelector headerNavigation={headerNavigation}/>
                        </li>
                    </ul>
                    <DisplayLoader/>
                </nav>
                <CategoryMenu categoryMenuRef={categoryMenuRef} toggleMenu={toggleMenu}/>
            </div>
        </header>
    );
}

const AccountButton = () => {
    const [menu, setMenu] = useState(false);
    const authData = useSelector(state => {
        return state.authReducer
    })

    useEffect(() => {
        document.addEventListener('mousedown', handleClickListener);

        return () => {
            document.removeEventListener('mousedown', handleClickListener);
        };
    })

    const {t} = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickListener = (event) => {
        const target = event.target;

        if (target.closest('.header__user')) {
            if (authData.access_token) {
                setMenu(true);
            } else {
                navigate('/account')
            }
        } else {
            setMenu(false)
        }
    }

    const onAccount = () => {
        navigate('/account')
        setMenu(false)
    }

    const onLogOut = () => {
        navigate('/')
        setMenu(false)
        dispatch(logout());
    }

    return (
        <div className="header__user">
            <FontAwesomeIcon className="header__user-icon" icon={faUser}/>
            {menu &&
                <div className="header__user-menu">
                    <div className="header__user-menu-item" onClick={onAccount}>{t("account.menu.account")}</div>
                    <div className="header__user-menu-item" onClick={onLogOut}>{t("account.menu.logout")}</div>
                </div>
            }
        </div>
    )
}

export default Header;

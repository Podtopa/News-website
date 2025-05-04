//Imports
import React, { useEffect, useState } from "react";
import AsyncSelect from 'react-select/async';
import { useDispatch, useSelector } from "react-redux";
import { loadWeather } from "../../../redux/actions";
import { useTranslation } from "react-i18next";
import { City } from 'country-state-city';
import i18next from "i18next";
import { useLocation } from "react-router-dom";

const countries = {
    "uk": "ua",
    "ru": "ru",
    "en": "us"
}

//Component
function CurrencyWidget() {
    //States
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const onSelectDay = (index) => {
        setSelectedDay(index);
    }
    const onSelectCity = (city) => {
        setSelectedCity(city);
    }

    //Redux && get currencies
    const data = useSelector(state => {
        return state.weatherReducer.data
    })

    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedCity) {
            dispatch(loadWeather(selectedCity.name))
        }
    }, [selectedCity]);

    //Localisation
    const {t} = useTranslation();

    return (
        <div className="weather__widget">
            <div className="widget__header">
                <span className="widget__title">{t("weather-widget.title")}</span>
                <WidgetCitySearch onSelectCity={onSelectCity}/>
            </div>
            <div className="widget__items">
                <div className="widget__items-header">
                    {data && selectedDay === null && selectedCity !== null &&
                        <span className="header__currency">{t("weather-widget.subtitle")}</span>}
                    {data && selectedDay !== null && selectedCity !== null &&
                        <>
                            <span className="header__currency">{t("weather-widget.subtitle-hour")}</span>
                            <span onClick={() => onSelectDay(null)}
                                  className="header__return">{t("weather-widget.return")}</span>
                        </>
                    }
                </div>
                {
                    selectedCity !== null && selectedDay === null && data && data.days.map((day, index) => {
                        return <WidgetItemDay onSelectDay={onSelectDay} key={index} index={index} data={day}/>
                    })
                }
                {
                    selectedCity !== null && selectedDay !== null && data && data.days[selectedDay].hours.map((hour, index) => {
                        return <WidgetItemHour key={index} index={index} data={hour}/>
                    })
                }
            </div>
        </div>
    )
}

//Widget item component
const WidgetItemDay = React.memo(({data, index, onSelectDay}) => {
    const {i18n} = useTranslation();
    const dayWeek = new Date(data.datetime).toLocaleString(`${i18n.language}`, {weekday: 'short'}).toUpperCase();
    const icon = require(`../../../images/weather/${data.icon}.png`);

    return (
        <div className={(index === 0 ? "current" : "") + " widget__item weather"} onClick={() => onSelectDay(index)}>
            <span className="item__day">{dayWeek}</span>
            <img className="item__icon" src={icon} alt=""/>
            <span className="item__temperature">
                <span className="min">{Math.round(data.tempmin)}°C</span>
                -
                <span className="max">{Math.round(data.tempmax)}°C</span>
            </span>
        </div>
    );
});

//Widget item component
const WidgetItemHour = React.memo(({data, index}) => {

    const hour = data.datetime.split(':')[0]
    const icon = require(`../../../images/weather/${data.icon}.png`);

    return (
        <div className="widget__item hour">
            <span className="item__day">{hour}:00</span>
            <img className="item__icon" src={icon} alt=""/>
            <span className="item__temperature">{data.temp}°C</span>
        </div>
    );
});

//Widget item component
const WidgetCitySearch = React.memo(({onSelectCity}) => {
    //Router & i18n
    const location = useLocation();
    const country = (location.pathname.replace("/", "") || countries[i18next.language]).toUpperCase();
    const cities = City.getCitiesOfCountry(country);
    const [value, setValue] = useState(null);
    const [defaultOptions, setDefaultOptions] = useState();

    useEffect(() => {
        setValue(null);
        onSelectCity(null);
    }, [country])

    useEffect(() => {
        const options = cities.map((city) => {
            return {...city, value: city.name, label: city.name};
        }).slice(0, 10);
        setDefaultOptions(options);
    }, [])

    const handleChange = (e) => {
        setValue(e);
        onSelectCity(e);
    };

    const filterCities = (inputValue) => {
        return cities.map((city) => {
            return {...city, value: city.name, label: city.name};
        }).filter((city) =>
            city.name.toLowerCase().includes(inputValue.toLowerCase())
        ).slice(0, 25)
    };

    const loadOptions = (inputValue, callback) => {
        callback(filterCities(inputValue));
    };

    //Localisation
    const {t} = useTranslation();

    return (
        <AsyncSelect
            value={value}
            loadOptions={loadOptions}
            defaultOptions={defaultOptions}
            onChange={handleChange}
            placeholder={<div>{t("weather-widget.search.placeholder")}</div>}
            noOptionsMessage={() => t("weather-widget.search.error")}
            className="widget__search"
            classNamePrefix="select"
        />
    );
});

export default React.memo(CurrencyWidget);

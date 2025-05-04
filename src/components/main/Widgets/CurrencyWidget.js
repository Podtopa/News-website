//Imports
import React, {useEffect, useState, useCallback, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadCurrencyRates} from "../../../redux/actions";
import {useTranslation} from "react-i18next";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightLeft, faArrowRightLong} from "@fortawesome/free-solid-svg-icons";

import Flags from 'country-flag-icons/react/3x2'
import Select from 'react-select';

//Component
function CurrencyWidget() {
    //Redux && get currencies
    const data = useSelector(state => {
        return state.currencyReducer
    })

    //Redux
    const configData = useSelector(state => {
        return state.configurationsReducer.currencies
    })

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCurrencyRates())
    }, []);

    //States
    const [inputCurrency, setInputCurrency] = useState("USD");
    const [input, setInput] = useState("");
    const [resultCurrency, setResultCurrency] = useState("UAH");
    const [result, setResult] = useState("");

    //Get value function for SELECTS
    const getValue = (value) => {
        return value ? data.currencies.find(e => e.label === value) : "";
    };

    //Change button handler
    function changeCurrency(e) {
        e.target.closest(".converter-button").classList.toggle("rotated")
        let tempCurrency = resultCurrency;
        setResultCurrency(inputCurrency);
        setInputCurrency(tempCurrency);
    }

    //Calc result
    useEffect(() => {
        let a = getValue(resultCurrency);
        let b = getValue(inputCurrency);
        if (data.currencies.length) {
            let res = (a.value * input / b.value).toFixed(2);
            setResult(!Number.isNaN(+res) ? res : "");
        }
    }, [inputCurrency, resultCurrency, input]);

    //Format for option in select
    const formatOptionLabel = ({value, label, flag}) => {
        let Flag = Flags[flag ? flag : "EU"];
        return (<>
            {Flag && <Flag className="label-flag"/>}
            <div>{label}</div>
        </>)
    };

    const changeInputResult = useCallback((e) => {
        setInputCurrency(e.label)
    }, []);

    //Localisation
    const {t} = useTranslation();

    return (
        <div className="exchange__widget">
            <div className="widget__header">
                <span className="widget__title">{t("currency-widget.currency")}</span>
            </div>
            <div className="widget__items">
                <div className="widget__items-header">
                    <span className="header__currency">{t("currency-widget.currency")}</span>
                    <span className="header__base">{t("currency-widget.price")}, {data.base}</span>
                </div>
                {
                    configData && configData.map((currency, index) => {
                        return <WidgetItem key={index} data={data.currencies.find(elem => elem.label === currency.currency_label)}/>
                    })
                }
            </div>
            <form name="converter" className="widget__form">
                <div className="form-item">
                    <Select className='item-select-container'
                            classNamePrefix="item-select"
                            value={useMemo(() => getValue(inputCurrency), [data.currencies, inputCurrency])}
                            options={data.currencies}
                            onChange={changeInputResult}
                            formatOptionLabel={formatOptionLabel}
                    />
                    <input name="amount" max="1000000" type="number" step="0.01"
                           className="widget__form-input" placeholder="100.00"
                           onInput={e => setInput(e.target.value)}/>
                </div>
                <FontAwesomeIcon icon={faRightLeft} className="converter-button" onClick={changeCurrency}/>
                <div className="form-item">
                    <Select className='item-select-container'
                            classNamePrefix="item-select"
                            value={useMemo(() => getValue(resultCurrency), [data.currencies, resultCurrency])}
                            options={data.currencies}
                            onChange={useCallback(e => setResultCurrency(e.label), [])}
                            formatOptionLabel={formatOptionLabel}
                    />
                    <input className="widget__form-input"
                           value={result}
                           readOnly
                           placeholder="0.00"/>
                </div>
            </form>
        </div>
    )
}

//Widget item component
const WidgetItem = React.memo(({data}) => {
    let {label, value, previousValue, flag} = data ? data : {};
    let way = value >= previousValue ? "green" : "red";
    let Flag = Flags[flag ? flag : "UA"];

    return (
        <div className={way + " widget__item"}>
            <Flag className="item__flag"/>
            <span className="item__name">{label}</span>
            <span className="item__price">{value ? value.toFixed(2) : "-"}</span>
            <span className={way + " item__way"}> <FontAwesomeIcon className="item__way-arrow" icon={faArrowRightLong}/></span>
        </div>
    );
});

export default React.memo(CurrencyWidget);

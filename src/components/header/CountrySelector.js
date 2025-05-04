//Imports
import React, {useEffect, useState} from "react";
import Select from 'react-select';
import {Link, useLocation} from "react-router-dom";
import { countries } from "../../Config";

//Component
function CountrySelector({headerNavigation}) {
    //Router & i18n
    const location = useLocation();

    const country = location.pathname.replace("/", "");

    //Default value
    const [value, setValue] = useState(countries.some(e => e.value === country) ? country : "ua");

    useEffect(() => {
        setValue(countries.some(e => e.value === country) ? country : value)
    }, [country])

    function getValue() {
        return value ? countries.find(e => e.value === value) : "";
    }

    //CountryHandler - change event
    const chooseCountryHandler = (event) => {
        setValue(event.value);
    }

    //Format Option Label
    const formatOptionLabel = ({value, label}) => {
        return (
            <Link to={"/" + value}>{label}</Link>
        )
    };

    return (
        <Select className='item-select-container'
                classNamePrefix="item-select"
                isSearchable={false}
                formatOptionLabel={formatOptionLabel}
                value={getValue()}
                onChange={chooseCountryHandler}
                onMenuOpen={() => headerNavigation.current.classList.add("select-country-opened")}
                onMenuClose={() => headerNavigation.current.classList.remove("select-country-opened")}
                options={countries}/>
    )
}

export default CountrySelector;

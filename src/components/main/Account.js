import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addSubscription, deleteSubscription,
    editPassword, editSubscription,
    editUser, getSubscriptions,
    login,
    loginByToken,
    register, sendSubscription,
    setConfigurations
} from "../../redux/actions";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import Form from 'react-validation/build/form';
import Button from "react-validation/build/button";
import Flags from "country-flag-icons/react/3x2";

import validator from 'validator';
import { control } from "react-validation/build/main";
import { countries } from "../../Config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const requiredValidator = (value) => {
    if (!value.toString().trim().length) {
        return "required";
    }
};

const minlengthValidator = (value) => {
    if (value.toString().length < 3) {
        return "minlength";
    }
};

const emailValidator = (value) => {
    if (!validator.isEmail(value)) {
        return "email";
    }
};

const passwordValidator = (value) => {
    if (!validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0
    })) {
        return "password";
    }
};

const confirmPasswordValidator = (value, props, components) => {
    const bothUsed = components.password[0].isUsed && components.confirm[0].isUsed;
    const bothChanged = components.password[0].isChanged && components.confirm[0].isChanged;

    if (bothChanged && bothUsed && components.password[0].value !== components.confirm[0].value) {
        return "confirm_password";
    }
};

function Account() {
    //authReducer
    const authenticationReducer = useSelector(state => {
        return state.authReducer;
    })

    return (
        <>
            {
                authenticationReducer.access_token ?
                    <>
                        <EditAccountForm/>
                        <EditPasswordForm/>
                        <SubscriptionForm/>
                        {authenticationReducer.user_type === 'admin' && <ConfigurationForm/>}
                    </> : <AuthForm/>
            }
        </>
    )
}

const AuthForm = () => {
    const form = useRef(null);
    const nameInput = useRef(null);
    const surnameInput = useRef(null);
    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    const confirmInput = useRef(null);

    const [loginStatus, setLoginStatus] = useState(true);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const onSubmit = (event) => {
        event.preventDefault();

        if (loginStatus) {
            dispatch(login({email, password}))
        } else {
            dispatch(register({name, surname, email, password}))
            setLoginStatus(true);
            resetForm();
        }
    }

    const resetForm = () => {
        form.current.hideError(emailInput.current);
        form.current.hideError(passwordInput.current);

        setTimeout(() => {
            setName('');
            setSurname('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        })
    }

    const onChangeLoginStatus = () => {
        resetForm();
        setLoginStatus(!loginStatus);
    }

    const onChange = (event, type, options = null) => {
        if (type === 'email') {
            setEmail(event.target.value);
        } else if (type === 'password') {
            setPassword(event.target.value);
        } else if (type === 'name') {
            setName(event.target.value);
        } else if (type === 'surname') {
            setSurname(event.target.value);
        } else if (type === 'confirm_password') {
            setConfirmPassword(event.target.value);
        }
    }

    //Localisation
    const {t} = useTranslation();

    return (
        <div className="account__section">
            <Form className="account__form authentication" ref={form} onSubmit={onSubmit}>
                <div className="account__form-section">
                    <div
                        className="account__form-title">{t(loginStatus ? "account.login.title" : "account.register.title")}</div>

                    {!loginStatus &&
                        <>
                            <div className="account__form-item">
                                <label className="account__form-label">{t("account.inputs.name.label")}</label>
                                <Input className="account__form-input"
                                       type="text"
                                       name="name"
                                       ref={nameInput}
                                       value={name}
                                       validations={[requiredValidator, minlengthValidator]}
                                       onChange={event => onChange(event, 'name')}/>
                            </div>

                            <div className="account__form-item">
                                <label className="account__form-label">{t("account.inputs.surname.label")}</label>
                                <Input className="account__form-input"
                                       type="text"
                                       name="surname"
                                       ref={surnameInput}
                                       value={surname}
                                       validations={[requiredValidator, minlengthValidator]}
                                       onChange={event => onChange(event, 'surname')}/>
                            </div>
                        </>
                    }

                    <div className="account__form-item">
                        <label className="account__form-label">{t("account.inputs.email.label")}</label>
                        <Input className="account__form-input"
                               type="text"
                               name="email"
                               ref={emailInput}
                               value={email}
                               validations={[requiredValidator, emailValidator]}
                               onChange={event => onChange(event, 'email')}/>
                    </div>

                    <div className="account__form-item">
                        <label className="account__form-label">{t("account.inputs.password.label")}</label>
                        <Input className="account__form-input"
                               type="password"
                               name="password"
                               ref={passwordInput}
                               value={password}
                               validations={[requiredValidator, passwordValidator, !loginStatus ? confirmPasswordValidator : () => null]}
                               onChange={event => onChange(event, 'password')}/>
                    </div>

                    {!loginStatus &&
                        <div className="account__form-item">
                            <label className="account__form-label">{t("account.inputs.confirm.label")}</label>
                            <Input className="account__form-input"
                                   type="password"
                                   name="confirm"
                                   ref={confirmInput}
                                   value={confirmPassword}
                                   validations={[requiredValidator, passwordValidator, confirmPasswordValidator]}
                                   onChange={event => onChange(event, 'confirm_password')}/>
                        </div>
                    }
                </div>

                <Button
                    className="account__form-button">{t(loginStatus ? "account.login.button" : "account.register.button")}</Button>
                <span className="account__form-message"
                      onClick={onChangeLoginStatus}>{t(loginStatus ? "account.login.message" : "account.register.message")}</span>
            </Form>
        </div>
    )
}

const EditAccountForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    //Redux
    const authData = useSelector(state => {
        return state.authReducer
    })

    useEffect(() => {
        console.log(authData);
        setEmail(authData.user_email)
        setName(authData.user_name)
        setSurname(authData.user_surname)
    }, [authData])

    const dispatch = useDispatch();

    const onSubmit = (event) => {
        event.preventDefault();
        const accessToken = JSON.parse(localStorage.getItem('access_token'));

        dispatch(editUser({access_token: accessToken, name, surname, email, password}))
    }

    const onChange = (event, type) => {
        if (type === 'email') {
            setEmail(event.target.value);
        } else if (type === 'password') {
            setPassword(event.target.value);
        } else if (type === 'name') {
            setName(event.target.value);
        } else if (type === 'surname') {
            setSurname(event.target.value);
        }
    }

    //Localisation
    const {t} = useTranslation();

    return (
        <div className="account__section">
            <Form className="account__form" onSubmit={onSubmit}>
                <div className="account__form-section edit">
                    <div className="account__form-title">{t("account.user.title")}</div>

                    <div className="account__form-item">
                        <label className="account__form-label">{t("account.inputs.name.label")}</label>
                        <Input className="account__form-input"
                               type="text"
                               name="name"
                               validations={[requiredValidator, minlengthValidator]}
                               value={name}
                               onChange={event => onChange(event, 'name')}/>
                    </div>

                    <div className="account__form-item">
                        <label className="account__form-label">{t("account.inputs.surname.label")}</label>
                        <Input className="account__form-input"
                               type="text" name="surname"
                               validations={[requiredValidator, minlengthValidator]}
                               value={surname}
                               onChange={event => onChange(event, 'surname')}/>
                    </div>

                    <div className="account__form-item">
                        <label className="account__form-label">{t("account.inputs.email.label")}</label>
                        <Input className="account__form-input"
                               type="text" name="email"
                               validations={[requiredValidator, emailValidator]}
                               value={email}
                               onChange={event => onChange(event, 'email')}/>
                    </div>
                </div>

                <Button className="account__form-button">{t("account.user.button")}</Button>
            </Form>
        </div>
    )
}

const EditPasswordForm = () => {
    const form = useRef(null);
    const passwordInput = useRef(null);
    const confirmInput = useRef(null);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const onSubmit = (event) => {
        event.preventDefault();
        const accessToken = JSON.parse(localStorage.getItem('access_token'));

        dispatch(editPassword({access_token: accessToken, password}))
        resetForm();
    }

    const resetForm = () => {
        form.current.hideError(confirmInput.current);
        form.current.hideError(passwordInput.current);

        setTimeout(() => {
            setPassword('');
            setConfirmPassword('');
        })
    }

    const onChange = (event, type, options = null) => {
        if (type === 'password') {
            setPassword(event.target.value);
        } else if (type === 'confirm_password') {
            setConfirmPassword(event.target.value);
        }
    }

    //Localisation
    const {t} = useTranslation();

    return (
        <div className="account__section">
            <Form className="account__form" onSubmit={onSubmit} ref={form}>
                <div className="account__form-section edit">
                    <div className="account__form-title">{t("account.configurations.titles.password")}</div>
                    <div className="account__form-item">
                        <label className="account__form-label">{t("account.inputs.password.label")}</label>
                        <Input className="account__form-input"
                               type="password"
                               name="password"
                               ref={passwordInput}
                               value={password}
                               validations={[requiredValidator, passwordValidator, confirmPasswordValidator]}
                               onChange={event => onChange(event, 'password')}/>
                    </div>

                    <div className="account__form-item">
                        <label className="account__form-label">{t("account.inputs.confirm.label")}</label>
                        <Input className="account__form-input"
                               type="password"
                               name="confirm"
                               ref={confirmInput}
                               value={confirmPassword}
                               validations={[requiredValidator, passwordValidator, confirmPasswordValidator]}
                               onChange={event => onChange(event, 'confirm_password')}/>
                    </div>
                </div>
                <Button className="account__form-button">{t("account.user.button")}</Button>
            </Form>
        </div>
    )
}

const ConfigurationForm = () => {
    const [currencies, setCurrencies] = useState([]);
    const [newsAmount, setNewsAmount] = useState('');
    const [categories, setCategories] = useState([]);

    //Redux
    const configData = useSelector(state => {
        return state.configurationsReducer
    })

    //Redux && get currencies
    const currenciesData = useSelector(state => {
        return state.currencyReducer
    })

    useEffect(() => {
        setNewsAmount(configData.configurations.news_amount)
        setCategories(configData.categories)
        setCurrencies(configData.currencies)
    }, [configData])

    const onChange = (event, type, options = null) => {
        if (type === 'news_amount') {
            setNewsAmount(+event.target.value);
        } else if (type === 'category') {
            const index = event.target.id;
            const categoriesCopy = [...categories];
            categoriesCopy[index].category_status = !categoriesCopy[index].category_status
            setCategories(categoriesCopy);
        } else if (type === 'currencies') {
            const index = options.index;
            const currenciesCopy = [...currencies];
            currenciesCopy[index] = {currency_id: index + 1, currency_flag: event.flag, currency_label: event.label}
            setCurrencies(currenciesCopy);
        }
    }

    //Get value function for SELECTS
    const getValue = (value) => {
        return value ? currenciesData.currencies.find(e => e.label === value) : "";
    };

    //Format for option in select
    const formatOptionLabel = ({value, label, flag}) => {
        let Flag = Flags[flag ? flag : "EU"];
        return (<>
            {Flag && <Flag className="label-flag"/>}
            <div>{label}</div>
        </>)
    };

    const dispatch = useDispatch();
    const onSubmit = (event) => {
        event.preventDefault();
        const data = {
            configurations: {news_amount: newsAmount},
            categories: [...categories],
            currencies: [...currencies]
        }
        dispatch(setConfigurations(data));
    }

    //Localisation
    const {t} = useTranslation();

    return (
        <div className="account__section">
            <form className="account__form" onSubmit={onSubmit}>
                <div className="account__form-section">
                    <div className="account__form-title">{t("account.configurations.titles.configurations")}</div>
                    <div className="account__form-item">
                        <label
                            className="account__form-label">{t(`account.inputs.news-amount.label`)}</label>
                        <input className="account__form-input" type="number" name="news_amount" value={newsAmount}
                               onChange={event => onChange(event, 'news_amount')} min="1" max="10"/>
                    </div>
                </div>
                <hr/>
                <div className="account__form-section">
                    <div className="account__form-title">{t("account.configurations.titles.categories")}</div>
                    {
                        categories?.length && categories.map((category, index) => {
                            return <div key={index} className="account__form-item checkbox">
                                <label className="account__form-label">
                                    {t(`category_menu.${category.category_name}`)}
                                    <input className="account__form-checkbox"
                                           onChange={event => onChange(event, 'category')}
                                           type="checkbox"
                                           id={index} name={category.category_name}
                                           checked={category.category_status}/>
                                    <span className="account__form-checkmark"></span>
                                </label>
                            </div>
                        })
                    }
                </div>
                <hr/>
                <div className="account__form-section">
                    <div className="account__form-title">{t("account.configurations.titles.currencies")}</div>
                    {
                        currencies?.length && currencies.map((currency, index) => {
                            return <div className="account__form-item select" key={index}>
                                <label
                                    className="account__form-label">{t(`account.inputs.currency.label`)} {currency.currency_id}:</label>
                                <Select className='account__form-select currency'
                                        classNamePrefix="item-select"
                                        value={getValue(currency.currency_label)}
                                        options={currenciesData.currencies}
                                        onChange={event => onChange(event, 'currencies', {index})}
                                        formatOptionLabel={formatOptionLabel}
                                />
                            </div>
                        })
                    }
                </div>

                <input className="account__form-button" type="submit"
                       value={t("account.inputs.button")}/>
            </form>
        </div>
    )
}

const SubscriptionForm = () => {
    const [category, setCategory] = useState('');
    const [country, setCountry] = useState('');

    const configData = useSelector(state => {
        return state.configurationsReducer
    })

    const authData = useSelector(state => {
        return state.authReducer
    })

    const dispatch = useDispatch();
    const onSubmit = (event) => {
        event.preventDefault();
        const accessToken = JSON.parse(localStorage.getItem('access_token'));

        const data = {
            access_token: accessToken,
            country: country.value,
            language: country.lang,
            category: category.category_name
        }

        dispatch(addSubscription(data));
    }

    const onChange = (event, type) => {
        if (type === 'categories') {
            setCategory(event);
        } else if (type === 'country') {
            setCountry(event);
        }
    }

    const onDelete = (subscription_id) => {
        dispatch(deleteSubscription({subscription_id}));
    }

    const onEdit = (subscription_id, subscription_status) => {
        dispatch(editSubscription({subscription_id, subscription_status}));
    }

    const onSend = (data) => {
        dispatch(sendSubscription(data));
    }

    useEffect(() => {
        const accessToken = JSON.parse(localStorage.getItem('access_token'));

        console.log('getSubscriptions')
        dispatch(getSubscriptions({access_token: accessToken}))
    }, [])

    useEffect(() => {
        if (configData.categories.length) {
            setCategory(configData.categories[0]);
            setCountry(countries[0]);
        }
    }, [configData])

    //Get value function for SELECTS
    const getValue = (value, type) => {
        if (type === 'categories') {
            console.log(configData.categories.find(e => e.category_name === value.category_name))
            return value ? configData.categories.find(e => e.category_name === value.category_name) : "";
        } else if (type === 'country') {
            return value ? countries.find(e => e.value === value.value) : "";
        }
    };

    //Format for option in SELECTS
    const formatCategoryLabel = ({id_category, category_name, category_status}) => {
        return (<>{t(`category_menu.${category_name}`)}</>)
    };
    const formatCountryLabel = ({value, label, lang}) => {
        return (<>{label}</>)
    };

    //Localisation
    const {t} = useTranslation();

    return (
        <div className="account__section">
            <Form className="account__form" onSubmit={onSubmit}>
                <div className="account__form-section">
                    <div className="account__form-title">{t("account.configurations.titles.subscription")}</div>
                    <span className="account__form-input-message full">{t("account.inputs.messages.subscribe")}</span>
                    <div className="account__form-item select">
                        <label className="account__form-label">{t(`account.inputs.category.label`)}</label>
                        <Select className='account__form-select'
                                classNamePrefix="item-select"
                                value={getValue(category, 'categories')}
                                options={configData.categories}
                                onChange={event => onChange(event, 'categories')}
                                formatOptionLabel={formatCategoryLabel}
                        />
                    </div>
                    <div className="account__form-item select">
                        <label className="account__form-label">{t(`account.inputs.country.label`)}</label>
                        <Select className='account__form-select'
                                classNamePrefix="item-select"
                                value={getValue(country, 'country')}
                                options={countries}
                                onChange={event => onChange(event, 'country')}
                                formatOptionLabel={formatCountryLabel}
                        />
                    </div>
                    <Button className="account__form-button">{t("account.inputs.subscribe")}</Button>
                </div>
            </Form>
            <hr/>
            <form className="account__form subscriptions">
                <div className="account__form-section">
                    <div className="account__form-items subscription">
                        {
                            authData.subscriptions.map((subscription, index) => {
                                return <div className="account__form-item subscription" key={index}>
                                    <div className="account__form-item">
                                        {index === 0 && <label
                                            className="account__form-label">{t(`account.inputs.email.label`)}</label>}
                                        <div className="account__form-input">
                                            {subscription.user_email}
                                        </div>
                                    </div>

                                    <div className="account__form-item short">
                                        {index === 0 && <label
                                            className="account__form-label">{t(`account.inputs.category.label`)}</label>}
                                        <div className="account__form-input capitalize">
                                            {t(`category_menu.${subscription.subscription_category}`)}
                                        </div>
                                    </div>

                                    <div className="account__form-item short">
                                        {index === 0 && <label
                                            className="account__form-label capitalize">{t(`account.inputs.country.label`)}</label>}
                                        <div className="account__form-input">
                                            {countries.find((c) => c.value === subscription.subscription_country).label}
                                        </div>
                                    </div>

                                    {authData.user_type === 'admin' &&
                                        <>
                                            <button onClick={() => onSend(subscription)}
                                                    disabled={!subscription.subscription_status}
                                                    className="account__form-button">
                                                {t(`account.inputs.send`)}
                                            </button>
                                            <button
                                                onClick={() => onEdit(subscription.subscription_id, !subscription.subscription_status)}
                                                className="account__form-button">
                                                {t(subscription.subscription_status ? `account.inputs.pause` : `account.inputs.active`)}
                                            </button>
                                        </>
                                    }
                                    <button onClick={() => onDelete(subscription.subscription_id)}
                                            className="account__form-button">
                                        {t(`account.inputs.delete`)}
                                    </button>
                                </div>
                            })
                        }
                    </div>
                </div>
            </form>
        </div>)
}

// Define own Input component
const InputComponent = ({error, isChanged, isUsed, ...props}) => {
    const [type, setType] = useState('password');
    const startType = props.type;

    useEffect(() => {
        setType(props.type);
    },[])

    const onClick = () => {
        setType(type === 'password' ? 'text' : 'password')
    }

    //Localisation
    const {t} = useTranslation();

    return (
        <>
            <input {...props} type={type}/>
            {startType === 'password' && <FontAwesomeIcon icon={type === 'password' ? faEye : faEyeSlash}  className="account__form-input-icon" onClick={onClick}/>}
            <span
                className="account__form-input-message error">{isChanged && isUsed && error && t(`account.errors.${error}`)}</span>
        </>)
};
const Input = control(InputComponent);

export default Account;

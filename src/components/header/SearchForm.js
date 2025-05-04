//Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorage, inputQuery, setLocalStorage } from "../../redux/actions";

//Component
function SearchForm({headerNavigation, setIcon, mobileSearchButton, placeholder}) {
    //State
    const [query, setQuery] = useState("");
    //InputHandler - change event
    const inputHandler = (event) => {
        setQuery(event.target.value);
    }
    //QuickSearchHandler - on quick search
    const quickSearchHandler = (value) => {
        setQuery(value);
        dispatch(inputQuery(value))
    }
    //newsReducer
    const initialQuery = useSelector(state => {
        return state.newsReducer.query;
    })
    useEffect(() => {
        if (initialQuery !== query) {
            setQuery("");
        }
    }, [initialQuery])

    const dispatch = useDispatch();
    //FormHandler - submit event
    const formHandler = (event) => {
        //Mobile Icon
        setTimeout(() => setIcon(faMagnifyingGlass), 150);
        mobileSearchButton.current.classList.remove("opened");
        //Default Actions
        event.preventDefault();
        headerNavigation.current.classList.remove("open__mobile-search");
        dispatch(inputQuery(query))
        dispatch(setLocalStorage('search-history', query))
    }

    //Redux localStorage
    const localStorage = useSelector(state => {
        return state.localStorageReducer
    })
    useEffect(() => {
        dispatch(getLocalStorage('search-history'))
    }, [])

    return (
        <form className="search-news__form" onSubmit={formHandler}>
            <input type="text" className="search-news__input" placeholder={placeholder} onChange={inputHandler}
                   value={query}/>
            { localStorage.data.length > 0 && <div className="search-news__history">
                <ul className="search-news__history-list"> {
                    localStorage.data.map((item, index) => {
                        return <li className="search-news__history-item" key={index} onClick={() => quickSearchHandler(item)}>{item}</li>
                    })
                }
                </ul>
            </div>
            }
            <button type="submit" className="search-news__button"><FontAwesomeIcon
                icon={faMagnifyingGlass}/>
            </button>
        </form>
    )
}

export default SearchForm;

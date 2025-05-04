//Imports
import React from "react";
import {useSelector} from "react-redux";

//Component
function DisplayLoader() {
    // Off-On loader
    const spin = useSelector(state => {
        return state.appReducer.loading
    })

    return (
        <div className={spin ? "display__loader done" : "display__loader"}>
            <div className="loader"/>
        </div>
    )
}

export default DisplayLoader;
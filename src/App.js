//Imports
import './App.css';
import React, {Suspense} from "react";
import {HashRouter} from "react-router-dom";
//Components
import Header from './components/header/Header.js'
import Footer from './components/footer/Footer.js'
import Main from './components/main/Main.js'

//App
function App() {
    return (
        <Suspense fallback={<span>...</span>}>
            <HashRouter basename="/">
                <div className="wrapper">
                    <Header/>
                    <Main/>
                    <Footer/>
                </div>
            </HashRouter>
        </Suspense>
    );
}

export default App;

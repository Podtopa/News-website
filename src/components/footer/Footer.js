//Imports
import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTwitter, faGithub, faTelegram} from '@fortawesome/free-brands-svg-icons'
import {useTranslation} from "react-i18next";

//Component
function Footer() {
    //Localisation
    const {t} = useTranslation();

    //Scroll
    function scrollUp(){
        window.scroll(0,0);
    }
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__logo footer__column">
                    <a onClick={scrollUp} className="logo-item">NEWS</a>
                </div>
                <div className="footer__resources footer__column">
                    <span className="resources__title">{t("footer.resources")} :</span>
                    <a href="https://exchangeratesapi.io/" className="resources__item">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Git-logo-white.svg/1200px-Git-logo-white.svg.png"
                            alt=""/>
                    </a>
                    <a href="https://gnews.io/" className="resources__item">
                        <img src="https://gnews.io/assets/images/logo-white.svg" alt=""/>
                    </a>
                </div>
                <div className="footer__contact footer__column">
                    <span className="contact__title">{t("footer.contacts")} :</span>
                    <div className="contacts__container">
                        <a href="https://t.me/Neiman_sz" className="contact-item">
                            <FontAwesomeIcon icon={faTelegram}/>
                        </a>
                        <a href="https://github.com/Neim4n" className="contact-item">
                            <FontAwesomeIcon icon={faGithub}/>
                        </a>
                        <a href="" className="contact-item">
                            <FontAwesomeIcon icon={faTwitter}/>
                        </a>
                        <a href="mailto:NeimanDev@gmail.com"
                           className="contact-item email__item">NeimanDev@gmail.com</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
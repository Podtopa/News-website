import React from "react";
//Import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendarAlt, faClock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { TelegramShareButton, EmailShareButton, FacebookShareButton } from "react-share";
import { faFacebook, faTelegram } from "@fortawesome/free-brands-svg-icons";

//Component
function SingleNews({data}) {
    //News data
    const {url, image, title, description, source, publishedAt} = data;

    //Preloader
    let preloader = React.createRef()

    function loadImageHandler(e) {
        preloader.current.classList.add("done");
    }

    return (<a className="news__card" href={url}>
        <div className="card__image">
            <div className="preloader" ref={preloader}>
                <div className="loader"/>
            </div>
            <img className="card-image" onLoad={loadImageHandler}
                 src={image} alt=""/>
            <img className="card-image" src={image} alt=""/>
        </div>
        <span className="card__title">{title}</span>
        <span className="card__description"><span>{description || ""}</span></span>
        <span className="card__footer">
                    <span>{source.name ? <><FontAwesomeIcon icon={faUser}/> {source.name}</> : ""}</span>
                    <span><FontAwesomeIcon icon={faCalendarAlt}/> {publishedAt[0]}</span>
                    <span><FontAwesomeIcon icon={faClock}/> {publishedAt[1]}</span>
              <div className="card__share">
                  <TelegramShareButton title={`\n${title}\n\n${description || ""}`} url={url}>
                      <FontAwesomeIcon size={"2x"} icon={faTelegram} style={{color: "#305a83"}}/>
                  </TelegramShareButton>
                  <EmailShareButton url={url} subject={`News-Site: ${title}`} body={`${description || ""}\n\n`}>
                      <FontAwesomeIcon size={"2x"} icon={faEnvelope} style={{color: "#da4141"}}/>
                  </EmailShareButton>
                  <FacebookShareButton url={url}>
                      <FontAwesomeIcon size={"2x"} icon={faFacebook} style={{color: "#305a83"}}/>
                  </FacebookShareButton>
            </div>
        </span>
    </a>)
}

export default React.memo(SingleNews);

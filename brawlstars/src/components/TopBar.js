import React, { Component, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./TopBar.scss";
import i18n from "./i18n";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


const TopBar = () => {
  const [language, setLanguage] = useState('en');
  const [toggleActive, setToggleActive] = useState(false);

  const location = useLocation();
  const history = useHistory();
  const changelanguageToKo = () => {
    i18n.changeLanguage('ko');
    setLanguage('ko');
    console.log(history);
    const nextLocation = location.pathname.replace(language, "ko");
    history.push(nextLocation);
  }
  const changelanguageToEn = () => {
    i18n.changeLanguage('en');
    setLanguage('en');
    const nextLocation = location.pathname.replace(language, "en");
    history.push(nextLocation);
  }
  const changelanguageToJa = () => {
    i18n.changeLanguage('ja');
    setLanguage('ja');
    const nextLocation = location.pathname.replace(language, "ja");
    history.push(nextLocation);
  }
  const clickToggleBtn = () => {
    setToggleActive((value) => {
      return !value;
    })
  }

  return (
    <nav className="naviBar">
      <div className="logo">
        <Link to="/" className="container">
          <img src="/brawlMeta.png" alt="brawlMeta.png" />
          <div>Brawl Meta
          </div>
        </Link>
      </div>
      <ul className={`menuContainer ${toggleActive && "active"}`}>
        <li className="item"><Link to={`/${language}/`} >Home</Link></li>
        <li className="item"><Link to={`/${language}/info`}>Info</Link></li>
        <li className="item"><Link to={`/${language}/userList`}>Players</Link></li>
        <li className="item"><Link to={`/${language}/mapList`} >Maps</Link></li>
        <li className="item"><Link to={`/${language}/blog`} >Blog</Link></li>
        <div className="languageContainer">
          <div className={`language ${language === 'en' ? 'selected' : ''}`} onClick={changelanguageToEn}>en</div>
          <div className={`language ${language === 'ko' ? 'selected' : ''}`} onClick={changelanguageToKo}>ko</div>
          <div className={`language ${language === 'ja' ? 'selected' : ''}`} onClick={changelanguageToJa}>ja</div>
        </div>
      </ul>
      <div className="toggleBtn" onClick={clickToggleBtn}>
        <FontAwesomeIcon icon={faBars} />
      </div>
    </nav>
  );

}

export default TopBar;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./TopBar.scss";
import i18n from "./i18n";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


class TopBar extends Component {
  state = {
    language: 'en',
    toggleActive: false,
  }
  changelanguageToKo = () => {
    i18n.changeLanguage('ko');
    this.setState({
      language: 'ko',
    })
  }
  changelanguageToEn = () => {
    i18n.changeLanguage('en');
    this.setState({
      language: 'en',
    })
  }
  changelanguageToJa = () => {
    i18n.changeLanguage('ja');
    this.setState({
      language: 'ja',
    })
  }
  clickToggleBtn = () => {
    this.setState({
      toggleActive: !this.state.toggleActive,
    })
  }
  render() {
    return (
      <nav className="naviBar">
        <div className="logo">
          <Link to="/" className="container">
            <img src="/brawlMeta.png" alt="brawlMeta.png" />
            <div>Brawl Meta
            </div>
          </Link>
        </div>
        <ul className={`menuContainer ${this.state.toggleActive && "active"}`}>
          <li><Link to="/" className="item">Home</Link></li>
          <li><Link to="/info" className="item">Info</Link></li>
          <li><Link to="/userList" className="item">Players</Link></li>
          <li><Link to="/mapList" className="item">Maps</Link></li>
          <div className="languageContainer">
            <div className={`language ${this.state.language === 'en' ? 'selected' : ''}`} onClick={this.changelanguageToEn}>en</div>
            <div className={`language ${this.state.language === 'ko' ? 'selected' : ''}`} onClick={this.changelanguageToKo}>ko</div>
            <div className={`language ${this.state.language === 'ja' ? 'selected' : ''}`} onClick={this.changelanguageToJa}>ja</div>
          </div>
        </ul>
        <div className="toggleBtn" onClick={this.clickToggleBtn}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </nav>
    );
  }
}

export default TopBar;

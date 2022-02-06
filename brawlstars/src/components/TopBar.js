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
      <div className="naviBar">
        <div className="logo">
          <Link to="/" className="container">
            <img src="/brawlMeta.png" alt="brawlMeta.png" />
            <div>Brawl Meta
            </div>
          </Link>
        </div>
        <div className={`menuContainer ${this.state.toggleActive && "active"}`}>
          <Link to="/" className="item">Home</Link>
          <Link to="/info" className="item">Info</Link>
          <Link to="/userList" className="item">Players</Link>
          <Link to="/mapList" className="item">Maps</Link>
          <div className="languageContainer">
            <div className={`language ${this.state.language === 'en' ? 'selected' : ''}`} onClick={this.changelanguageToEn}>en</div>
            <div className={`language ${this.state.language === 'ko' ? 'selected' : ''}`} onClick={this.changelanguageToKo}>ko</div>
            <div className={`language ${this.state.language === 'ja' ? 'selected' : ''}`} onClick={this.changelanguageToJa}>ja</div>
          </div>
        </div>
        <div className="toggleBtn" onClick={this.clickToggleBtn}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
    );
  }
}

export default TopBar;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./TopBar.scss";
import i18n from "./i18n";


class TopBar extends Component {
  state = {
    language: 'en',
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
  render() {
    return (
      <div className="topBar">
        <div className="logo">
          <Link to="/" className="container">
            <img src="/brawlMeta.png" alt="brawlMeta.png" />
            <div>Brawl Meta
            </div>
          </Link>
        </div>
        <div className="menuContainer">
          <div className="item">
            <Link to="/">Home</Link>
          </div>
          <div className="item">
            <Link to="/info">Info</Link>
          </div>
          <div className="item">
            <Link to="/userList">Players</Link>
          </div>
          <div className="item">
            <Link to="/mapList">Maps</Link>
          </div>
          <div className="languageContainer">
            <div className={`language ${this.state.language === 'en' ? 'selected' : ''}`} onClick={this.changelanguageToEn}>en</div>
            <div className={`language ${this.state.language === 'ko' ? 'selected' : ''}`} onClick={this.changelanguageToKo}>ko</div>
            <div className={`language ${this.state.language === 'ja' ? 'selected' : ''}`} onClick={this.changelanguageToJa}>ja</div>
          </div>
        </div>
      </div>
    );
  }
}

export default TopBar;

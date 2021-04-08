import React, { Component } from "react";
import styles from "./Home.scss";
import { withTranslation } from 'react-i18next';

const languageList = ["korean", "english", "japanese"];
const displayNone = {
  display: "none",
};
class Home extends Component {
  render() {
    const { t } = this.props;
    return (
      <div
        style={{
          "marginTop": "30px",
        }}
        className="home"
      >

        <div className="contentContainer">
          <div className="content">
            {t('homeGuide')}
          </div>
        </div>

      </div>
    );
  }
}

export default withTranslation()(Home);

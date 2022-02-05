import React, { Component } from "react";
import "./Home.scss";
import { withTranslation } from 'react-i18next';
import AdSense from 'react-adsense';
import { ReactTitle } from 'react-meta-tags';

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
        <ReactTitle title={`Brawl Meta Info`} />
        <div className="contentContainer">
          <div className="content">
            {t('homeGuide')}
          </div>
        </div>
        <AdSense.Google
          style={{ display: 'block' }}
          client='ca-pub-4114406385852589'
          slot='4607116156'
          format='auto'
          responsive='true'
        />

      </div>
    );
  }
}

export default withTranslation()(Home);

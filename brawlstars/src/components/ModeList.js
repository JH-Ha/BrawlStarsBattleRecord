import React, { Component } from "react";
import { withTranslation } from 'react-i18next';
class ModeList extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    value: "gemGrab",
  };
  change = (event) => {
    const { changeMode } = this.props;
    let mode = event.target.value;
    this.setState({ value: mode });
    changeMode(mode);
  }
  componentDidMount() {
    const { mode } = this.props;
    this.setState({
      value: mode,
    });
  }
  render() {
    const { t } = this.props;
    return (
      <div className="selectBox">
        <label htmlFor="modeList">{t("mode")} </label>
        <select id="modeList" onChange={this.change} value={this.state.value}>
          <option value="ALL">{t("All")}</option>
          <option value="gemGrab">{t("gemGrab")}</option>
          <option value="heist">{t("heist")}</option>
          <option value="brawlBall">{t("brawlBall")}</option>
          <option value="bounty">{t("bounty")}</option>
          <option value="siege">{t("siege")}</option>
          <option value="hotZone">{t("hotZone")}</option>
          <option value="knockout">{t("knockout")}</option>
          <option value="volleyBrawl">{t("volleyBrawl")}</option>
          <option value="basketBrawl">{t("basketBrawl")}</option>
          <option value="holdTheTrophy">{t("holdTheTrophy")}</option>
          <option value="soloShowdown">{t("soloShowdown")}</option>
          <option value="duoShowdown">{t("duoShowdown")}</option>
        </select>
      </div>
    );
  }
}

export default withTranslation()(ModeList);

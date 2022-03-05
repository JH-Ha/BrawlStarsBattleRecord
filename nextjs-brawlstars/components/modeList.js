import React, { useState } from "react";
import { useTranslation } from 'next-i18next';

const ModeList = ({ mode, changeMode }) => {

  const [value, setValue] = useState(mode);
  const { t } = useTranslation();
  const change = (event) => {
    let mode = event.target.value;
    setValue(mode);
    changeMode(mode);
  }
  return (
    <div className="selectBox">
      <label htmlFor="modeList">{t("mode")} </label>
      <select id="modeList" onChange={change} value={value}>
        <option value="ALL">{t("All")}</option>
        <option value="gemGrab">{t("gemGrab")}</option>
        <option value="heist">{t("heist")}</option>
        <option value="brawlBall">{t("brawlBall")}</option>
        <option value="bounty">{t("bounty")}</option>
        <option value="siege">{t("siege")}</option>
        <option value="hotZone">{t("hotZone")}</option>
        <option value="knockout">{t("knockout")}</option>
        <option value="wipeout">{t("wipeout")}</option>
        {/* <option value="volleyBrawl">{t("volleyBrawl")}</option>
          <option value="basketBrawl">{t("basketBrawl")}</option>
          <option value="holdTheTrophy">{t("holdTheTrophy")}</option> */}
        <option value="soloShowdown">{t("soloShowdown")}</option>
        <option value="duoShowdown">{t("duoShowdown")}</option>
      </select>
    </div>
  );
}

export default ModeList;

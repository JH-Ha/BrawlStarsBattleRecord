import React, { useState } from "react";
import { useTranslation } from 'next-i18next';


let brawlerNameList = [
  "SHELLY",
  "NITA",
  "COLT",
  "BULL",
  "JESSIE",
  "BROCK",
  "DYNAMIKE",
  "EL PRIMO",
  "BARLEY",
  "POCO",
  "RICO",
  "DARRYL",
  "PIPER",
  "PENNY",
  "BO",
  "MORTIS",
  "TARA",
  "PAM",
  "FRANK",
  "CROW",
  "SPIKE",
  "LEON",
  "GENE",
  "TICK",
  "ROSA",
  "8-BIT",
  "CARL",
  "BIBI",
  "EMZ",
  "BEA",
  "SPROUT",
  "SANDY",
  "JACKY",
  "MAX",
  "MR. P",
  "GALE",
  "COLETTE",
  "AMBER",
  "BYRON",
  "STU",
  "COLONEL RUFFS",
  "LOU",
  "EDGAR",
  "SURGE",
  "SQUEAK",
];
//brawlerNameList = brawlerNameList.sort();
//brawlerNameList.unshift("ALL");

const BrawlerList = ({ brawlerName, changeBrawler }) => {

  const change = (event) => {
    let value = event.target.value;
    changeBrawler(value);
  }
  const { t } = useTranslation();

  let bnList = brawlerNameList.map(name => {
    return {
      "value": name,
      "label": t(name)
    };
  });

  bnList.sort((a, b) => {
    if (a.label < b.label) return -1
    else return 1;
  });

  bnList.unshift({
    "value": "All",
    "label": "All"
  });

  return (
    <div className="form-floating">
      <select
        id="brawlerName"
        onChange={change}
        value={brawlerName}
        className="form-select"
      >
        {bnList.map((bn, index) => {
          return (
            <option key={bn.value} label={bn.label} value={bn.value}>
              {bn.label}
            </option>
          );
        })}
      </select>
      <label htmlFor="brawlerName">{t("brawler")}</label>
    </div>
  );
}


export default BrawlerList;

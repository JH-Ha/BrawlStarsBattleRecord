import React, { useState } from "react";
import { useTranslation } from 'next-i18next';
import { modeInfo } from "./modeInfo";

type ModeListProps = {
  mode: string,
  changeMode: (mode: string) => any
}

const ModeList: React.FC<ModeListProps> = ({ mode, changeMode }) => {

  const [value, setValue] = useState<string>(mode);
  const { t } = useTranslation();
  const change: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    let mode = event.target.value;
    setValue(mode);
    changeMode(mode);
  }
  return (
    <div className="selectBox">
      <label htmlFor="modeList">{t("mode")} </label>
      <select id="modeList" onChange={change} value={value}>
        <option value="ALL">{t("All")}</option>
        {modeInfo.map((mode => {
          return <option value={mode.name}>{t(mode.name)}</option>
        }))}
      </select>
    </div>
  );
}

export default ModeList;

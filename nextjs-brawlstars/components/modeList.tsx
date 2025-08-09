import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
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
    <div className="form-floating">
      <select id="modeList" className="form-select" onChange={change} value={value}>
        <option value="ALL">{t("All")}</option>
        {modeInfo.map((mode => {
          return <option key={mode.name} value={mode.name}>{t(mode.name)}</option>
        }))}
      </select>
      <label htmlFor="modeList">{t("mode")} </label>
    </div>
  );
}

export default ModeList;

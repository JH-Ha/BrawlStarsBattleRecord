import React from 'react';
import { getLocalTime } from "./BaseFunctions";
import { useTranslation } from "react-i18next";

interface DisplayTimeProps {
    endTime: string;
}

const DisplayTime: React.FC<DisplayTimeProps> = (props) => {
    const { t } = useTranslation();
    let endTime = getLocalTime(props.endTime);
    let now = new Date();
    let diffTime = (endTime.getTime() - now.getTime()) / 1000;
    let displayTime = '';
    // in one day
    let diffDays = Math.floor(diffTime / 86400);
    let diffHours = Math.floor(diffTime / 3600) % 24;
    let diffMinutes = Math.floor((diffTime / 60)) % 60;
    if (diffDays >= 1) {
        displayTime += `${diffDays}${t('days')} `;
    }
    if (diffHours >= 1) {
        displayTime += `${diffHours}${t('hours')} `;
    }
    if (diffMinutes >= 1) {
        displayTime += `${diffMinutes}${t('minutes')} `;
    }

    return <div>
        {displayTime}
    </div>
}
export default DisplayTime;
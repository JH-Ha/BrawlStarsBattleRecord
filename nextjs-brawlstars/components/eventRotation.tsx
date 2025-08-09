import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from "../styles/EventRotation.module.scss";
import DisplayTime from './DisplayTime';
import { useRouter } from 'next/router';
import { isTeamMode, isTrio, isDuels } from './BaseFunctions';

interface WinRateData {
    brawlerName: string;
    winRate?: number;
    averageRank?: number;
}

interface EventData {
    mode: string;
    map: string;
    isPlus?: boolean;
}

interface EventItem {
    event: EventData;
    endTime?: string;
    startTime?: string;
    winRate?: WinRateData[];
}

interface EventRotationProps {
    todayEvents: EventItem[];
    nextEvents: EventItem[];
}

const EventRotation: React.FC<EventRotationProps> = ({ todayEvents, nextEvents }) => {
    const { t } = useTranslation('common');
    const router = useRouter();

    const onClickEvent = (map: string, mode: string) => {
        router.push(`/map/${map}/mode/${mode}`);
    }

    return (
        <div className={styles.eventRotation}>
            <div className={styles.title}>
                {String(t("Today's Events"))}
            </div>
            <div className={styles.eventContainer}>
                {todayEvents.map((ele, index) => {
                    return <div key={`TodayMaps-${index}`} className={styles.event}>
                        <div className={styles.topBar}>
                            <div>{String(t('newEventMsg'))}</div>
                            <div>:&nbsp;</div>
                            <DisplayTime endTime={ele.endTime || ''}></DisplayTime>
                        </div>
                        <div className={`${styles[ele.event.mode]} ${styles.info} ${ele.event.isPlus ? styles.plus : ''}`}
                            onClick={() => onClickEvent(ele.event.map, ele.event.mode)}>
                            <div className={styles.eventInfoContainer}>
                                <div className={styles.modeImg}>
                                    <img src={`/images/mode/${ele.event.mode}.webp`} alt={ele.event.mode}></img>
                                </div>
                                <div className={styles.eventInfo}>
                                    <div>{String(t(ele.event.mode))}</div>
                                    <div>{String(t(ele.event.map))}</div>
                                </div>
                            </div>
                            <div className={styles.winRateInfo}>
                                {ele.winRate?.map(e => {
                                    return <div key={`${ele.event.mode}-${e.brawlerName}`}>
                                        <img className={styles.brawlerImg} src={`/images/${e.brawlerName}.webp`} alt={e.brawlerName} />
                                        {isTeamMode(ele.event.mode) ?
                                            <div>{Math.floor((e.winRate || 0) * 100)}%</div>
                                            : <div>{Math.floor((e.averageRank || 0) * 100) / 100}</div>
                                        }
                                    </div>
                                })}
                                {(ele.winRate?.length || 0) === 0 ? <div className={styles.noStats}> {String(t("noStatistics"))} </div> : <div></div>}
                            </div>
                        </div>
                    </div>
                })}
            </div>
            <div className={styles.title}>
                {String(t("Next Events"))}
            </div>
            <div className={styles.eventContainer}>
                {nextEvents.map((ele, index) => {
                    return <div key={`nextEvents-${index}`} className={styles.event}>
                        <div className={styles.topBar}>
                            <div>{String(t('newEventMsg'))}</div>
                            <div>:&nbsp;</div>
                            <DisplayTime endTime={ele.startTime || ''}></DisplayTime>
                        </div>
                        <div className={`${styles[ele.event.mode]} ${styles.info} ${ele.event.isPlus ? styles.plus : ''}`}
                            onClick={() => onClickEvent(ele.event.map, ele.event.mode)}>
                            <div className={styles.eventInfoContainer}>
                                <div className={styles.modeImg}>
                                    <img src={`/images/mode/${ele.event.mode}.webp`} alt={ele.event.mode}></img>
                                </div>
                                <div className={styles.eventInfo}>
                                    <div>{String(t(ele.event.mode))}</div>
                                    <div>{String(t(ele.event.map))}</div>
                                </div>
                            </div>
                            <div className={styles.winRateInfo}>
                                {ele.winRate?.map(e => {
                                    return <div key={`${ele.event.map}-${ele.event.mode}-${e.brawlerName}`}>
                                        <img className={styles.brawlerImg} src={`/images/${e.brawlerName}.webp`} alt={e.brawlerName} />
                                        {isTrio(ele.event.mode) || isDuels(ele.event.mode) ?
                                            <div>{Math.floor((e.winRate || 0) * 100)}%</div>
                                            : <div>{Math.floor((e.averageRank || 0) * 100) / 100}</div>
                                        }
                                    </div>
                                })}
                                {(ele.winRate?.length || 0) === 0 ? <div className={styles.noStats}> {String(t("noStatistics"))} </div> : <div></div>}
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default EventRotation;
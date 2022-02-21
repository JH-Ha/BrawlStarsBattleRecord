import React, { useEffect, useState } from 'react';
import { getData } from "./ApiHandler";
import { calWinRate, getLocalTime, isTrio } from './BaseFunctions';
import { useTranslation } from 'react-i18next';
import styles from "../styles/EventRotation.module.scss";
import DisplayTime from './DisplayTime';
import i18n from './i18n';

const EventRotation = () => {
    //const [events, setEvents] = useState([]);

    const [todayEvents, setTodayEvents] = useState([]);
    const [nextEvents, setNextEvents] = useState([]);
    const [update, setUpdate] = useState(0);
    const { t } = useTranslation();
    //const history = useHistory();

    //update components every minutes
    setInterval(() => {
        setUpdate(update + 1);
    }, 60000);

    useEffect(() => {
        const eventInfo = getData("/api/events/rotation").then(response => {
            //console.log(response.data);
            const events = response.data;
            let now = new Date();
            let todayEventsTemp = [];
            let nextEventsTemp = [];

            //console.log(showdownEvents);

            events
                .filter(e => e.event.mode !== 'duoShowdown')
                .forEach(e => {
                    const startTime = getLocalTime(e.startTime);
                    const endTime = getLocalTime(e.endTime);
                    if ((startTime < now) && (now <= endTime)) {
                        todayEventsTemp.push(e);
                    } else {
                        nextEventsTemp.push(e);
                    }
                    //console.log(`${startTime} - ${now} -${endTime}`);
                    if (e.event.mode === 'soloShowdown' && e.startTime.substr(9, 2) ===
                        "08") {
                        e.event.isPlus = true;
                    }
                    if (e.statistics !== null) {
                        e.winRate = calWinRate(e.statistics, e.event.mode).slice(0, 5);
                    }
                });
            setTodayEvents(todayEventsTemp);
            setNextEvents(nextEventsTemp);
            return response.data;
        })
        console.log(eventInfo);
    }, []);

    const onClickEvent = (map, mode) => {
        history.push(`/${i18n.language}/map/${map}/mode/${mode}`);
    }

    return (
        <div className={styles.eventRotation}>
            {/* <ReactTitle title={`Brawl Meta Event Rotation`} /> */}
            <div className={styles.title}>
                {t("Today's Events")}
            </div>
            <div className={styles.eventContainer}>
                {todayEvents.map((ele, index) => {
                    return <div key={`TodayMaps-${index}`} className={styles.event}>
                        <div className={styles.topBar}>
                            <div>{t('newEventMsg')}</div>
                            <div>:&nbsp;</div>
                            <DisplayTime endTime={ele.endTime}></DisplayTime>
                        </div>
                        <div className={`${styles[ele.event.mode]} ${styles.info} ${ele.event.isPlus ? styles.plus : ''}`}
                            onClick={() => onClickEvent(ele.event.map, ele.event.mode)}>
                            <div className={styles.eventInfoContainer}>
                                <div className={styles.modeImg}>
                                    <img src={`/images/mode/${ele.event.mode}.png`} alt={ele.event.mode}></img>
                                </div>
                                <div className={styles.eventInfo}>
                                    <div>{t(ele.event.mode)}</div>
                                    <div>{t(ele.event.map)}</div>
                                </div>
                            </div>
                            <div className={styles.winRateInfo}>
                                {ele.winRate?.map(e => {
                                    return <div key={`${ele.event.mode}-${e.brawlerName}`}>
                                        <img className={styles.brawlerImg} src={`/images/${e.brawlerName}.png`} alt={e.brawlerName} />
                                        {isTrio(ele.event.mode) ?
                                            <div>{Math.floor(e.winRate * 100)}%</div>
                                            : <div>{Math.floor(e.averageRank * 100) / 100}</div>
                                        }

                                    </div>
                                })}
                                {ele.winRate?.length === 0 ? <div className='noStats'> No Statistics </div> : <div></div>}
                            </div>
                        </div>
                    </div>
                })}
            </div>
            <div className={styles.title}>
                {t("Next Events")}
            </div>
            <div className={styles.eventContainer}>
                {nextEvents.map((ele, index) => {
                    return <div key={`nextEvents-${index}`} className={styles.event}>
                        <div className={styles.topBar}>
                            <div>{t('newEventMsg')}</div>
                            <div>:&nbsp;</div>
                            <DisplayTime endTime={ele.startTime}></DisplayTime>
                        </div>
                        <div className={`${styles[ele.event.mode]} ${styles.info} ${ele.event.isPlus ? styles.plus : ''}`}
                            onClick={() => onClickEvent(ele.event.map, ele.event.mode)}>
                            <div className={styles.eventInfoContainer}>
                                <div className={styles.modeImg}>
                                    <img src={`/images/mode/${ele.event.mode}.png`} alt={ele.event.mode}></img>
                                </div>
                                <div className={styles.eventInfo}>
                                    <div>{t(ele.event.mode)}</div>
                                    <div>{t(ele.event.map)}</div>
                                </div>
                            </div>
                            <div className={styles.winRateInfo}>
                                {ele.winRate?.map(e => {
                                    return <div key={`${ele.event.map}-${e.event.mode}-${e.brawlerName}`}>
                                        <img className="brawlerImg" src={`/images/${e.brawlerName}.png`} alt={e.brawlerName} />
                                        {isTrio(ele.event.mode) ?
                                            <div>{Math.floor(e.winRate * 100)}%</div>
                                            : <div>{Math.floor(e.averageRank * 100) / 100}</div>
                                        }
                                    </div>

                                })}
                                {ele.winRate?.length === 0 ? <div className={styles.noStats}> No Statistics </div> : <div></div>}
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default EventRotation;
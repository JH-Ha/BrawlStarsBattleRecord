import React, { useEffect, useState } from 'react';
import { getData } from "./ApiHandler";
import { calWinRate, getLocalTime, isTrio } from './BaseFunctions';
import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router";
import "./EventRotation.scss";
import DisplayTime from './DisplayTime';

const EventRotation = () => {
    //const [events, setEvents] = useState([]);

    const [todayEvents, setTodayEvents] = useState([]);
    const [nextEvents, setNextEvents] = useState([]);
    const [update, setUpdate] = useState(0);
    const { t } = useTranslation();
    const history = useHistory();

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
        history.push(`/map/${map}/mode/${mode}`);
    }

    return (
        <div className="eventRotation">
            <div className="title">
                Today's Events
            </div>
            <div className="eventContainer">
                {todayEvents.map((ele, index) => {
                    return <div key={`TodayMaps-${index}`} className="event">
                        <div className="topBar">
                            <div>{t('newEventMsg')}</div>
                            <div>:&nbsp;</div>
                            <DisplayTime endTime={ele.endTime}></DisplayTime>
                        </div>
                        <div className={`${ele.event.mode} info ${ele.event.isPlus ? 'plus' : ''}`}
                            onClick={() => onClickEvent(ele.event.map, ele.event.mode)}>
                            <div className="eventInfoContainer">
                                <div className="modeImg">
                                    <img src={`images/mode/${ele.event.mode}.png`} alt={ele.event.mode}></img>
                                </div>
                                <div className="eventInfo">
                                    <div>{t(ele.event.mode)}</div>
                                    <div>{t(ele.event.map)}</div>
                                </div>
                            </div>
                            <div className="winRateInfo">
                                {ele.winRate?.map(e => {
                                    return <div>
                                        <img className="brawlerImg" src={`/images/${e.brawlerName}.png`} alt={e.brawlerName} />
                                        {isTrio(ele.event.mode) ?
                                            <div>{Math.floor(e.winRate * 100)}%</div>
                                            : <div>{Math.floor(e.averageRank * 100) / 100}</div>
                                        }

                                    </div>

                                })}
                            </div>
                        </div>
                    </div>
                })}
            </div>
            <div className="title">Next Events</div>
            <div className="eventContainer">
                {nextEvents.map((ele, index) => {
                    return <div key={`nextEvents-${index}`} className="event">
                        <div className="topBar">
                            <div>{t('newEventMsg')}</div>
                            <div>:&nbsp;</div>
                            <DisplayTime endTime={ele.endTime}></DisplayTime>
                        </div>
                        <div className={`${ele.event.mode} info ${ele.event.isPlus ? 'plus' : ''}`}
                            onClick={() => onClickEvent(ele.event.map, ele.event.mode)}>
                            <div className="eventInfoContainer">
                                <div className="modeImg">
                                    <img src={`images/mode/${ele.event.mode}.png`} alt={ele.event.mode}></img>
                                </div>
                                <div className="eventInfo">
                                    <div>{t(ele.event.mode)}</div>
                                    <div>{t(ele.event.map)}</div>
                                </div>
                            </div>
                            <div className="winRateInfo">
                                {ele.winRate?.map(e => {
                                    return <div>
                                        <img className="brawlerImg" src={`/images/${e.brawlerName}.png`} alt={e.brawlerName} />
                                        {isTrio(ele.event.mode) ?
                                            <div>{Math.floor(e.winRate * 100)}%</div>
                                            : <div>{Math.floor(e.averageRank * 100) / 100}</div>
                                        }

                                    </div>

                                })}
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default EventRotation;
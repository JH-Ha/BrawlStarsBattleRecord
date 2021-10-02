import React, { useEffect, useState } from 'react';
import { getData } from "./ApiHandler";
import { getLocalTime } from './BaseFunctions';
import "./TodayMaps.scss";

const TodayMaps = () => {
    //const [events, setEvents] = useState([]);
    const events = [];
    const [todayEvents, setTodayEvents] = useState([]);
    const [nextEvents, setNextEvents] = useState([]);
    useEffect(() => {
        const eventInfo = getData("/api/events/rotation").then(response => {
            console.log(response.data);
            const events = response.data;
            let now = new Date();
            let todayEventsTemp = [];
            let nextEventsTemp = [];
            events.forEach(e => {
                const startTime = getLocalTime(e.startTime);
                const endTime = getLocalTime(e.endTime);
                if ((startTime < now) && (now < endTime)) {
                    todayEventsTemp.push(e);
                } else {
                    nextEventsTemp.push(e);
                }

                console.log(`${startTime} - ${now} -${endTime}`);
            });
            setTodayEvents(todayEventsTemp);
            setNextEvents(nextEventsTemp);
            //setEvents(response.data);
            return response.data;
        })
        console.log(eventInfo);
    }, []);

    return (
        <div class="todayMaps">
            {nextEvents.map((ele, index) => {
                return <div key={`TodayMaps-${index}`}>
                    <img class="modeImg" src={`images/mode/${ele.event.mode}.png`} alt={ele.event.mode}></img>
                    <div>
                        {ele.event.mode}-{ele.event.map}
                    </div>
                </div>
            })}
        </div>
    )
}

export default TodayMaps;
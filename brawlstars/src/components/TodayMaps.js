import React, { useState } from 'react';
import { getData } from "./ApiHandler";

const TodayMaps = () => {
    getData("/api/events/rotation").then(data => {
        console.log(data);
    })
    return (
        <div>

        </div>
    )
}

export default TodayMaps;
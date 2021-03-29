import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import styles from "./Map.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons'

class Map extends Component {
    state = {
        mapName: "",
        recordArr: [],
        sumTotalGameNum: 0,
    }
    isSolo(mode) {
        if (mode === "soloShowdown") {
            return true;
        }
        return false;
    }
    isDuo(mode) {
        if (mode === "duoShowdown") {
            return true;
        }
        return false;
    }
    isTrio(mode) {
        let result = false;
        if (
            mode === "gemGrab" ||
            mode === "heist" ||
            mode === "siege" ||
            mode === "bounty" ||
            mode === "brawlBall" ||
            mode === "hotZone"
        ) {
            result = true;
        }
        return result;
    }
    componentDidMount() {
        const query = qs.parse(this.props.location.search, {
            ignoreQueryPrefix: true,
        });
        console.log(query);
        const mapName = query.mapName;
        const mode = query.mode;
        console.log(mapName);
        let records = {};
        let recordArr = [];
        axios.get(`http://brawlstat.xyz:8080/record/map/${mapName}?mode=${mode}`)
            //axios.get(`http://localhost:8080/record/map/${mapName}?mode=${mode}`)
            .then(response => {
                console.log(response);
                const data = response.data;
                console.log(data);
                data.forEach(e => {
                    // brawlerName: "COLETTE"
                    // cnt: 14
                    // result: "defeat"
                    // __proto__: Object
                    if (this.isTrio(mode)) {
                        if (records[e.brawlerName] === undefined) {
                            records[e.brawlerName] = {
                            };
                        }
                        records[e.brawlerName] = {
                            ...records[e.brawlerName],
                            [e.result]: e.cnt,
                        }
                    } else {
                        records[e.brawlerName] = {
                            brawlerName: e.brawlerName,
                            averageRank: e.averageRank,
                            cnt: e.cnt,
                        }
                    }
                });
                console.log(records);
                let sumTotalGameNum = 0;
                if (this.isTrio(mode)) {
                    for (let key in records) {
                        let { victory, defeat, draw } = records[key];
                        const victoryNum = victory || 0;
                        const defeatNum = defeat || 0;
                        const drawNum = draw || 0;
                        const totalGameNum = victoryNum + defeatNum + drawNum;
                        recordArr.push({
                            "brawlerName": key,
                            "victory": victoryNum,
                            "defeat": defeatNum,
                            "draw": drawNum,
                            "winRate": (victoryNum) / totalGameNum,
                            "totalGameNum": totalGameNum
                        });
                        sumTotalGameNum += totalGameNum;
                    }

                    recordArr.sort((a, b) => {
                        return b.winRate - a.winRate;
                    })
                } else {
                    for (let key in records) {
                        let { averageRank, cnt } = records[key];
                        recordArr.push({
                            "brawlerName": key,
                            "averageRank": averageRank,
                            "totalGameNum": cnt
                        });
                        sumTotalGameNum += cnt;
                    }
                    recordArr.sort((a, b) => {
                        return a.averageRank - b.averageRank;
                    })
                }
                console.log(recordArr);
                this.setState({
                    recordArr: recordArr,
                    sumTotalGameNum: sumTotalGameNum
                })
            }).catch(error => {
                console.log(error);
            });
    }
    render() {
        const query = qs.parse(this.props.location.search, {
            ignoreQueryPrefix: true,
        });
        console.log(query);
        const mapName = query.mapName;
        const mode = query.mode;

        return <div className="mapClass">
            {mapName === "" ? (<div>invalid map name</div>) :
                <div className="infoContainer">
                    <table className="table info">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                {this.isTrio(mode) ?
                                    <th>Win Rate <FontAwesomeIcon icon={faSortDown} /></th>
                                    :
                                    <th>Avg Rank <FontAwesomeIcon icon={faSortDown} /></th>
                                }
                                <th>Pick Rate <FontAwesomeIcon icon={faSort} /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.recordArr.map((ele, index) => {
                                return (
                                    <tr key={ele.brawlerName}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {/* <div className="info" key={index}> */}
                                            <div className="brawler">
                                                <img src={`./images/${ele.brawlerName}.png`}></img>
                                                <div className="brawlerName">
                                                    {ele.brawlerName}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {ele.winRate === undefined ?
                                                <div className="averageRank">
                                                    {Math.round(ele.averageRank * 100) / 100}
                                                </div>
                                                :
                                                <div className="winRate">
                                                    {Math.round(ele.winRate * 1000) / 10}%
                                                </div>
                                            }

                                        </td>
                                        <td>
                                            <div className="totalGame">
                                                {Math.round(ele.totalGameNum / this.state.sumTotalGameNum * 10000) / 100}%
                                        </div>
                                        </td>
                                        {/* </div> */}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    }
}

export default Map;
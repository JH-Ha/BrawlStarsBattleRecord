import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import styles from "./Map.scss";

class Map extends Component {
    state = {
        mapName: "",
        recordArr: [],
        sumTotalGameNum: 0,
    }
    componentDidMount() {
        const query = qs.parse(this.props.location.search, {
            ignoreQueryPrefix: true,
        });
        console.log(query);
        const mapName = query.mapName;
        console.log(mapName);
        let records = {};
        let recordArr = [];
        axios.get(`http://brawlstat.xyz:8080/record/map/${mapName}`)
            //axios.get(`http://localhost/record/${tag}`)
            .then(response => {
                console.log(response);
                const data = response.data;
                console.log(data);
                data.forEach(e => {
                    // brawlerName: "COLETTE"
                    // cnt: 14
                    // result: "defeat"
                    // __proto__: Object
                    if (records[e.brawlerName] === undefined) {
                        records[e.brawlerName] = {
                        };
                    }
                    records[e.brawlerName] = {
                        ...records[e.brawlerName],
                        [e.result]: e.cnt
                    }
                });
                console.log(records);
                let sumTotalGameNum = 0;
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
        let { mapName } = this.props;
        return <div className="mapClass">
            {mapName === "" ? (<div>invalid map name</div>) :
                <div className="infoContainer">
                    <table className="table info">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Win Rate</th>
                                <th>Pick Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.recordArr.map((ele, index) => {
                                return (
                                    <tr>
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
                                            <div className="winRate">
                                                {Math.round(ele.winRate * 1000) / 10}%
                                        </div>
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
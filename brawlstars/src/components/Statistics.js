import React, { Component } from "react";
import { getData } from "./ApiHandler";
import ModeList from './ModeList';
import { isTrio } from './BaseFunctions';
import RecordResult from "./RecordResult";
import style from "./Statistics.scss";

class Statistics extends Component {
    state = {
        tag: '',
        mode: 'gemGrab',
        recordArr: [],
        sumTotalGameNum: 0,
    }
    getRecordResult(searchParams) {
        let records = {};
        let recordArr = [];
        const mode = searchParams.get("mode");
        getData(`/record/result?${searchParams}`)
            .then(response => {
                console.log(response);
                const data = response.data;
                console.log(data);
                data.forEach(e => {
                    // brawlerName: "COLETTE"
                    // cnt: 14
                    // result: "defeat"
                    // __proto__: Object
                    if (isTrio(mode)) {
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
                if (mode === 'ALL') {
                    for (let key in records) {
                        const { brawlerName, cnt } = records[key];
                        recordArr.push({
                            "brawlerName": brawlerName,
                            "totalGameNum": cnt,
                        });
                        sumTotalGameNum += cnt;
                    }
                    recordArr.sort((a, b) => {
                        return b.totalGameNum - a.totalGameNum;
                    });

                }
                else if (isTrio(mode)) {
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
    componentDidMount() {
        let searchParams = new URLSearchParams(this.props.location.search);
        let tag = searchParams.get("tag");
        const mode = searchParams.get("mode") || this.state.mode;
        searchParams.set("mode", mode);
        //console.log(`tag : ${tag}`);

        this.setState({
            tag: tag,
        });

        this.getRecordResult(searchParams);
    }
    changeMode = (mode) => {
        console.log(`changeMode`);
        this.setState({
            mode: mode,
        });
        let searchParams = new URLSearchParams(this.props.location.search);
        searchParams.set("mode", mode);
        this.getRecordResult(searchParams);
    }

    render() {

        return <div>
            <div className="statistics">
                <div className="modeListContainer">
                    <ModeList key={this.state.mode} mode={this.state.mode} changeMode={this.changeMode} />
                </div>
                <RecordResult key={this.state.recordArr} recordArr={this.state.recordArr} sumTotalGameNum={this.state.sumTotalGameNum} mode={this.state.mode}
                    isPersonal={true} />
            </div>
        </div>
    }
}

export default Statistics;
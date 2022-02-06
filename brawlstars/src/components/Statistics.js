import React, { Component } from "react";
import { getData } from "./ApiHandler";
import ModeList from './ModeList';
import { isTrio } from './BaseFunctions';
import RecordResult from "./RecordResult";
import "./Statistics.scss";
import AdSense from 'react-adsense';
import Loading from "./Loading";

class Statistics extends Component {
    state = {
        tag: '',
        mode: 'gemGrab',
        recordArr: [],
        sumTotalGameNum: 0,
        loading: false,
        changed: 0,
    }
    getRecordResult(searchParams) {
        let records = {};
        let recordArr = [];
        const mode = searchParams.get("mode");
        this.setState({
            loading: true,
        })
        getData(`/record/result?${searchParams}`)
            .then(response => {
                this.setState({
                    loading: false,
                });
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
                            averageRank: e.rankSum / e.cnt,
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
                    sumTotalGameNum: sumTotalGameNum,
                    changed: this.state.changed + 1,
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
            {this.state.loading ?
                <Loading></Loading>
                : ""}
            <div className="statistics">
                <div className="modeListContainer">
                    <ModeList key={this.state.mode} mode={this.state.mode} changeMode={this.changeMode} />
                </div>
                <RecordResult key={this.state.changed} recordArr={this.state.recordArr} sumTotalGameNum={this.state.sumTotalGameNum} mode={this.state.mode}
                    isPersonal={true} />
            </div>
            {/* <AdSense.Google
                style={{ display: 'block' }}
                client='ca-pub-4114406385852589'
                slot='4607116156'
                format='auto'
                responsive='true'
            /> */}
        </div>
    }
}

export default Statistics;
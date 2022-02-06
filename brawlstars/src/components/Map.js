import React, { Component } from 'react';
import qs from 'qs';
import "./Map.scss";
import { getData } from './ApiHandler';
import RecordResult from './RecordResult';
import { isTrio } from './BaseFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { withTranslation } from 'react-i18next';
import AdSense from 'react-adsense';
import Loading from './Loading';
import { ReactTitle } from 'react-meta-tags';

class Map extends Component {
    state = {
        mapName: "",
        mode: "",
        recordArr: [],
        sumTotalGameNum: 0,
        trophyRange: '',
        isMapShown: false,
        loading: false,
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
    changeTrophyRange = (e) => {
        //console.log(e.target.value);
        this.setState({
            trophyRange: e.target.value,
        });
        const { history } = this.props;
        let searchParams = new URLSearchParams(this.props.location.search);
        searchParams.set("trophyRange", e.target.value);
        this.getRecordResult(unescape(searchParams.get("mapName")), searchParams.get("mode"), searchParams.get("trophyRange"));
        history.push(`/map?${searchParams.toString()}`);

    }

    getRecordResult = (mapName, mode, trophyRange) => {
        let records = {};
        let recordArr = [];
        let searchParams = new URLSearchParams();
        searchParams.set("mode", mode);
        searchParams.set("trophyRange", trophyRange);
        searchParams.set("map", mapName);

        this.setState({
            loading: true,
        })
        getData(`/api/statistics/mode/${mode}/map/${mapName}`)
            // getData(`/record/result?${searchParams}`)
            .then(response => {
                console.log(response);
                const data = response.data;
                //console.log(data);
                this.setState({
                    loading: false,
                })
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
                if (isTrio(mode)) {
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
    showMapImg = () => {
        this.setState({
            isMapShown: !this.state.isMapShown,
        });
    }
    componentDidMount() {
        const query = qs.parse(this.props.location.search, {
            ignoreQueryPrefix: true,
        });
        const params = this.props.match.params
        const mapName = unescape(params.map);
        const mode = params.mode;
        const trophyRange = query.trophyRange || this.state.trophyRange;
        console.log(mapName);
        this.setState({
            trophyRange: trophyRange,
            mapName: mapName,
            mode: mode,
        });
        this.getRecordResult(mapName, mode, trophyRange);
    }
    render() {
        const { t } = this.props;

        return <><div className="mapClass">
            <ReactTitle title={`${t(this.state.mapName)} ${t("Win Rate")} ${t("Statistics")}`} />
            {this.state.loading ?
                <Loading></Loading> :
                ""
            }
            <h3>{t("Win Rate")} {t("Statistics")}</h3>
            <div className={`mapNameContainer`} onClick={this.showMapImg}>
                <span className="mapName">{t(this.state.mapName)}</span>
                {this.state.isMapShown ?
                    <FontAwesomeIcon icon={faChevronUp} />
                    : <FontAwesomeIcon icon={faChevronDown} />
                }
            </div>
            <div className={`mapImgContainer 
            ${this.state.mode.includes("Showdown") ? 'showdown' : ''}
            ${this.state.isMapShown ? '' : 'none'}`}>
                <img className="mapImg" src={`/images/maps/${this.state.mode.includes("Showdown") ? 'showdown' : this.state.mode}/${this.state.mapName}.png`} alt={this.state.mapName} />
            </div>
            {/* <div className="trophySelect">
                <label htmlFor="trophyRange">Trophies</label>
                <select id="trophyRange" value={this.state.trophyRange} onChange={this.changeTrophyRange}>
                    <option value="ALL" label="ALL"></option>
                    <option value="highRank" label="500~"></option>
                    <option value="lowRank" label="0~500"></option>
                </select>
            </div> */}
            {this.state.mapName === "" ? (<div>invalid map name</div>) :
                <RecordResult key={this.state.recordArr} recordArr={this.state.recordArr} sumTotalGameNum={this.state.sumTotalGameNum} mode={this.state.mode} />
            }
        </div>
            {/* <AdSense.Google
                style={{ display: 'block' }}
                client='ca-pub-4114406385852589'
                slot='4607116156'
                format='auto'
                responsive='true'
            /> */}
        </>
    }
}

export default withTranslation()(Map);
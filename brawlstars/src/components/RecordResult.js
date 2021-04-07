import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons'
import { isTrio, isDuo, isSolo, isAll } from './BaseFunctions';
import SortIcon from './SortIcon';
import style from "./RecordResult.scss";

const DEFAULT = "DEFAULT";
const ASC = "ASC";
const DESC = "DESC";

class RecordResult extends Component {
    state = {
        recordArr: [],
        sumTotalGameNum: 0,
        winRateOrder: 'DESC',
        avgRankOrder: ASC,
        pickRateOrder: 'DEFAULT',
    }
    componentDidMount() {
        const { recordArr, sumTotalGameNum } = this.props;
        this.setState({
            recordArr: recordArr,
            sumTotalGameNum: sumTotalGameNum,
        })
    }
    toggleWinRate = () => {

        let recordArr = [];
        let nextWinRateOrder = 'DEFAULT';
        if (this.state.winRateOrder === DESC) {
            nextWinRateOrder = ASC;
            recordArr = this.state.recordArr.sort((a, b) => {
                return a.winRate - b.winRate;
            });

        } else {
            nextWinRateOrder = DESC;
            recordArr = this.state.recordArr.sort((a, b) => {
                return b.winRate - a.winRate;
            });
        }
        this.setState({
            recordArr: recordArr,
            winRateOrder: nextWinRateOrder,
            pickRateOrder: DEFAULT,
            avgRankOrder: DEFAULT,
        })
    }
    togglePickRate = () => {

        let recordArr = [];
        let nextPickRateOrder = DEFAULT;
        if (this.state.pickRateOrder === DESC) {
            nextPickRateOrder = ASC;
            recordArr = this.state.recordArr.sort((a, b) => {
                return a.totalGameNum - b.totalGameNum;
            });
        } else {
            nextPickRateOrder = DESC;
            recordArr = this.state.recordArr.sort((a, b) => {
                return b.totalGameNum - a.totalGameNum;
            });
        }
        this.setState({
            recordArr: recordArr,
            winRateOrder: DEFAULT,
            pickRateOrder: nextPickRateOrder,
            avgRankOrder: DEFAULT,
        })
    }
    toggleAvgRank = () => {
        let recordArr = [];
        let nextAvgRankOrder = DEFAULT;
        if (this.state.avgRankOrder === DESC || this.state.avgRankOrder === DEFAULT) {
            nextAvgRankOrder = ASC;
            recordArr = this.state.recordArr.sort((a, b) => {
                return a.averageRank - b.averageRank;
            });

        } else {
            nextAvgRankOrder = DESC;
            recordArr = this.state.recordArr.sort((a, b) => {
                return b.averageRank - a.averageRank;
            });
        }
        this.setState({
            recordArr: recordArr,
            winRateOrder: DEFAULT,
            pickRateOrder: DEFAULT,
            avgRankOrder: nextAvgRankOrder,
        })
    }
    render() {
        const { mode, isPersonal } = this.props;

        return <div className="recordResult">
            <div className="infoContainer">
                <table className="table info">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            {isTrio(mode) ?
                                <th onClick={this.toggleWinRate} className="rateHeader"><span className="rateHeaderContent">Win Rate</span>
                                    <SortIcon order={this.state.winRateOrder} key={`winRate-${this.state.winRateOrder}`} />
                                </th>
                                :
                                isDuo(mode) || isSolo(mode) ?
                                    <th onClick={this.toggleAvgRank} className="rateHeader"><span className="rateHeaderContent">Avg Rank</span><SortIcon order={this.state.avgRankOrder} key={`avgRank-${this.state.avgRankOrder}`} /> </th>
                                    : <th># of Games</th>
                            }
                            <th onClick={this.togglePickRate} className="rateHeader"><span className="rateHeaderContent">Pick Rate </span><SortIcon order={this.state.pickRateOrder} key={`pickRate-${this.state.pickRateOrder}`} /></th>
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
                                            <img src={`/images/${ele.brawlerName}.png`}></img>
                                            <div className="brawlerName">
                                                {ele.brawlerName}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {(isDuo(mode) || isSolo(mode)) ?
                                            <div className="averageRank">
                                                {Math.round(ele.averageRank * 100) / 100}
                                            </div>
                                            : isTrio(mode) ?

                                                <div className="winRate">
                                                    {Math.round(ele.winRate * 1000) / 10}%

                                                </div>
                                                : <div className="numberOfGames">
                                                    {ele.totalGameNum}
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

                    {isPersonal ?
                        <tfoot>
                            {isAll(mode) ?
                                <tr>
                                    <td colSpan="2">Total # of Games</td>
                                    <td colSpan="2">{this.state.sumTotalGameNum} games</td>
                                </tr>
                                : isTrio(mode) ?
                                    <tr>
                                        <td colSpan="2">Avg Win Rate</td>
                                        <td>{Math.round(this.state.recordArr.map(e => e.victory).reduce((a, b) => a + b, 0) / this.state.sumTotalGameNum * 1000) / 10}%</td>
                                        <td>{this.state.sumTotalGameNum} games</td>
                                    </tr>
                                    : (isSolo(mode) || isDuo(mode)) ?
                                        <tr>
                                            <td colSpan="2">Avg Rank</td>
                                            <td>{Math.round(this.state.recordArr.map(e => e.averageRank * e.totalGameNum).reduce((a, b) => a + b, 0) / this.state.sumTotalGameNum * 10) / 10}</td>
                                            <td>{this.state.sumTotalGameNum} games</td>
                                        </tr>
                                        : ""

                            }
                        </tfoot>
                        : <tfoot>
                            <tr>
                                <td colSpan="2">Total # of Games</td>
                                <td colSpan="2">{this.state.sumTotalGameNum} games</td>
                            </tr>
                        </tfoot>
                    }
                </table>
            </div>
        </div>
    }
}
export default RecordResult;
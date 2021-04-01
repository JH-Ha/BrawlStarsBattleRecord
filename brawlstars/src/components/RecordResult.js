import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons'
import { isTrio, isDuo, isSolo, isAll } from './BaseFunctions';
import style from "./RecordResult.scss";

class RecordResult extends Component {
    state = {
        recordArr: [],
        sumTotalGameNum: 0,
    }
    componentDidMount() {
        const { recordArr, sumTotalGameNum } = this.props;
        this.setState({
            recordArr: recordArr,
            sumTotalGameNum: sumTotalGameNum,
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
                                <th>Win Rate <FontAwesomeIcon icon={faSortDown} /></th>
                                :
                                isDuo(mode) || isSolo(mode) ?
                                    <th>Avg Rank <FontAwesomeIcon icon={faSortDown} /></th>
                                    : <th># of Games</th>
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
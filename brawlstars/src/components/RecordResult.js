import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons'
import { isTrio } from './BaseFunctions';

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
        const { mode } = this.props;

        return <div className="infoContainer">
            <table className="table info">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        {isTrio(mode) ?
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
}
export default RecordResult;
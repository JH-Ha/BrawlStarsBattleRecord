import React, { Component, useState } from 'react'
import { isTrio, isDuo, isSolo, isAll } from './BaseFunctions';
import SortIcon from './sortIcon';
import styles from "../styles/RecordResult.module.scss";
import { useTranslation } from 'next-i18next';

const DEFAULT = "DEFAULT";
const ASC = "ASC";
const DESC = "DESC";

const RecordResult = ({ _recordArr, sumTotalGameNum, mode, isPersonal }) => {
    const [recordArr, setRecordArr] = useState(_recordArr);
    const [winRateOrder, setWinRateOrder] = useState(DESC);
    const [avgRankOrder, setAvgRankOrder] = useState(ASC);
    const [pickRateOrder, setPickRateOrder] = useState(DESC);

    const toggleWinRate = () => {

        let recordArr = [];
        let nextWinRateOrder = 'DEFAULT';
        if (winRateOrder === DESC) {
            nextWinRateOrder = ASC;
            recordArr = recordArr.sort((a, b) => {
                return a.winRate - b.winRate;
            });

        } else {
            nextWinRateOrder = DESC;
            recordArr = recordArr.sort((a, b) => {
                return b.winRate - a.winRate;
            });
        }
        setRecordArr(recordArr);
        setWinRateOrder(nextWinRateOrder);
        setPickRateOrder(DEFAULT);
        setAvgRankOrder(DEFAULT);
    }
    const togglePickRate = () => {

        let recordArr = [];
        let nextPickRateOrder = DEFAULT;
        if (pickRateOrder === DESC) {
            nextPickRateOrder = ASC;
            recordArr = recordArr.sort((a, b) => {
                return a.totalGameNum - b.totalGameNum;
            });
        } else {
            nextPickRateOrder = DESC;
            recordArr = recordArr.sort((a, b) => {
                return b.totalGameNum - a.totalGameNum;
            });
        }
        setRecordArr(recordArr);
        setWinRateOrder(DEFAULT);
        setPickRateOrder(nextWinRateOrder);
        setAvgRankOrder(DEFAULT);
    }
    const toggleAvgRank = () => {
        let recordArr = [];
        let nextAvgRankOrder = DEFAULT;
        if (avgRankOrder === DESC || avgRankOrder === DEFAULT) {
            nextAvgRankOrder = ASC;
            recordArr = recordArr.sort((a, b) => {
                return a.averageRank - b.averageRank;
            });

        } else {
            nextAvgRankOrder = DESC;
            recordArr = recordArr.sort((a, b) => {
                return b.averageRank - a.averageRank;
            });
        }
        setRecordArr(recordArr);
        setWinRateOrder(DEFAULT);
        setPickRateOrder(DEFAULT);
        setAvgRankOrder(nextAvgRankOrder);
    }
    const { t } = useTranslation();

    return <div className={styles.recordResult}>
        <div className={styles.infoContainer}>
            <table className={`table ${styles.info}`}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        {isTrio(mode) ?
                            <th onClick={toggleWinRate} className={styles.rateHeader}><span className={styles.rateHeaderContent}>{t("Win Rate")}</span>
                                <SortIcon order={winRateOrder} key={`winRate-${winRateOrder}`} />
                            </th>
                            :
                            isDuo(mode) || isSolo(mode) ?
                                <th onClick={toggleAvgRank} className={styles.rateHeader}><span className={styles.rateHeaderContent}>{t("Avg Rank")}</span><SortIcon order={avgRankOrder} key={`avgRank-${avgRankOrder}`} /> </th>
                                : <th># of Games</th>
                        }
                        <th onClick={togglePickRate} className={styles.rateHeader}><span className={styles.rateHeaderContent}>{t("Pick Rate")}</span><SortIcon order={pickRateOrder} key={`pickRate-${pickRateOrder}`} /></th>
                    </tr>
                </thead>
                <tbody>
                    {recordArr.map((ele, index) => {
                        return (
                            <tr key={ele.brawlerName}>
                                <td>{index + 1}</td>
                                <td>
                                    {/* <div className="info" key={index}> */}
                                    <div className={styles.brawler}>
                                        <img src={`/images/${ele.brawlerName}.png`} alt={ele.brawlerName}></img>
                                        <div className={styles.brawlerName}>
                                            {t(ele.brawlerName)}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {(isDuo(mode) || isSolo(mode)) ?
                                        <div className={styles.averageRank}>
                                            {Math.round(ele.averageRank * 100) / 100}
                                        </div>
                                        : isTrio(mode) ?
                                            <div className={styles.winRate}>
                                                {Math.round(ele.winRate * 1000) / 10}%

                                            </div>
                                            : <div className={styles.numberOfGames}>
                                                {ele.totalGameNum}
                                            </div>
                                    }
                                </td>

                                <td>
                                    <div className={styles.totalGame}>
                                        {Math.round(ele.totalGameNum / sumTotalGameNum * 10000) / 100}%
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
                                <td colSpan="2">{sumTotalGameNum} games</td>
                            </tr>
                            : isTrio(mode) ?
                                <tr>
                                    <td colSpan="2">Avg Win Rate</td>
                                    <td>{Math.round(recordArr.map(e => e.victory).reduce((a, b) => a + b, 0) / sumTotalGameNum * 1000) / 10}%</td>
                                    <td>{sumTotalGameNum} games</td>
                                </tr>
                                : (isSolo(mode) || isDuo(mode)) ?
                                    <tr>
                                        <td colSpan="2">Avg Rank</td>
                                        <td>{Math.round(recordArr.map(e => e.averageRank * e.totalGameNum).reduce((a, b) => a + b, 0) / sumTotalGameNum * 10) / 10}</td>
                                        <td>{sumTotalGameNum} games</td>
                                    </tr>
                                    : ""

                        }
                    </tfoot>
                    : <tfoot>
                        <tr>
                            <td colSpan="2">Total # of Games</td>
                            <td colSpan="2">{sumTotalGameNum} games</td>
                        </tr>
                    </tfoot>
                }
            </table>
        </div>
    </div>
}

export default RecordResult;
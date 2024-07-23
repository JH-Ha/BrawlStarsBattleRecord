import React, { Component, useState } from 'react'
import { isTrio, isDuo, isSolo, isAll, isDuels, isPenta } from './BaseFunctions';
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
    const [pickRateOrder, setPickRateOrder] = useState(DEFAULT);

    const toggleWinRate = () => {

        let nextWinRateOrder;
        if (winRateOrder === DESC) {
            nextWinRateOrder = ASC;
            recordArr.sort((a, b) => {
                return a.winRate - b.winRate;
            });

        } else {
            nextWinRateOrder = DESC;
            recordArr.sort((a, b) => {
                return b.winRate - a.winRate;
            });
        }
        setWinRateOrder(nextWinRateOrder);
        setPickRateOrder(DEFAULT);
        setAvgRankOrder(DEFAULT);
    }
    const togglePickRate = () => {

        let nextPickRateOrder;
        if (pickRateOrder === DESC) {
            nextPickRateOrder = ASC;
            recordArr.sort((a, b) => {
                return a.totalGameNum - b.totalGameNum;
            });
        } else {
            nextPickRateOrder = DESC;
            recordArr.sort((a, b) => {
                return b.totalGameNum - a.totalGameNum;
            });
        }
        setWinRateOrder(DEFAULT);
        setPickRateOrder(nextPickRateOrder);
        setAvgRankOrder(DEFAULT);
    }
    const toggleAvgRank = () => {
        let nextAvgRankOrder;
        if (avgRankOrder === DESC || avgRankOrder === DEFAULT) {
            nextAvgRankOrder = ASC;
            recordArr.sort((a, b) => {
                return a.averageRank - b.averageRank;
            });

        } else {
            nextAvgRankOrder = DESC;
            recordArr.sort((a, b) => {
                return b.averageRank - a.averageRank;
            });
        }

        setWinRateOrder(DEFAULT);
        setPickRateOrder(DEFAULT);
        setAvgRankOrder(nextAvgRankOrder);
    }
    const { t } = useTranslation();

    return <div className={styles.recordResult}>
        <div className={styles.infoContainer}>
            <table className={`default-table ${styles.info}`}>
                <thead>
                    <tr>
                        <th>{t("No")}</th>
                        <th>{t("Brawler Name")}</th>
                        {isTrio(mode) || isDuels(mode) || isPenta(mode) ?
                            <th onClick={toggleWinRate} className={styles.rateHeader}>
                                <span className={styles.rateHeaderContent}>
                                    <div>{t("Win Rate")}</div>
                                    <SortIcon order={winRateOrder} key={`winRate-${winRateOrder}`} />
                                </span>
                            </th>
                            :
                            isDuo(mode) || isSolo(mode) ?
                                <th onClick={toggleAvgRank} className={styles.rateHeader}>
                                    <span className={styles.rateHeaderContent}>
                                        <div>{t("Avg Rank")}</div>
                                        <SortIcon order={avgRankOrder} key={`avgRank-${avgRankOrder}`} />
                                    </span>
                                </th>
                                : <th># of Games</th>
                        }
                        <th onClick={togglePickRate} className={styles.rateHeader}>
                            <span className={styles.rateHeaderContent}>
                                <div>{t("Pick Rate")}</div>
                                <SortIcon order={pickRateOrder} key={`pickRate-${pickRateOrder}`} />
                            </span>
                        </th>
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
                                        : isTrio(mode) || isDuels(mode) || isPenta(mode) ?
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
                            : isTrio(mode) || isDuels(mode) || isPenta(mode) ?
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
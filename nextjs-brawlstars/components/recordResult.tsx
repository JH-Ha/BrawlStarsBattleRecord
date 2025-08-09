import React, { useState } from 'react'
import { isTrio, isDuo, isSolo, isAll, isDuels, isPenta, isTeamMode } from './BaseFunctions';
import SortIcon, { SortOrder } from './sortIcon';
import styles from "../styles/RecordResult.module.scss";
import { useTranslation } from 'react-i18next';

const DEFAULT = "DEFAULT";
const ASC = "ASC";
const DESC = "DESC";

interface TeamModeRecord {
    brawlerName: string;
    victory: number;
    defeat: number;
    draw: number;
    winRate: number;
    totalGameNum: number;
}

interface SoloModeRecord {
    brawlerName: string;
    averageRank: number;
    totalGameNum: number;
}

type RecordItem = TeamModeRecord | SoloModeRecord;

interface RecordResultProps {
    _recordArr: RecordItem[];
    sumTotalGameNum: number;
    mode: string;
    isPersonal: boolean;
}

const RecordResult: React.FC<RecordResultProps> = ({ _recordArr, sumTotalGameNum, mode, isPersonal }) => {
    const [recordArr, setRecordArr] = useState<RecordItem[]>(_recordArr);
    const [winRateOrder, setWinRateOrder] = useState<SortOrder>(DESC);
    const [avgRankOrder, setAvgRankOrder] = useState<SortOrder>(ASC);
    const [pickRateOrder, setPickRateOrder] = useState<SortOrder>(DEFAULT);

    const toggleWinRate = () => {
        let nextWinRateOrder: SortOrder;
        if (winRateOrder === DESC) {
            nextWinRateOrder = ASC;
            recordArr.sort((a, b) => {
                return (a as TeamModeRecord).winRate - (b as TeamModeRecord).winRate;
            });
        } else {
            nextWinRateOrder = DESC;
            recordArr.sort((a, b) => {
                return (b as TeamModeRecord).winRate - (a as TeamModeRecord).winRate;
            });
        }
        setWinRateOrder(nextWinRateOrder);
        setPickRateOrder(DEFAULT);
        setAvgRankOrder(DEFAULT);
    }

    const togglePickRate = () => {
        let nextPickRateOrder: SortOrder;
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
        let nextAvgRankOrder: SortOrder;
        if (avgRankOrder === DESC || avgRankOrder === DEFAULT) {
            nextAvgRankOrder = ASC;
            recordArr.sort((a, b) => {
                return (a as SoloModeRecord).averageRank - (b as SoloModeRecord).averageRank;
            });
        } else {
            nextAvgRankOrder = DESC;
            recordArr.sort((a, b) => {
                return (b as SoloModeRecord).averageRank - (a as SoloModeRecord).averageRank;
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
                        <th>{String(t("No"))}</th>
                        <th>{String(t("Brawler Name"))}</th>
                        {isTeamMode(mode) ?
                            <th onClick={toggleWinRate} className={styles.rateHeader}>
                                <span className={styles.rateHeaderContent}>
                                    <div>{String(t("Win Rate"))}</div>
                                    <SortIcon order={winRateOrder} key={`winRate-${winRateOrder}`} />
                                </span>
                            </th>
                            :
                            isDuo(mode) || isSolo(mode) ?
                                <th onClick={toggleAvgRank} className={styles.rateHeader}>
                                    <span className={styles.rateHeaderContent}>
                                        <div>{String(t("Avg Rank"))}</div>
                                        <SortIcon order={avgRankOrder} key={`avgRank-${avgRankOrder}`} />
                                    </span>
                                </th>
                                : <th># of Games</th>
                        }
                        <th onClick={togglePickRate} className={styles.rateHeader}>
                            <span className={styles.rateHeaderContent}>
                                <div>{String(t("Pick Rate"))}</div>
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
                                    <div className={styles.brawler}>
                                        <img src={`/images/${ele.brawlerName}.webp`} alt={ele.brawlerName}></img>
                                        <div className={styles.brawlerName}>
                                            {String(t(ele.brawlerName))}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {(isDuo(mode) || isSolo(mode)) ?
                                        <div className={styles.averageRank}>
                                            {Math.round((ele as SoloModeRecord).averageRank * 100) / 100}
                                        </div>
                                        : isTeamMode(mode) ?
                                            <div className={styles.winRate}>
                                                {Math.round((ele as TeamModeRecord).winRate * 1000) / 10}%
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
                            </tr>
                        )
                    })}
                </tbody>

                {isPersonal ?
                    <tfoot>
                        {isAll(mode) ?
                            <tr>
                                <td colSpan={2}>Total # of Games</td>
                                <td colSpan={2}>{sumTotalGameNum} games</td>
                            </tr>
                            : isTeamMode(mode) ?
                                <tr>
                                    <td colSpan={2}>Avg Win Rate</td>
                                    <td>{Math.round((recordArr as TeamModeRecord[]).map(e => e.victory).reduce((a, b) => a + b, 0) / sumTotalGameNum * 1000) / 10}%</td>
                                    <td>{sumTotalGameNum} games</td>
                                </tr>
                                : (isSolo(mode) || isDuo(mode)) ?
                                    <tr>
                                        <td colSpan={2}>Avg Rank</td>
                                        <td>{Math.round((recordArr as SoloModeRecord[]).map(e => e.averageRank * e.totalGameNum).reduce((a, b) => a + b, 0) / sumTotalGameNum * 10) / 10}</td>
                                        <td>{sumTotalGameNum} games</td>
                                    </tr>
                                    : null
                        }
                    </tfoot>
                    : <tfoot>
                        <tr>
                            <td colSpan={2}>Total # of Games</td>
                            <td colSpan={2}>{sumTotalGameNum} games</td>
                        </tr>
                    </tfoot>
                }
            </table>
        </div>
    </div>
}

export default RecordResult;
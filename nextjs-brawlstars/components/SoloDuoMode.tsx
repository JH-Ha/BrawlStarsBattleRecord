import React from "react";
import styles from "../styles/SoloDuoMode.module.scss";
import { calDisplayTime } from './BaseFunctions';
import PlayerTile from './PlayerTile';
import { useTranslation } from 'react-i18next';

interface GroupRecord {
    tag: string;
    battleTime: string;
    resultRank: number;
    brawlerName: string;
    playerName: string;
    trophies: number;
    power: number;
}

interface SoloDuoModeProps {
    trophyChange: number;
    rank: number;
    groupRecords: GroupRecord[];
    tag: string;
    map: string;
    mode: string;
    type: string;
}

const SoloDuoMode: React.FC<SoloDuoModeProps> = ({ trophyChange, rank, groupRecords, tag, map, mode, type }) => {
    const { t } = useTranslation();

    let rankCss = 0;

    if (mode === "soloShowdown") {
        rankCss = Math.floor((rank + 1) / 2);
    } else {
        rankCss = rank;
    }

    let trophyChangeDisplay: string | number = trophyChange;
    if (trophyChange > 0) {
        trophyChangeDisplay = '+' + trophyChange;
    }

    let battleTime = "";
    let currentRank = rank;
    groupRecords.forEach(e => {
        if (e.tag === tag) {
            battleTime = e.battleTime;
            currentRank = e.resultRank;
        }
    })
    
    let displayGroup: GroupRecord[][] = [];
    for (let i = 0; i < 5; i++) {
        displayGroup.push([]);
    }
    
    // rank 로 정렬
    groupRecords.sort((a, b) => {
        return a.resultRank - b.resultRank;
    })
    
    for (let i = 0; i < groupRecords.length; i++) {
        const groupIdx = Math.floor(i / 2);
        displayGroup[groupIdx].push(groupRecords[i]);
    }

    return (
        <div className={`${styles.center}`}>
            <div className={`${styles.SoloDuoModeContainer} ${styles['rank' + rankCss]}`}>
                <div className={`${styles.gameInfoContainer} ${styles['rank' + rankCss]}`}>
                    <div className={styles.left}></div>
                    <div className={styles.type}>
                        {String(t(type))}
                    </div>
                    <div className={styles.battleTime}>{calDisplayTime(battleTime, t)}</div>
                </div>
                <div className={`${styles.topContainer} ${styles['rank' + rankCss]}`}>
                    <div className={styles.modeInfo}>
                        <div className={styles.showdonwImgContainer}>
                            <img src={`/images/mode/${mode}.webp`} alt={mode}></img>
                        </div>
                        <div className={styles.modeMapContainer}>
                            <div className={styles.mode}>{String(t(mode))}
                            </div>
                            <div className={styles.map}>{String(t(map))}</div>
                        </div>
                    </div>
                    <div className={`${styles.rank} ${styles['rank' + rankCss + 'Content']}`}>
                        Rank {currentRank}
                    </div>
                    <div className={styles.trophyChange}>{trophyChangeDisplay}</div>
                </div>
                <div className={`${styles.gameInfoContainer} ${styles['rank' + rankCss]}`}>
                    <div className={styles.playerContainer}>
                        {displayGroup.map((g, index) => {
                            return <div key={`group-${index}`}>
                                {g.map(player => {
                                    return <PlayerTile key={`${player.tag}-${player.brawlerName}${player.trophies}`}
                                        brawlerName={player.brawlerName}
                                        playerName={player.playerName}
                                        trophies={player.trophies}
                                        power={player.power} />
                                })}
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SoloDuoMode;
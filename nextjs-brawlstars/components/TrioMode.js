import React, { Component } from "react";
import styles from "../styles/TrioMode.module.scss";
import PlayerTile from "./PlayerTile";
import { calDisplayTime } from './BaseFunctions';
import { useTranslation } from 'next-i18next';
const TrioMode = ({ battleTime,
  duration,
  map,
  trophyChange,
  result,
  type,
  mode,
  groupRecords }) => {

  const { t } = useTranslation();

  return (
    <div className={styles.center}>
      <div className={`${styles.trioContainer} ${styles[result]}`}>
        <div className={`${styles.typeInfo} ${styles.info} ${styles[result]}`}>
          <div className={styles.duration}>
            {duration} seconds
          </div>
          <div className={styles.gameType}>
            {t(type) || "game"}
          </div>
          <div className={styles.battleTime}>{calDisplayTime(battleTime)}</div>
        </div>
        <div className={`${styles.gameInfo} ${styles.top} ${styles[result]}`}>
          <div className={styles.modeInfo}>
            <div className={styles.modeImg}>
              <img src={`/images/mode/${mode}.png`} alt={mode}></img>
            </div>
            <div className={styles.modeMap}>
              <div className={styles.mode}>{t(mode)}
              </div>
              <div className={styles.map}>
                {t(map)}
              </div>
            </div>
          </div>
          <div className={styles.gameResult}>
            {t(result)}
          </div>
          <div className={styles.trophyChange}>
            {trophyChange}
          </div>
        </div>
        <div className={`${styles.playerInfo} ${styles.info} ${styles[result]}`}>
          <div className={`${styles.trioPlayerContainer}`}>
            {groupRecords.map((record, index) => {
              if (record.teamId === 0)
                return <PlayerTile key={index}
                  brawlerName={record.brawlerName}
                  playerName={record.playerName}
                  trophies={record.trophies}
                  power={record.power}
                ></PlayerTile>
              else {
                return <div></div>;
              };
            })}
          </div>
          <div className={styles.durationContainer}>
            <div>vs</div>
          </div>
          <div className={styles.trioPlayerContainer}>
            {groupRecords.map((record, index) => {
              if (record.teamId === 1)
                return <PlayerTile key={index}
                  brawlerName={record.brawlerName}
                  playerName={record.playerName}
                  trophies={record.trophies}
                  power={record.power}
                ></PlayerTile>
              else {
                return <div></div>
              }
            })}
          </div>
        </div>
      </div>
    </div >
  );
}

export default TrioMode;

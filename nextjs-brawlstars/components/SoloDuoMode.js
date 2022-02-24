import React, { Component } from "react";
import styles from "../styles/SoloDuoMode.module.scss";
import { calDisplayTime } from './BaseFunctions';
import PlayerTile from './PlayerTile';
import { withTranslation } from 'react-i18next';

class SoloDuoMode extends Component {
  state = {
    trophyChange: "",
    rankCss: "",
  };
  componentDidMount() {
    const { trophyChange, mode, rank } = this.props;
    let signTrophyChange = null;
    if (trophyChange > 0) {
      signTrophyChange = "+" + trophyChange;
    } else {
      signTrophyChange = trophyChange;
    }
    if (mode === "soloShowdown") {
      this.setState({
        rankCss: Math.floor((rank + 1) / 2),
      });
    } else {
      this.setState({
        rankCss: rank,
      });
    }

    this.setState({ trophyChange: signTrophyChange });
  }
  render() {
    // const {
    //   battleTime,
    //   rank,
    //   result,
    //   brawler_name,
    //   map,
    //   power,
    //   trophies,
    //   trophyChange,
    //   groupRecords,
    // } = this.props;
    const { groupRecords, tag, map, mode, type, t } = this.props;
    let battleTime = "";
    let rank = "";
    groupRecords.forEach(e => {
      if (e.tag === tag) {
        battleTime = e.battleTime;
        rank = e.resultRank;
      }
    })
    let displayGroup = [];
    for (let i = 0; i < 5; i++) {
      displayGroup.push([]);
    }
    //rank 로 정렬
    groupRecords.sort((a, b) => {
      return a.resultRank - b.resultRank;
    })
    for (let i = 0; i < groupRecords.length; i++) {
      const groupIdx = Math.floor(i / 2);
      displayGroup[groupIdx].push(groupRecords[i]);
    }

    return (
      <div className={`${styles.center}`}>
        <div className={`${styles.SoloDuoModeContainer} ${styles['rank' + this.state.rankCss]}`}>
          <div className={`${styles.gameInfoContainer} ${styles['rank' + this.state.rankCss]}`}>
            <div className={styles.left}></div>
            <div className={styles.type}>
              {t(type)}
            </div>
            <div className={styles.battleTime}>{calDisplayTime(battleTime)}</div>
          </div>
          <div className={`${styles.topContainer} ${styles['rank' + this.state.rankCss]}`}>
            <div className={styles.modeInfo}>
              <div className={styles.showdonwImgContainer}>
                <img src={`/images/mode/${mode}.png`} alt={mode}></img>
              </div>
              <div className={styles.modeMapContainer}>
                <div className={styles.mode}>{t(mode)}
                </div>
                <div className={styles.map}>{t(map)}</div>
              </div>
            </div>
            <div className={`${styles.rank} ${styles['rank' + this.state.rankCss + 'Content']}`}>
              Rank {rank}
            </div>

            <div className={styles.trophyChange}>{this.state.trophyChange}</div>
          </div>
          <div className={`${styles.gameInfoContainer} ${styles['rank' + this.state.rankCss]}`}>
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
}

export default withTranslation()(SoloDuoMode);

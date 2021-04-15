import React, { Component } from "react";
import styles from "./SoloDuoMode.scss";
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
    if (mode == "soloShowdown") {
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
    let brawlerName = "";
    let power = "";
    let trophies = "";
    let trophyChange = "";
    groupRecords.forEach(e => {
      if (e.tag === tag) {
        battleTime = e.battleTime;
        rank = e.resultRank;
        brawlerName = e.brawlerName;
        power = e.power;
        trophies = e.trophies;
        trophyChange = e.trophyChange;
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
      <div className="center">
        <div className={`SoloDuoModeContainer rank${this.state.rankCss}`}>
          <div className={`gameInfoContainer rank${this.state.rankCss}`}>
            <div className="left"></div>
            <div className={`type`}>
              {type}
            </div>
            <div className="battleTime">{calDisplayTime(battleTime)}</div>
          </div>
          <div className={`topContainer rank${this.state.rankCss}`}>
            <div className="modeInfo">
              <div className="showdonwImgContainer">
                <img src="/images/mode/showdown.png"></img>
              </div>
              <div className="modeMapContainer">
                <div className="mode">{t(mode)}
                </div>
                <div className="map">{t(map)}</div>
              </div>
            </div>
            <div className={`rank rank${this.state.rankCss}Content`}>
              Rank {rank}
            </div>

            <div className="trophyChange">{this.state.trophyChange}</div>
          </div>
          <div className={`gameInfoContainer rank${this.state.rankCss}`}>
            <div className={`playerContainer`}>
              {displayGroup.map(g => {
                return <div>
                  {g.map(player => {
                    return <PlayerTile brawlerName={player.brawlerName}
                      playerName={player.playerName}
                      trophies={player.trophies}
                      power={player.power} />
                  })}
                </div>
                //return <img width="50px" height="50px" src={`/images/${e.brawlerName}.png`} />
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(SoloDuoMode);

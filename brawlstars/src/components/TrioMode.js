import React, { Component } from "react";
import styles from "./TrioMode.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import PlayerTile from "./PlayerTile";
import { calDisplayTime } from './BaseFunctions';
import { withTranslation } from 'react-i18next';
class TrioMode extends Component {
  state = {
    imgSrc: "",
  };
  componentDidMount() {
    console.log(this.props);
    const { brawler_name } = this.props;
    this.setState({
      imgSrc: `/images/${brawler_name}.png`,
    });
  }
  render() {
    const {
      battleTime,
      brawler_name,
      duration,
      isStarPalyer,
      map,
      power,
      trophies,
      trophyChange,
      result,
      type,
      mode,
      groupRecords,
      t,
    } = this.props;

    return (
      <div className="center">
        <div className={`trioContainer ${result}`}>
          <div className={`typeInfo info ${result}`}>
            <div className={`duration`}>
              {duration} seconds
            </div>
            <div className={"gameType"}>
              {t(type) || "game"}
            </div>
            <div className={`battleTime`}>{calDisplayTime(battleTime)}</div>
          </div>
          <div className={`gameInfo top ${result}`}>
            <div className='modeInfo'>
              <div className="modeImg">
                <img src={`/images/mode/${mode}.png`}></img>
              </div>
              <div className={`modeMap`}>
                <div className={`mode`}>{t(mode)}
                </div>
                <div className={`map`}>
                  {t(map)}
                </div>
              </div>
            </div>
            <div className={`gameResult`}>
              {t(result)}
            </div>
            <div className={`trophyChange`}>
              {trophyChange}
            </div>
          </div>
          <div className={`playerInfo info ${result}`}>
            <div className={`trioPlayerContainer`}>
              {groupRecords.map((record, index) => {
                if (record.teamId === 0)
                  return <PlayerTile key={index}
                    brawlerName={record.brawlerName}
                    playerName={record.playerName}
                    trophies={record.trophies}
                    power={record.power}
                  ></PlayerTile>;
              })}
            </div>
            <div className={`durationContainer`}>
              <div>vs</div>
            </div>
            <div className={`trioPlayerContainer`}>
              {groupRecords.map((record, index) => {
                if (record.teamId === 1)
                  return <PlayerTile key={index}
                    brawlerName={record.brawlerName}
                    playerName={record.playerName}
                    trophies={record.trophies}
                    power={record.power}
                  ></PlayerTile>
              })}
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default withTranslation()(TrioMode);

import React, { Component } from "react";
import styles from "./TrioMode.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import PlayerTile from "./PlayerTile";
class TrioMode extends Component {
  state = {
    imgSrc: "",
  };
  componentDidMount() {
    console.log(this.props);
    const { brawler_name } = this.props;
    this.setState({
      imgSrc: `images/${brawler_name}.png`,
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
    } = this.props;
    //console.log(groupRecords);
    return (
      <div className="center">
        <div className={`trioContainer ${result}`}>
          <div className={`typeInfo info ${result}`}>
            <div className={`duration`}>
              {duration} seconds
            </div>
            {type || "game"}
            <div className={`battleTime`}>{battleTime.substr(0, 8)}</div>
          </div>
          <div className={`gameInfo top ${result}`}>
            <div className={`modeMap`}>
              <div className={`mode`}>{mode}
              </div>
              <div className={`map`}>
                {map}
              </div>
            </div>
            <div className={`gameResult`}>
              {result}
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
                  ></PlayerTile>
              })}
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default TrioMode;

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
    console.log(groupRecords);
    return (
      <div className="center">
        <div className={`trioContainer ${result}`}>
          <div className={`typeInfo info ${result}`}>
            {type}
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
              {groupRecords.map(record => {
                if (record.teamId === 0)
                  return <PlayerTile
                    brawlerName={record.brawlerName}
                    playerName={record.playerName}
                    trophies={record.trophies}
                  ></PlayerTile>;
              })}
            </div>
            <div className={`durationContainer`}>
              <div>vs</div>
              <div >
                {duration} seconds
              </div>
            </div>
            <div className={`trioPlayerContainer`}>
              {groupRecords.map(record => {
                if (record.teamId === 1)
                  return <PlayerTile
                    brawlerName={record.brawlerName}
                    playerName={record.playerName}
                    trophies={record.trophies}
                  ></PlayerTile>
              })}
            </div>
          </div>

          {/* <div className={`top ${result}`}>
            <div className={`result ${result}`}>{result}</div>
            <div className="time">{battleTime}</div>
            <div className="starPlayer">
              {isStarPalyer ? <FontAwesomeIcon icon={faStar} /> : ""}
            </div>
            <div className="trophyChange">{trophyChange}</div>
            <div style={{ clear: "both" }}></div>
          </div>
          <div className={`info ${result}`}>
            <div className="brawlerContainer">
              <div>
                <img src={this.state.imgSrc} width="50px" />
              </div>
              <div>{brawler_name}</div>
            </div>
            <div className="gameInfoContainer">
              <table className="gameTable">
                <thead>
                  <tr>
                    <th className="map">map</th>
                    <th className="duration">duration</th>
                    <th className="power">power</th>
                    <th className="trophies">trophies</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{map}</td>
                    <td>{duration}s</td>
                    <td>{power}</td>
                    <td>{trophies}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> */}
        </div>
      </div >
    );
  }
}

export default TrioMode;

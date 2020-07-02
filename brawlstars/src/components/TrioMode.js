import React, { Component } from "react";
import styles from "./TrioMode.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
class TrioMode extends Component {
  state = {
    imgSrc: "",
  };
  componentDidMount() {
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
    } = this.props;

    return (
      <div className="center">
        <div className={`trioContainer ${result}`}>
          <div className={`top ${result}`}>
            <div className={`result ${result}`}>{result}</div>
            <div className="time">{battleTime}</div>
            <div className="starPlayer">
              {isStarPalyer ? <FontAwesomeIcon icon={faStar} /> : ""}
            </div>
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
              <table>
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
          </div>
        </div>
      </div>
    );
  }
}

export default TrioMode;

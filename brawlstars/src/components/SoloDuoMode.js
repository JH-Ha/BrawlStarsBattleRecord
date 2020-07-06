import React, { Component } from "react";
import styles from "./SoloDuoMode.scss";

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
    const {
      battleTime,
      rank,
      result,
      brawler_name,
      map,
      power,
      trophies,
      trophyChange,
    } = this.props;
    return (
      <div className="center">
        <div className={`SoloDuoModeContainer rank${this.state.rankCss}`}>
          <div className={`topContainer rank${this.state.rankCss}`}>
            <div className={`rank rank${this.state.rankCss}Content`}>
              {rank}
            </div>
            <div>{battleTime}</div>
            <div>{this.state.trophyChange}</div>
          </div>
          <div className={`gameInfoContainer rank${this.state.rankCss}`}>
            <div>
              <img src={`/images/${brawler_name}.png`} width="50px" />
              <div>{brawler_name}</div>
            </div>
            <div className="tableContainer">
              <table>
                <thead>
                  <tr>
                    <th>map</th>
                    <th>power</th>
                    <th>trophies</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{map}</td>
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

export default SoloDuoMode;

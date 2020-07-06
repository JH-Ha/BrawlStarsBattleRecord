import React, { Component } from "react";

class SoloDuoMode extends Component {
  state = {
    trophyChange: "",
  };
  componentDidMount() {
    const { trophyChange } = this.props;
    let signTrophyChange = null;
    if (trophyChange > 0) {
      signTrophyChange = "+" + trophyChange;
    } else {
      signTrophyChange = trophyChange;
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
      <div>
        <div>
          <div>{rank}</div>
          <div>{trophyChange}</div>
        </div>
        <div>
          <img src={`/images/${brawler_name}.png`} width="50px" />
          <div>{brawler_name}</div>
        </div>
        <div>
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
    );
  }
}

export default SoloDuoMode;

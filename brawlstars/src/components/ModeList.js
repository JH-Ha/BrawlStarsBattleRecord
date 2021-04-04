import React, { Component } from "react";

class ModeList extends Component {
  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
  }
  state = {
    value: "gemGrab",
  };
  change(event) {
    const { changeMode } = this.props;
    let mode = event.target.value;
    this.setState({ value: mode });
    changeMode(mode);
  }
  componentDidMount() {
    const { mode } = this.props;
    console.log(`modeList : ${mode}`);
    this.setState({
      value: mode,
    });
  }
  render() {
    return (
      <div className="selectBox">
        <label htmlFor="modeList">mode </label>
        <select id="modeList" onChange={this.change} value={this.state.value}>
          <option value="ALL">ALL</option>
          <option value="gemGrab">Gem Grab</option>
          <option value="heist">Heist</option>
          <option value="brawlBall">Brawl Ball</option>
          <option value="bounty">Bounty</option>
          <option value="siege">Siege</option>
          <option value="hotZone">Hot Zone</option>
          <option value="soloShowdown">Solo Showdown</option>
          <option value="duoShowdown">Duo Showdown</option>
        </select>
      </div>
    );
  }
}

export default ModeList;

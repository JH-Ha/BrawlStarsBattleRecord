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
    this.setState({
      value: mode,
    });
  }
  render() {
    return (
      <div className="selectBox">
        <label htmlFor="modeList">mode </label>
        <select id="modeList" onChange={this.change} value={this.state.value}>
          <option value="gemGrab">gemGrab</option>
          <option value="heist">heist</option>
          <option value="brawlBall">brawlBall</option>
          <option value="bounty">bounty</option>
          <option value="siege">siege</option>
          <option value="hotZone">hotZone</option>
          <option value="soloShowdown">soloShowdown</option>
          <option value="duoShowdown">duoShowdown</option>
        </select>
      </div>
    );
  }
}

export default ModeList;

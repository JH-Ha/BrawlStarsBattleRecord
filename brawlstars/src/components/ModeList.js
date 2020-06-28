import React, { Component } from "react";

class ModeList extends Component {
  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
  }
  state = {
    value: "gemGrab",
    changeMode: "",
  };
  change(event) {
    const { changeMode } = this.props;
    let mode = event.target.value;
    this.setState({ value: mode });
    changeMode(mode);
  }
  render() {
    return (
      <select onChange={this.change} value={this.state.value}>
        <option value="gemGrab" label="gemGrab" />
        <option value="heist" label="heist" />
        <option value="brawlBall" label="brawlBall" />
        <option value="bounty" label="bounty" />
        <option value="siege" label="siege" />
      </select>
    );
  }
}

export default ModeList;

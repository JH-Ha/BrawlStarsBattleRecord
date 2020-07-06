import React, { Component } from "react";

let brawlerNameList = [
  "ALL",
  "SHELLY",
  "NITA",
  "COLT",
  "BULL",
  "JESSIE",
  "BROCK",
  "DYNAMIKE",
  "EL PRIMO",
  "BARLEY",
  "POCO",
  "RICO",
  "DARRYL",
  "PIPER",
  "PENNY",
  "BO",
  "MORTIS",
  "TARA",
  "PAM",
  "FRANK",
  "CROW",
  "SPIKE",
  "LEON",
  "GENE",
  "TICK",
  "ROSA",
  "8-BIT",
  "CARL",
  "BIBI",
  "EMZ",
  "BEA",
  "SPROUT",
  "SANDY",
  "JACKY",
  "MAX",
  "MR. P",
  "GALE",
];
class BrawlerList extends Component {
  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
    //this.setState({ changeBrawler: this.props.changeBrawler });
    console.log(this.props.changeBrawler);
  }
  state = {
    value: "ALL",
    changeBrawler: "",
  };
  change(event) {
    let value = event.target.value;
    this.props.changeBrawler(value);
    this.setState({ value: value });
  }
  render() {
    return (
      <select onChange={this.change} value={this.state.value}>
        {brawlerNameList.map((brawlerName, index) => {
          return (
            <option key={brawlerName} label={brawlerName} value={brawlerName}>
              {brawlerName}
            </option>
          );
        })}
      </select>
    );
  }
}

export default BrawlerList;

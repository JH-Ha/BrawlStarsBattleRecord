import React, { Component } from "react";

let brawlerNameList = [
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
  "COLETTE",
  "AMBER",
  "BYRON",
  "STU",
  "COLONEL RUFFS",
  "LOU",
  "EDGAR",
  "SURGE",
];
brawlerNameList = brawlerNameList.sort();
brawlerNameList.unshift("ALL");
class BrawlerList extends Component {
  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
    //this.setState({ changeBrawler: this.props.changeBrawler });
    //console.log(this.props.changeBrawler);
  }
  state = {
    brawlerName: "ALL",
    changeBrawler: "",
  };
  change(event) {
    let value = event.target.value;
    this.props.changeBrawler(value);
    this.setState({ value: value });
  }
  componentDidMount() {
    const { brawlerName } = this.props;
    this.setState({
      brawlerName: brawlerName
    });
  }
  render() {
    return (
      <div className="selectBox">
        <label htmlFor="brawlerName">brawler</label>
        <select
          id="brawlerName"
          onChange={this.change}
          value={this.state.brawlerName}
        >
          {brawlerNameList.map((brawlerName, index) => {
            return (
              <option key={brawlerName} label={brawlerName} value={brawlerName}>
                {brawlerName}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

export default BrawlerList;

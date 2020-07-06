import React, { Component } from "react";
import qs from "qs";
import firestore from "./Firestore";
import ModeList from "./ModeList";
import TrioMode from "./TrioMode";
import BrawlerList from "./BrawlerList";
import playStyles from "./PlayList.scss";
import styles from "./Base.scss";
import SoloDuoMode from "./SoloDuoMode";
// const PlayList = ({location}) =>{
//     const query = qs.parse(location.search,{
//         ignoreQueryPrefix : true
//     });
//     const tag = query.tag || "tag를 입력해주세요";
const tag = null || "tag를 입력해주세요";
class PlayList extends Component {
  constructor(props) {
    super(props);
    this.changeMode = this.changeMode.bind(this);
    this.changeBrawler = this.changeBrawler.bind(this);
    this.changeModeType = this.changeModeType.bind(this);
  }
  state = {
    playRecord: [],
    winRate: 0,
    tag,
    mode: "gemGrab",
    bralwerName: "ALL",
    isEmpty: false,
  };
  getTag() {
    const query = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    return query.tag;
  }
  addZero(number) {
    let str = number.toString();
    if (str.length == 1) str = "0" + str;
    return str;
  }
  addBrawlerName(statement, bralwerName) {
    if (bralwerName == "ALL" || bralwerName == undefined) {
      return statement;
    } else {
      return statement.where("brawler_name", "==", bralwerName);
    }
  }
  getBattleLog(tag, mode, bralwerName) {
    let rows = [];
    let statement = firestore.collection("battleLog").where("tag", "==", tag);
    this.addBrawlerName(statement, bralwerName)
      .where("mode", "==", mode)
      .orderBy("battleTime", "desc")
      .limit(25)
      .get()
      .then((snapshot) => {
        let numVictory = 0;
        let numGame = 0;
        if (snapshot.empty) {
          console.log("no document");
          this.setState({ playRecord: [], winRate: 0, isEmpty: true });
          return;
        }
        snapshot.forEach((doc) => {
          let data = doc.data();
          let date = new Date(data["battleTime"]);
          date.setHours(date.getHours() + 9);
          console.log(date.getFullYear(), date.getMonth());
          data["battleTime"] = date.toString();
          data["year"] = date.getFullYear();

          data["month"] = this.addZero(date.getMonth() + 1);
          data["date"] = this.addZero(date.getDate());
          data["hour"] = this.addZero(date.getHours());
          data["minute"] = this.addZero(date.getMinutes());
          console.log(doc.id);
          console.log(data);
          rows.push(data);
          numGame++;
          if (data.result === "victory") numVictory++;
          //playRecord
        });
        this.setState({ playRecord: rows });
        this.setState({ winRate: Math.floor((numVictory / numGame) * 100) });
        this.setState({ isEmpty: false });
      });
  }
  componentDidMount() {
    let tag = this.getTag();
    this.setState({ tag: tag });
    this.setState({ tag: tag });
    this.getBattleLog(tag, this.state.mode);
  }
  changeModeType(e) {
    let type = e.target.value;
    console.log("setModeType", type);
    console.log(type);
    this.setState({ modeType: type });
    if (type === "trio") {
      this.getBattleLog(this.state.tag, "gemGrab");
    } else {
      this.getBattleLog(this.state.tag, type);
    }
  }
  changeMode(mode) {
    this.setState({ mode: mode });
    this.getBattleLog(this.state.tag, mode);
  }
  changeBrawler(brawlerName) {
    console.log("change bralwer", brawlerName);
    this.setState({ brawlerName: brawlerName });
    this.getBattleLog(this.state.tag, this.state.mode, brawlerName);
  }
  isTrio(mode) {
    if (
      mode === "gemGrab" ||
      mode === "heist" ||
      mode === "siege" ||
      mode === "bounty" ||
      mode === "brawlBall" ||
      mode === "hotZone"
    ) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    return (
      <div>
        {/*
                My Tag %239QU209UYC
                */}
        <h1>PlayList</h1>
        <ModeList changeMode={this.changeMode} />
        <BrawlerList changeBrawler={this.changeBrawler} />
        <h2>{this.state.tag}</h2>
        {/* <select onChange={this.changeModeType} value={this.state.modeType}>
          <option value="soloShowdown">solo</option>
          <option value="duoShowdown">duo</option>
          <option value="trio">trio</option>
        </select> */}
        <h3>Win Rate : {this.state.winRate}%</h3>
        <div className={this.state.isEmpty ? "noRecord" : "displayNone"}>
          No record
        </div>
        {!this.isTrio(this.state.mode) &&
          this.state.playRecord.map((data) => {
            return (
              <SoloDuoMode
                key={data.battleTime}
                battleTime={
                  data.year +
                  "-" +
                  data.month +
                  "-" +
                  data.date +
                  " " +
                  data.hour +
                  ":" +
                  data.minute
                }
                rank={data.rank}
                result={data.result}
                brawler_name={data.brawler_name}
                duration={data.duration}
                isStarPalyer={data.isStarPlayer}
                map={data.map}
                power={data.power}
                trophies={data.trophies}
                trophyChange={data.trophyChange}
              />
            );
          })}
        {this.isTrio(this.state.mode) &&
          this.state.playRecord.map((data) => {
            return (
              <TrioMode
                key={data.battleTime}
                battleTime={
                  data.year +
                  "-" +
                  data.month +
                  "-" +
                  data.date +
                  " " +
                  data.hour +
                  ":" +
                  data.minute
                }
                rank={data.rank}
                result={data.result}
                brawler_name={data.brawler_name}
                duration={data.duration}
                isStarPalyer={data.isStarPlayer}
                map={data.map}
                power={data.power}
                trophies={data.trophies}
                trophyChange={data.trophyChange}
              />
            );
          })}
      </div>
      // </div>
    );
  }
}

export default PlayList;

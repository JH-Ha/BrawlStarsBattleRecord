import React, { Component } from "react";
import qs from "qs";
import firestore from "./Firestore";
import ModeList from "./ModeList";
import TrioMode from "./TrioMode";
import BrawlerList from "./BrawlerList";
import playStyles from "./PlayList.scss";
import styles from "./Base.scss";
import SoloDuoMode from "./SoloDuoMode";
import axios from "axios";
import Pagination from "./Pagination";
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
  }
  state = {
    playRecord: [],
    winRate: 0,
    averageRank: 0,
    tag,
    mode: "ALL",
    brawlerName: "ALL",
    isEmpty: false,
    curPage: 1,
    totalElements: 10,
  };
  getTag() {
    const query = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    return query.tag;
  }
  getCurPage() {
    const query = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    return query.curPage;
  }
  addZero(number) {
    let str = number.toString();
    if (str.length == 1) str = "0" + str;
    return str;
  }
  addBrawlerName(statement, brawlerName) {
    if (brawlerName == "ALL" || brawlerName == undefined) {
      return statement;
    } else {
      return statement.where("brawler_name", "==", brawlerName);
    }
  }
  changePageHandler = (page) => {
    const tag = this.getTag();
    this.getBattleLog(tag, null, null, page);

    let { history } = this.props;
    const queryPage = page - 1;
    const queryTag = tag.replace("#", "%23");
    history.push(`/playList?tag=${queryTag}&page=${queryPage}&size=5`);
    console.log(tag);
  }
  getBattleLog(tag, mode, brawlerName, page) {
    let rows = [];
    console.log(tag);
    tag = tag.replace("#", "%23");
    console.log(tag);
    const queryPage = page - 1;
    axios.get(`http://brawlstat.xyz/record/${tag}?page=${queryPage}&size=5`)
      //axios.get(`http://localhost/record/${tag}`)
      .then(response => {      // .then : 응답(상태코드200~300미만)성공시
        console.log(response);
        const data = response.data;
        this.setState({
          playRecord: response.data.content,
          curPage: data.pageable.pageNumber + 1,
          totalElements: data.totalElements
        })
      }).catch(error => {
        console.log(error);
      });
    // let statement = firestore.collection("battleLog").where("tag", "==", tag);
    // this.addBrawlerName(statement, brawlerName)
    //   .where("mode", "==", mode)
    //   .orderBy("battleTime", "desc")
    //   .limit(25)
    //   .get()
    //   .then((snapshot) => {
    //     let numVictory = 0;
    //     let numGame = 0;
    //     let sumRank = 0;
    //     if (snapshot.empty) {
    //       console.log("no document");
    //       this.setState({
    //         playRecord: [],
    //         winRate: 0,
    //         averageRank: 0,
    //         isEmpty: true,
    //       });
    //       return;
    //     }
    //     snapshot.forEach((doc) => {
    //       let data = doc.data();
    //       let date = new Date(data["battleTime"]);
    //       date.setHours(date.getHours() + 9);
    //       //console.log(date.getFullYear(), date.getMonth());
    //       data["battleTime"] = date.toString();
    //       data["year"] = date.getFullYear();

    //       data["month"] = this.addZero(date.getMonth() + 1);
    //       data["date"] = this.addZero(date.getDate());
    //       data["hour"] = this.addZero(date.getHours());
    //       data["minute"] = this.addZero(date.getMinutes());
    //       //console.log(doc.id);
    //       //console.log(data);
    //       rows.push(data);
    //       numGame++;
    //       sumRank += data.rank;
    //       if (data.result === "victory") numVictory++;
    //       //playRecord
    //     });
    //     this.setState({ playRecord: rows });
    //     this.setState({ winRate: Math.floor((numVictory / numGame) * 100) });
    //     this.setState({
    //       averageRank: Math.floor((sumRank / numGame) * 100) / 100,
    //     });
    //     this.setState({ isEmpty: false });
    //   });
  }
  componentDidMount() {
    let tag = this.getTag();
    this.setState({ tag: tag });
    this.getBattleLog(tag, this.state.mode);
  }

  changeMode(mode) {
    console.log(this.state.tag, mode, this.state.brawlerName);
    this.setState({ mode: mode });
    this.getBattleLog(this.state.tag, mode, this.state.brawlerName);
  }
  changeBrawler(brawlerName) {
    console.log("change bralwer", brawlerName);
    this.setState({ brawlerName: brawlerName });
    this.getBattleLog(this.state.tag, this.state.mode, brawlerName);
  }
  getQuery(props) {
    const query = qs.parse(props.location.search, {
      ignoreQueryPrefix: true,
    });
    return query;
  }
  componentDidUpdate(prevProps) {
    //console.log("update");
    let prevQuery = this.getQuery(prevProps);
    let query = this.getQuery(this.props);
    console.log(
      `prevQuery.curpage ${prevQuery.page}, query.curPage ${query.page}`
    );

    if (prevQuery.page !== query.page) {
      console.log(`componentWill Update !!!! ${query.page}`);
      this.getBattleLog(query.tag.replace("#", "%23"), null, null, parseInt(query.page) + 1);
      //this.setState({curPage: query.curPage
    }
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
        <ModeList changeMode={this.changeMode} mode={this.state.mode} />
        <BrawlerList changeBrawler={this.changeBrawler} />
        <h2>Tag : {this.state.tag}</h2>
        {/* <select onChange={this.changeModeType} value={this.state.modeType}>
          <option value="soloShowdown">solo</option>
          <option value="duoShowdown">duo</option>
          <option value="trio">trio</option>
        </select> */}
        {this.isTrio(this.state.mode) && (
          <h3>Win Rate : {this.state.winRate}%</h3>
        )}
        {!this.isTrio(this.state.mode) && (
          <h3>Average Rank : {this.state.averageRank}</h3>
        )}
        <div className={this.state.isEmpty ? "noRecord" : "displayNone"}>
          No record
        </div>
        {
          this.state.playRecord.map((data) => {
            if (this.isTrio(data.mode)) {
              return (
                <TrioMode
                  key={data.battleTime}
                  battleTime={data.battleTime
                  }
                  rank={data.resultRank}
                  result={data.result}
                  brawler_name={data.brawlerName}
                  duration={data.duration}
                  isStarPalyer={data.isStarPlayer}
                  map={data.map}
                  power={data.power}
                  trophies={data.trophies}
                  trophyChange={data.trophyChange}
                  type={data.type}
                  mode={data.mode}
                  groupRecords={data.groupRecords}
                />
              );
            } else {
              return (
                <SoloDuoMode
                  key={data.battleTime}
                  battleTime={
                    data.battleTime
                  }
                  rank={data.resultRank}
                  result={data.result}
                  brawler_name={data.brawlerName}
                  duration={data.duration}
                  isStarPalyer={data.isStarPlayer}
                  map={data.map}
                  power={data.power}
                  trophies={data.trophies}
                  trophyChange={data.trophyChange}
                  mode={data.mode}
                />
              );
            }
          })}
        <Pagination
          curPage={this.state.curPage}
          numTotal={this.state.totalElements}
          numShowItems="5"
          pageUrl="/playerList"
          onClick={this.changePageHandler.bind(this)}
        ></Pagination>
      </div>
      // </div>
    );
  }
}

export default PlayList;

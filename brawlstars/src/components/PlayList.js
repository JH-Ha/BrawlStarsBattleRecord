import React, { Component } from "react";
import qs from "qs";
import firestore from "./Firestore";
import ModeList from "./ModeList";
import TrioMode from "./TrioMode";
import BrawlerList from "./BrawlerList";
import playStyles from "./PlayList.scss";
import styles from "./Base.scss";
import SoloDuoMode from "./SoloDuoMode";
import Pagination from "./Pagination";
import { getData } from "./ApiHandler";

// const PlayList = ({location}) =>{
//     const query = qs.parse(location.search,{
//         ignoreQueryPrefix : true
//     });
//     const tag = query.tag || "tag를 입력해주세요";
let myTag = null || "tag를 입력해주세요";
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
    tag: '',
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
  addZero(number) {
    let str = number.toString();
    if (str.length == 1) str = "0" + str;
    return str;
  }

  changePageHandler = (page) => {

    let searchParams = new URLSearchParams(this.props.location.search);
    const mode = searchParams.get("mode");
    console.log(`changePageHandler mode !! ${mode}`);
    const tag = searchParams.get("tag");
    const brawlerName = searchParams.get("brawlerName");
    this.getBattleLog(tag, mode, brawlerName, page);
    const queryPage = page - 1;
    searchParams.set("page", queryPage);
    searchParams.set("size", 5);
    let { history } = this.props;
    history.push(`/playList?${searchParams.toString()}`);
    console.log(tag);
    console.log(searchParams.toString());
    console.log(searchParams.get("tag"));
  }
  getBattleLog(tag, mode, brawlerName, page) {
    console.log(`getBattleLog tag ${tag} mode ${mode} bralerName ${brawlerName}`);
    tag = tag.replace("#", "%23");
    const queryPage = page - 1;
    let paramMode = mode;
    if (mode === 'ALL' || mode === null || mode === undefined) {
      paramMode = '';
    }
    let paramBrawlerName = brawlerName;
    if (brawlerName === 'ALL' || brawlerName === null || brawlerName === undefined) {
      paramBrawlerName = '';
    }
    let searchParams = new URLSearchParams();
    searchParams.set("mode", paramMode);
    searchParams.set("brawlerName", paramBrawlerName);
    searchParams.set("page", queryPage);
    searchParams.set("size", 5);
    console.log(`searchParams ${searchParams.toString()}`);
    getData(`/record/${tag}?${searchParams.toString()}`).then((response) => {      // .then : 응답(상태코드200~300미만)성공시
      console.log(response);
      const data = response.data;
      this.setState({
        playRecord: response.data.content,
        curPage: data.pageable.pageNumber + 1,
        totalElements: data.totalElements
      })
    }).catch((error) => {
      console.log(error);
    });
  }
  componentDidMount() {
    let searchParams = new URLSearchParams(this.props.location.search);
    const tag = searchParams.get("tag")
    if (tag !== null) {
      this.setState({
        tag: tag
      });
    }
    const mode = searchParams.get("mode");
    if (mode !== null) {
      this.setState({
        mode: mode
      })
    }
    const brawlerName = searchParams.get("brawlerName");
    if (brawlerName !== null) {
      this.setState({
        brawlerName: brawlerName
      })
    }
    const page = parseInt(searchParams.get("page"));
    if (page !== null) {
      this.setState({
        page: page
      })
    }
    //console.log(`compomentDidMount !!!!! ${brawlerName}`);
    this.getBattleLog(tag, mode, brawlerName, page + 1);
  }

  changeMode(mode) {
    //console.log('change Mode !!!');
    //console.log(this.state.tag, mode, this.state.brawlerName);
    this.setState({ mode: mode });
    this.getBattleLog(this.state.tag, mode, this.state.brawlerName, 1);
    const { history } = this.props;
    let searchParams = new URLSearchParams(this.props.location.search);
    searchParams.set("mode", mode);
    searchParams.set("page", 0);
    history.push(`/playList?${searchParams}`);
  }
  changeBrawler(brawlerName) {
    //console.log("change bralwer", brawlerName);
    this.setState({ brawlerName: brawlerName });
    this.getBattleLog(this.state.tag, this.state.mode, brawlerName, 1);
    const { history } = this.props;
    let searchParams = new URLSearchParams(this.props.location.search);
    searchParams.set("brawlerName", brawlerName);
    searchParams.set("page", 0);
    history.push(`/playList?${searchParams.toString()}`);
  }
  getQuery(props) {
    const query = qs.parse(props.location.search, {
      ignoreQueryPrefix: true,
    });
    return query;
  }

  isTrio(mode) {
    let result = false;
    if (
      mode === "gemGrab" ||
      mode === "heist" ||
      mode === "siege" ||
      mode === "bounty" ||
      mode === "brawlBall" ||
      mode === "hotZone"
    ) {
      result = true;
    }
    return result;
  }
  render() {
    return (
      <div>
        {/*
                My Tag %239QU209UYC
                */}
        <h1>PlayList</h1>
        <ModeList key={`mode-${this.state.mode}`} changeMode={this.changeMode} mode={this.state.mode} />
        <BrawlerList key={this.state.brawlerName} brawlerName={this.state.brawlerName} changeBrawler={this.changeBrawler} />
        <h2>Name : {this.state.name} Tag : {this.state.tag}</h2>

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
          key={this.state.curPage}
          curPage={this.state.curPage}
          numTotal={this.state.totalElements}
          numShowItems="5"
          pageUrl="/playerList"
          onClick={this.changePageHandler.bind(this)}
        ></Pagination>
        <div style={{ 'marginBottom': "10px" }}>
        </div>
      </div >
      // </div>
    );
  }
}

export default PlayList;

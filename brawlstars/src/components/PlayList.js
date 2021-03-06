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
import { withTranslation } from 'react-i18next';
import { isTrio } from './BaseFunctions';
import AdSense from 'react-adsense';
import Loading from "./Loading";

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
    loading: false,
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
    const params = this.props.match.params;
    let searchParams = new URLSearchParams(this.props.location.search);
    const tag = params.tag;
    const queryPage = page - 1;
    searchParams.set("page", queryPage);
    searchParams.set("size", 5);
    let { history } = this.props;
    history.push(`/battleLog/${tag}?${searchParams.toString()}`);

  }
  getBattleLog(tag, mode, brawlerName, page) {
    console.log(`getBattleLog tag ${tag} mode ${mode} bralerName ${brawlerName}`);
    tag = tag.replace("#", "%23");
    const queryPage = page - 1;
    let paramMode = mode;
    if (mode === 'ALL' || mode === 'All' || mode === null || mode === undefined) {
      paramMode = '';
    }
    let paramBrawlerName = brawlerName;
    if (brawlerName === 'ALL' || brawlerName === 'All' || brawlerName === null || brawlerName === undefined) {
      paramBrawlerName = '';
    }
    let searchParams = new URLSearchParams();
    searchParams.set("mode", paramMode);
    searchParams.set("brawlerName", paramBrawlerName);
    searchParams.set("page", queryPage);
    searchParams.set("size", 5);
    console.log(`searchParams ${searchParams.toString()}`);
    this.setState({
      loading: true
    })
    getData(`/record/${tag}?${searchParams.toString()}`).then((response) => {      // .then : 응답(상태코드200~300미만)성공시
      console.log(response);
      const data = response.data;
      this.setState({
        playRecord: response.data.content,
        curPage: data.pageable.pageNumber + 1,
        totalElements: data.totalElements,
        loading: false,
      })
    }).catch((error) => {
      console.log(error);
      this.setState({
        loading: false
      })
    });
  }
  getBattleLogByUrl() {

  }
  componentDidMount() {
    console.log("playList didmount");
    let searchParams = new URLSearchParams(this.props.location.search);
    const params = this.props.match.params;

    const tag = params.tag;
    if (tag !== null) {
      this.setState({
        tag: unescape(tag)
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
    getData(`/member/${tag.replace("#", "%23")}`)
      .then(response => {
        const member = response.data;
        this.setState({
          name: member.name
        });
      })
  }

  componentDidUpdate(prevProps) {
    //console.log("update");
    let prevQuery = this.getQuery(prevProps);
    let query = this.getQuery(this.props);
    const params = this.props.match.params;
    console.log(
      `prevQuery.curpage ${prevQuery.page}, query.curPage ${query.page}`
    );

    if (prevQuery.page !== query.page) {
      console.log(`componentWill Update !!!! ${query.page}`);
      this.getBattleLog(params.tag.replace("#", "%23"), query.mode, query.brawlerName, parseInt(query.page) + 1);
      //this.setState({curPage: query.curPage
    }
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
    const params = this.props.match.params;
    history.push(`/battleLog/${params.tag}?${searchParams}`);
  }
  changeBrawler(brawlerName) {
    //console.log("change bralwer", brawlerName);
    this.setState({ brawlerName: brawlerName });
    this.getBattleLog(this.state.tag, this.state.mode, brawlerName, 1);
    const { history } = this.props;
    let searchParams = new URLSearchParams(this.props.location.search);
    searchParams.set("brawlerName", brawlerName);
    searchParams.set("page", 0);
    const params = this.props.match.params;
    history.push(`/battleLog/${params.tag}?${searchParams.toString()}`);
  }
  getQuery(props) {
    const query = qs.parse(props.location.search, {
      ignoreQueryPrefix: true,
    });
    return query;
  }

  goStatistics = () => {
    const { history } = this.props;
    history.push(`/statistics?tag=${this.state.tag.replace("#", "%23")}`)
  }
  render() {
    const { t } = this.props;
    return (
      <div>
        {this.state.loading ?
          <Loading></Loading>
          : ""}
        <h2>{t('battleLogTitle')}</h2>
        <button onClick={this.goStatistics} className="btn">{t("Statistics")}</button>
        <ModeList key={`mode-${this.state.mode}`} changeMode={this.changeMode} mode={this.state.mode} />
        <BrawlerList key={this.state.brawlerName} brawlerName={this.state.brawlerName} changeBrawler={this.changeBrawler} />
        <h2>{this.state.name}({this.state.tag})</h2>

        <div className={this.state.isEmpty ? "noRecord" : "displayNone"}>
          No record
        </div>
        {
          this.state.playRecord.map((data) => {
            if (isTrio(data.mode)) {
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
                  groupRecords={data.groupRecords}
                  tag={this.state.tag}
                  type={data.type}
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
        <AdSense.Google
          style={{ display: 'block' }}
          client='ca-pub-4114406385852589'
          slot='4607116156'
          format='auto'
          responsive='true'
        />
      </div >
      // </div>
    );
  }
}

export default withTranslation()(PlayList);

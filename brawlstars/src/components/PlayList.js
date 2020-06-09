import React, { Component } from 'react';
import qs from 'qs';
import firestore from './Firestore';
import ModeList from './ModeList';
import TrioMode from './TrioMode';
import BrawlerList from './BrawlerList';
import styles from './Base.scss';
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
        tag,
        mode : "gemGrab",
        bralwerName : "ALL"
    }
    getTag() {
        const query = qs.parse(this.props.location.search, {
            ignoreQueryPrefix: true
        });
        return query.tag;
    }
    addZero(number) {
        let str = number.toString();
        if (str.length == 1) str = "0" + str;
        return str;
    }
    addBrawlerName(statement,bralwerName){
        if(bralwerName == "ALL" || bralwerName == undefined){
            return statement;
        } else{
            return statement.where("brawler_name","==",  bralwerName);
        }
    }
    getBattleLog(tag, mode, bralwerName) {
        let rows = [];
        let statement = firestore.collection("battleLog")
            .where("tag", "==", tag);
        this.addBrawlerName(statement, bralwerName)
            .where("mode", "==", mode)
            .orderBy("battleTime", "desc").limit(25)
            .get().then((snapshot) => {
                let numVictory = 0;
                let numGame = 0;
                snapshot.forEach((doc) => {
                    let data = doc.data();
                    let date = new Date(data["battleTime"]);
                    date.setHours(date.getHours() + 9);
                    console.log(date.getFullYear(), date.getMonth());
                    data["battleTime"] = (date).toString();
                    data["year"] = date.getFullYear();

                    data["month"] = this.addZero(date.getMonth() + 1);
                    data["date"] = this.addZero(date.getDate() + 1);
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
            });
    }
    componentDidMount() {
        let tag = this.getTag();
        this.setState({ tag: tag });
        this.getBattleLog(tag, "gemGrab");
    }
    changeMode(mode) {
        this.setState({mode : mode});
        this.getBattleLog(this.state.tag, mode);
    }
    changeBrawler(brawlerName){
        console.log("change bralwer", brawlerName);
        this.setState({brawlerName: brawlerName});
        this.getBattleLog(this.state.tag, this.state.mode, brawlerName);
    }
    render() {
        return (
            <div>
                {/*
                My Tag %239QU209UYC
                */}
                <h1>PlayList</h1>
                <ModeList changeMode={this.changeMode} />
                <BrawlerList changeBrawler = {this.changeBrawler}/>
                <h2>{this.getTag()}</h2>
                <h3>Win Rate : {this.state.winRate}%</h3>
                <div className="center">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Playtime</th>
                                <th>BrawlerName</th>
                                <th>Duration</th>
                                <th>Map</th>
                                <th>Power</th>
                                <th>Trophies</th>
                                <th>TrophyChange</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.playRecord.map(data => {
                                return (


                                    <TrioMode battleTime={data.year + "-"
                                        + data.month + "-"
                                        + data.date + " "
                                        + data.hour + ":"
                                        + data.minute}
                                        result={data.result}
                                        brawler_name={data.brawler_name}
                                        duration={data.duration}
                                        isStarPalyer={data.isStarPalyer}
                                        map={data.map}
                                        power={data.power}
                                        trophies={data.trophies}
                                        trophyChange={data.trophyChange}
                                    />


                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default PlayList;
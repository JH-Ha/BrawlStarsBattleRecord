import React, {Component} from 'react';
import qs from 'qs';
import firestore from './Firestore';
import ModeList from './ModeList';
import TrioMode from './TrioMode';
// const PlayList = ({location}) =>{
//     const query = qs.parse(location.search,{
//         ignoreQueryPrefix : true
//     });
//     const tag = query.tag || "tag를 입력해주세요";
const tag = null || "tag를 입력해주세요";
class PlayList extends Component {
    state={
        playRecord : [],
        winRate : 0
    }
    getTag(){
        const query = qs.parse(this.props.location.search, {
            ignoreQueryPrefix : true
        });
        return query.tag;
    }
    getBattleLog(){
        let rows = [];
        firestore.collection("battleLog")
        .where("tag", "==", this.getTag())
        .where("brawler_name","==", "EMZ")
        .orderBy("battleTime", "desc").limit(25)
            .get().then((snapshot) => {
                let numVictory = 0;
                let numGame = 0;
                snapshot.forEach((doc) => {
                    let data = doc.data();
                    let date = new Date(data["battleTime"]);
                    date.setHours(date.getHours() + 9);
                    data["battleTime"] = (date).toString();
                    console.log(doc.id);
                    console.log(data);
                    rows.push(data);
                    numGame ++;
                    if(data.result === "victory") numVictory ++;
                    //playRecord
                });
                this.setState({playRecord : this.state.playRecord.concat(rows)});
                this.setState({winRate : numVictory / numGame});
            });
    }
    componentDidMount(){
        this.getBattleLog();
    }
    render(){
        return (
            <div>
                {/*
                My Tag %239QU209UYC
                */}
                <h1>PlayList</h1>
                <ModeList/>
                <h2>{this.getTag()}</h2>
                <h3>Win Rate</h3>
                <div>{this.state.winRate}</div>
                <div>
                    {this.state.playRecord.map(data =>{
                        return (

                        <div>
                            <TrioMode battleTime={data.battleTime}
                            result={data.result}
                            brawler_name = {data.brawler_name}
            duration={data.duration}
            isStarPalyer={data.isStarPalyer}
            map={data.map}
            power={data.power}
            trophies={data.trophies}
            trophyChange={data.trophyChange}
                            />
                        </div>
                        
                        );
                    })}
                </div>
            </div>
        )
    }
}

export default PlayList;
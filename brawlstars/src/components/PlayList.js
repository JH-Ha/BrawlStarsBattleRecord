import React, {Component} from 'react';
import qs from 'qs';
import firestore from './Firestore';

// const PlayList = ({location}) =>{
//     const query = qs.parse(location.search,{
//         ignoreQueryPrefix : true
//     });
//     const tag = query.tag || "tag를 입력해주세요";
const tag = null || "tag를 입력해주세요";
class PlayList extends Component {
    state={
        playRecord : []
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
                snapshot.forEach((doc) => {
                    let data = doc.data();
                    let date = new Date(data["battleTime"]);
                    date.setHours(date.getHours() + 9);
                    data["battleTime"] = (date).toString();
                    console.log(doc.id);
                    console.log(data);
                    rows.push(data);
                    //playRecord
                });
                this.setState({playRecord : this.state.playRecord.concat(rows)});
            });
    }
    componentDidMount(){
        this.getBattleLog();
    }
    render(){
        return (
            <div>
                <h1>PlayList</h1>
                <h2>{this.getTag()}</h2>
                <div>
                    {this.state.playRecord.map(data =>{
                        return (
                        <div><div>{data.battleTime}
                            </div>
                            <div>{data.result}</div>
                            <div>{data.brawler_name}</div>
                        </div>
                        
                        );
                    })}
                </div>
            </div>
        )
    }
}

export default PlayList;